import {Component, Event, EventEmitter, h, Prop, State} from '@stencil/core';
import '@mediapipe/drawing_utils';
import '@mediapipe/hands';
import {drawLandmarks} from '@mediapipe/drawing_utils';
import {HAND_CONNECTIONS} from '@mediapipe/hands';
import {createGestureRecognizer, detect} from './detection.worker';
import {WebsocketEvent, WebsocketEvents} from '../../model/websocket-message-event';
import {TouchpadBox} from '../../model/touchpad-box';

const VIDEO_HEIGHT_RAW = 400;
const VIDEO_HEIGHT = `${VIDEO_HEIGHT_RAW}px`;
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

  /**
   * Event that fires off when one of the supported gestures is detected
   */
  @Event({eventName: 'gestureDetected'})
  gestureDetected: EventEmitter<string>;

  @State()
  isStarted: boolean = false;

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
    height: 0,
    isCursorStable: false
  }

  drawTouchpadBox() {
    if (this.isTouchpadBoxOpen) {
      this.canvasContext.strokeStyle = this.touchpadBox.isCursorStable ? '#31c48d' : '#ff8a4c';
      this.canvasContext.lineWidth = 12;
      this.canvasContext.strokeRect(this.touchpadBox.x, this.touchpadBox.y, this.touchpadBox.width, this.touchpadBox.height);
    }
  }

  async componentDidLoad() {
    await createGestureRecognizer();
    this.isStarted = true;
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
        case WebsocketEvents.STABILIZE_CURSOR_START:
          this.touchpadBox.isCursorStable = true
          break;
        case WebsocketEvents.STABILIZE_CURSOR_STOP:
          this.touchpadBox.isCursorStable = false
          break;
      }

      this.gestureDetected.emit(websocketEvent.name);

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

        {
          !this.isStarted
            ? <div class='u-absolute' style={{top: `${VIDEO_HEIGHT_RAW / 2}px`, left: '33%'}}>
              <cursorly-spinner size={'large'}></cursorly-spinner>
              <p>Almost there! We are assembling the final pieces...</p>
            </div>
            : null
        }

        <video id='webcam' autoPlay playsInline style={{
          transform: 'rotateY(180deg)',
          '-webkit-transform': 'rotateY(180deg)',
          '-moz-transform': 'rotateY(180deg)',
          position: 'unset',
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
          visibility: this.isStarted ? 'visible' : 'hidden',
          maxWidth: 'unset'
        }}></video>
        <canvas id='output_canvas' width='1280' height='720'
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  transform: 'rotateY(180deg)',
                  '-webkit-transform': 'rotateY(180deg)',
                  '-moz-transform': 'rotateY(180deg)',
                  visibility: this.isStarted ? 'visible' : 'hidden',
                  maxWidth: 'unset'
                }}></canvas>
      </div>
    );
  }

}
