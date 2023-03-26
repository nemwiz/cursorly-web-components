import {Component, h} from '@stencil/core';
import {createRecognizer} from '../../utils/mediapipe';
import '@mediapipe/drawing_utils';
import '@mediapipe/hands';
import {stopCameraStream} from '../../utils/camera';
import {GestureRecognizer} from '@mediapipe/tasks-vision';
import {drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils';
import {HAND_CONNECTIONS} from '@mediapipe/hands';

const VIDEO_HEIGHT = "360px";
const VIDEO_WIDTH = "480px";

declare global {
  interface Window {
    drawConnectors: typeof drawConnectors,
    drawLandmarks: typeof drawLandmarks,
    HAND_CONNECTIONS: typeof HAND_CONNECTIONS
  }
}

function startCamera() {

  if (!this.gestureRecognizer) {
    alert("Please wait for gestureRecognizer to load");
    return;
  }

  const userMediaOptions = {
    video: {
      deviceId: this.selectedCamera.deviceId
    },
  };

  navigator.mediaDevices.getUserMedia(userMediaOptions).then((stream) => {
    this.webcam.srcObject = stream;
    this.webcam.addEventListener("loadeddata", detectGesture.bind(this));

    if (typeof this.currentVideoStream !== 'undefined') {
      stopCameraStream(this.currentVideoStream);
    }

    this.currentVideoStream = stream;
  });
}

async function detectGesture() {
  let nowInMs = Date.now();
  const results = this.gestureRecognizer.recognizeForVideo(this.webcam, nowInMs);

  this.canvasContext.save();
  this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.canvas.style.height = VIDEO_HEIGHT;
  this.webcam.style.height = VIDEO_HEIGHT;
  this.canvas.style.width = VIDEO_WIDTH;
  this.webcam.style.width = VIDEO_WIDTH;

  if (results.landmarks) {
    for (const landmarks of results.landmarks) {
      window.drawConnectors(this.canvasContext, landmarks, window.HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 5
      });
      window.drawLandmarks(this.canvasContext, landmarks, {color: "#FF0000", lineWidth: 2});
    }
  }

  this.canvasContext.restore();

  // Call this function again to keep predicting when the browser is ready.
  window.requestAnimationFrame(detectGesture.bind(this));
}

@Component({
  tag: 'settings-component',
  shadow: false,
})
export class SettingsComponent {

  selectedCamera: MediaDeviceInfo;
  webcam!: HTMLVideoElement;
  canvas!: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  gestureRecognizer: GestureRecognizer;
  currentVideoStream: MediaStream;

  async componentDidLoad() {
    this.gestureRecognizer = await createRecognizer();
    await this.gestureRecognizer.setOptions({runningMode: 'VIDEO'});
    this.webcam = document.getElementById("webcam") as HTMLVideoElement;
    this.canvas = document.getElementById("output_canvas") as HTMLCanvasElement;
    this.canvasContext = this.canvas.getContext("2d");
    startCamera.apply(this);
  }

  render() {
    return (
      <div>
        <div style={{position: 'relative'}}>
          <video id="webcam" autoPlay playsInline></video>
          <canvas class="output_canvas" id="output_canvas" width="1280" height="720"
                  style={{position: 'absolute', left: '0px', top: '0px'}}></canvas>
        </div>
        <camera-selection-component onCameraSelected={(event) => {
          this.selectedCamera = event.detail;
        }
        }></camera-selection-component>
      </div>
    );
  }

}
