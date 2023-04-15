import {Component, h, Prop} from '@stencil/core';
import '@mediapipe/drawing_utils';
import '@mediapipe/hands';
import {drawLandmarks} from '@mediapipe/drawing_utils';
import {HAND_CONNECTIONS} from '@mediapipe/hands';
import {createGestureRecognizer, detect} from './detection.worker';
import {WebsocketEvent, WebsocketEvents} from '../../model/websocket-message-event';
import {TouchpadBox} from '../../model/touchpad-box';

const VIDEO_HEIGHT = '400px';
const VIDEO_WIDTH = '520px';

declare global {
  interface Window {
    drawLandmarks: typeof drawLandmarks,
    HAND_CONNECTIONS: typeof HAND_CONNECTIONS
  }
}

function startCamera() {

  const userMediaOptions = {
    video: {
      deviceId: this.cameraId
    },
  };

  navigator.mediaDevices.getUserMedia(userMediaOptions).then((stream) => {
    this.isStreaming = true;
    this.webcam.srcObject = stream;
    this.webcam.addEventListener('loadeddata', detectGesture.bind(this));
    this.currentVideoStream = stream;
  });
}

async function detectGesture() {

  if (!this.isStreaming) {
    return;
  }

  const bitmap = await createImageBitmap(this.webcam);
  const gesture = await detect(bitmap);

  this.canvasContext.save();
  this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.canvas.style.height = VIDEO_HEIGHT;
  this.webcam.style.height = VIDEO_HEIGHT;
  this.canvas.style.width = VIDEO_WIDTH;
  this.webcam.style.width = VIDEO_WIDTH;

  this.drawTouchpadBox();

  if (gesture.landmarks && gesture.landmarks.length !== 0) {

    window.drawLandmarks(this.canvasContext, [gesture.landmarks[0][5]], {color: '#FF0000', lineWidth: 2});

    if (this.isSocketOpen) {
      this.socket.send(JSON.stringify({
        landmarks: gesture.landmarks,
        gestures: gesture.gestures,
        handedness: gesture.handednesses,
        frame: {
          width: this.canvas.width,
          height: this.canvas.height
        }
      }));
    }

  }

  this.canvasContext.restore();

  // Call this function again to keep predicting when the browser is ready.
  this.animationFrameId = window.requestAnimationFrame(detectGesture.bind(this));
}

@Component({
  tag: 'gesture-detector',
  shadow: false,
})
export class GestureDetector {

  /**
   * The device id of selected camera
   */
  @Prop()
  cameraId: string;

  /**
   * The url where websocket server is running. It should be in format host:port e.g. localhost:1234
   */
  @Prop()
  websocketUrl: string;

  isStreaming: boolean = false;
  webcam!: HTMLVideoElement;
  canvas!: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  animationFrameId: number;
  currentVideoStream: MediaStream;

  socket: WebSocket;
  isSocketOpen: boolean = false;

  isTouchpadBoxOpen: boolean = false;
  touchpadBox: TouchpadBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }

  drawTouchpadBox() {
    if (this.isTouchpadBoxOpen) {
      this.canvasContext.strokeStyle = '#ff9800';
      this.canvasContext.lineWidth = 12;
      this.canvasContext.strokeRect(this.touchpadBox.x, this.touchpadBox.y, this.touchpadBox.width, this.touchpadBox.height);
    }
  }

  async componentDidLoad() {
    await createGestureRecognizer();
    this.webcam = document.getElementById('webcam') as HTMLVideoElement;
    this.canvas = document.getElementById('output_canvas') as HTMLCanvasElement;
    this.canvasContext = this.canvas.getContext('2d');
    startCamera.apply(this);

    this.socket = new WebSocket(`ws://${this.websocketUrl}`);

    this.socket.addEventListener('open', () => {
      this.isSocketOpen = true;
    });

    this.socket.addEventListener('close', () => {
      this.isSocketOpen = false;
    });

    this.socket.addEventListener('error', () => {
      this.isSocketOpen = false;
    });

    this.socket.addEventListener('message', (event: MessageEvent) => {

      const websocketEvent = JSON.parse(event.data) as WebsocketEvent;

      switch (websocketEvent.name) {
        case WebsocketEvents.TOUCHPAD_BOX_OPEN:
          const {xMin, yMin, width, height} = websocketEvent.data;
          this.touchpadBox = {
            x: xMin,
            y: yMin,
            width,
            height
          }
          this.isTouchpadBoxOpen = true
          break;
        case WebsocketEvents.TOUCHPAD_BOX_CLOSE:
          this.isTouchpadBoxOpen = false;
          break;
      }

    });
  }

  disconnectedCallback() {
    this.isStreaming = false;
    this.currentVideoStream.getTracks().forEach(track => track.stop());
    window.cancelAnimationFrame(this.animationFrameId);
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <video id='webcam' autoPlay playsInline style={{
          transform: 'rotateY(180deg)',
          '-webkit-transform': 'rotateY(180deg)',
          '-moz-transform': 'rotateY(180deg)',
          position: 'unset'
        }}></video>
        <canvas id='output_canvas' width='1280' height='720'
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  transform: 'rotateY(180deg)',
                  '-webkit-transform': 'rotateY(180deg)',
                  '-moz-transform': 'rotateY(180deg)'
                }}></canvas>
      </div>
    );
  }

}
