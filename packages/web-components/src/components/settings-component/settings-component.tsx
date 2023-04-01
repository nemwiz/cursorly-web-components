import {Component, h} from '@stencil/core';
import '@mediapipe/drawing_utils';
import '@mediapipe/hands';
import {stopCameraStream} from '../../utils/camera';
import {drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils';
import {HAND_CONNECTIONS} from '@mediapipe/hands';
import {Screen} from '../../model/screen';
import {post} from '../../service/http.service';
import {CreateSettingsRequest} from '../../model/settings';
import {createGestureRecognizer, detect} from './detection.worker';
import {WebsocketEvent, WebsocketEvents} from '../../model/websocket-message-event';
import {TouchpadBox} from '../../model/touchpad-box';

const VIDEO_HEIGHT = '360px';
const VIDEO_WIDTH = '480px';

declare global {
  interface Window {
    drawConnectors: typeof drawConnectors,
    drawLandmarks: typeof drawLandmarks,
    HAND_CONNECTIONS: typeof HAND_CONNECTIONS
  }
}

function startCamera() {

  const userMediaOptions = {
    video: {
      deviceId: this.selectedCamera.deviceId
    },
  };

  navigator.mediaDevices.getUserMedia(userMediaOptions).then((stream) => {
    this.isStreaming = true;
    this.webcam.srcObject = stream;
    this.webcam.addEventListener('loadeddata', detectGesture.bind(this));

    if (typeof this.currentVideoStream !== 'undefined') {
      stopCameraStream(this.currentVideoStream);
    }

    this.currentVideoStream = stream;
  });
}

async function detectGesture() {

  if (!this.isStreaming) {
    return;
  }

  const bitmap = await createImageBitmap(this.webcam);
  const results = await detect(bitmap);

  this.canvasContext.save();
  this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.canvas.style.height = VIDEO_HEIGHT;
  this.webcam.style.height = VIDEO_HEIGHT;
  this.canvas.style.width = VIDEO_WIDTH;
  this.webcam.style.width = VIDEO_WIDTH;

  this.drawTouchpadBox();

  if (results.landmarks && results.landmarks.length !== 0) {
    for (const landmarks of results.landmarks) {
      window.drawConnectors(this.canvasContext, landmarks, window.HAND_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 5
      });
      window.drawLandmarks(this.canvasContext, landmarks, {color: '#FF0000', lineWidth: 2});
    }

    if (this.isSocketOpen) {
      this.socket.send(JSON.stringify({
        landmarks: results.landmarks,
        gestures: results.gestures,
        handedness: results.handednesses,
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
  tag: 'settings-component',
  shadow: false,
})
export class SettingsComponent {

  selectedCamera: MediaDeviceInfo;
  selectedScreen: Screen;
  isStreaming: boolean = false;
  socket: WebSocket;
  isSocketOpen: boolean = false;
  webcam!: HTMLVideoElement;
  canvas!: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  animationFrameId: number;
  currentVideoStream: MediaStream;
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


    this.socket = new WebSocket('ws://localhost:8765');

    this.socket.addEventListener('open', () => {

      console.log('Socket connection is open');
      this.isSocketOpen = true;

    });

    this.socket.addEventListener('close', () => {

      console.log('Socket connection has closed')

      this.isSocketOpen = false;
    });

    this.socket.addEventListener('error', () => {

      console.log('Socket connection has an error')
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

  async setSettings() {
    const settings = {
      airTouchpad: {
        screenId: this.selectedScreen.screenId,
        isSingleScreen: true
      },
      noseTouchpad: {
        screenId: this.selectedScreen.screenId,
        isSingleScreen: true
      },
      notifications: true
    }

    await post<void, CreateSettingsRequest>('http://localhost:39459/settings', settings);
  }

  disconnectedCallback() {
    this.isStreaming = false;
    this.currentVideoStream.getTracks().forEach(track => track.stop());
    window.cancelAnimationFrame(this.animationFrameId);
  }

  render() {
    return (
      <div>
        <div style={{position: 'relative'}}>
          <video id='webcam' autoPlay playsInline></video>
          <canvas id='output_canvas' width='1280' height='720'
                  style={{position: 'absolute', left: '0px', top: '0px'}}></canvas>
        </div>
        <camera-selection onCameraSelected={(event) => {
          this.selectedCamera = event.detail;
        }
        }></camera-selection>
        <screen-selection onScreenSelected={async (event) => {
          this.selectedScreen = event.detail;
          await this.setSettings();
        }
        }></screen-selection>


        <button onClick={async () => {
          await post<void, {}>('http://localhost:39459/modes/stop', {});
          this.currentVideoStream.getTracks().forEach(s => s.stop());
        }}>Stop
        </button>

      </div>
    );
  }

}
