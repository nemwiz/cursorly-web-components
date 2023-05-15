import {Component, Event, EventEmitter, h, Prop, State} from '@stencil/core';
import {createGestureRecognizer, createOffscreenCanvas, detectAndGetCoordinates} from './detection.worker';
import {WebsocketEvent, WebsocketEvents} from '../../model/websocket-message-event';
import {TouchpadBox} from '../../model/touchpad-box';
import {VIDEO_HEIGHT, VIDEO_HEIGHT_RAW, VIDEO_WIDTH} from './gesture-detector-constants';

function startCamera() {

  const userMediaOptions = {
    video: {
      deviceId: this.cameraId
    },
    audio: false
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

  this.offscreenCanvas.style.height = VIDEO_HEIGHT;
  this.webcam.style.height = VIDEO_HEIGHT;
  this.offscreenCanvas.style.width = VIDEO_WIDTH;
  this.webcam.style.width = VIDEO_WIDTH;

  const cameraFrame = await createImageBitmap(this.webcam);
  const coordinates = await detectAndGetCoordinates(cameraFrame, this.touchpadBox);

  if (this.isSocketOpen && coordinates !== null) {
    this.socket.send(coordinates);
  }

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
  offscreenCanvas!: HTMLCanvasElement;
  currentVideoStream: MediaStream;
  animationFrameId: number;

  socket: WebSocket;
  isSocketOpen: boolean = false;

  touchpadBox: TouchpadBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    isTouchpadBoxOpen: false,
    isCursorStable: false
  }

  async componentDidLoad() {
    await createGestureRecognizer();
    this.isStarted = true;
    this.webcam = document.getElementById('webcam') as HTMLVideoElement;
    this.offscreenCanvas = document.getElementById('offscreen_canvas') as HTMLCanvasElement;
    const workerCanvas = this.offscreenCanvas.transferControlToOffscreen();
    await createOffscreenCanvas(workerCanvas);
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
      this.handleServerMessage(websocketEvent);
    });
  }

  handleServerMessage(event: WebsocketEvent) {

    switch (event.name) {
      case WebsocketEvents.TOUCHPAD_BOX_OPEN:
        const {xMin, yMin, width, height} = event.data;
        this.touchpadBox = {
          x: xMin,
          y: yMin,
          width,
          height,
          isTouchpadBoxOpen: true
        }
        break;
      case WebsocketEvents.TOUCHPAD_BOX_CLOSE:
        this.touchpadBox.isTouchpadBoxOpen = false;
        break;
      case WebsocketEvents.STABILIZE_CURSOR_START:
        this.touchpadBox.isCursorStable = true
        break;
      case WebsocketEvents.STABILIZE_CURSOR_STOP:
        this.touchpadBox.isCursorStable = false
        break;
    }

    this.gestureDetected.emit(event.name);
  }

  async disconnectedCallback() {
    this.isStreaming = false;
    this.currentVideoStream.getTracks().forEach(track => track.stop());
    window.cancelAnimationFrame(this.animationFrameId);
  }

  render() {
    return (
      <div style={{position: 'relative'}}>

        {
          !this.isStarted
            ? <div class='u-absolute u-flex u-flex-column u-items-center u-justify-center'
                   style={{top: `${VIDEO_HEIGHT_RAW / 2}px`, width: VIDEO_WIDTH}}>
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
        <canvas id='offscreen_canvas' width='1280' height='720'
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
