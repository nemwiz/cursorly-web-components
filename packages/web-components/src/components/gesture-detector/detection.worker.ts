import {GestureRecognizer, GestureRecognizerResult} from '@mediapipe/tasks-vision';
import {createRecognizer} from '../../utils/mediapipe';
import {TouchpadBox} from '../../model/touchpad-box';
import {
  CURSOR_POINT_COLOR,
  CURSOR_POINT_SIZE,
  DEFAULT_ANIMATION_FRAME_ID,
  INDEX_FINGER_ROOT,
  TOUCHPAD_BOX_BORDER_WIDTH, TOUCHPAD_BOX_GREEN, TOUCHPAD_BOX_ORANGE,
  VIDEO_HEIGHT_RAW,
  VIDEO_WIDTH_RAW
} from './gesture-detector-constants';


let recognizer: GestureRecognizer;
let offscreenCanvas: OffscreenCanvas;
let canvasContext: CanvasRenderingContext2D;
let requestAnimationFrameId = DEFAULT_ANIMATION_FRAME_ID;

export const createOffscreenCanvas = async (canvas: OffscreenCanvas) => {
  offscreenCanvas = canvas
  canvasContext = offscreenCanvas.getContext('2d') as unknown as CanvasRenderingContext2D;
}

export const createGestureRecognizer = async () => {
  recognizer = await createRecognizer();
}

export const getAnimationFrameId = async (): Promise<number> => {
  return requestAnimationFrameId;
}

export const drawToCanvas = (gesture: GestureRecognizerResult, touchpadBox: TouchpadBox) => {

  canvasContext.save();
  canvasContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

  if (gesture.landmarks && gesture.landmarks.length !== 0) {
    canvasContext.fillStyle = CURSOR_POINT_COLOR;
    const rectangleX = gesture.landmarks[0][INDEX_FINGER_ROOT].x * offscreenCanvas.width;
    const rectangleY = gesture.landmarks[0][INDEX_FINGER_ROOT].y * offscreenCanvas.height;
    canvasContext.fillRect(rectangleX, rectangleY, CURSOR_POINT_SIZE, CURSOR_POINT_SIZE);
  }

  if (touchpadBox.isTouchpadBoxOpen) {
    canvasContext.strokeStyle = touchpadBox.isCursorStable ? TOUCHPAD_BOX_GREEN : TOUCHPAD_BOX_ORANGE;
    canvasContext.lineWidth = TOUCHPAD_BOX_BORDER_WIDTH;
    canvasContext.strokeRect(touchpadBox.x, touchpadBox.y, touchpadBox.width, touchpadBox.height);
  }

  canvasContext.restore();
}

export const detectAndGetCoordinates = async (cameraFrame: ImageBitmap, touchpadBox: TouchpadBox, isRunningInBackground: boolean): Promise<string | null> => {

  const gesture = recognizer.recognizeForVideo(cameraFrame, Date.now());
  offscreenCanvas.height = VIDEO_HEIGHT_RAW;
  offscreenCanvas.width = VIDEO_WIDTH_RAW;

  if (!isRunningInBackground) {
    requestAnimationFrameId = requestAnimationFrame(() => {
      drawToCanvas(gesture, touchpadBox);
    });
  }

  if (gesture.landmarks && gesture.landmarks.length !== 0) {
    return JSON.stringify({
      landmarks: gesture.landmarks,
      gestures: gesture.gestures,
      handedness: gesture.handednesses,
      frame: {
        width: offscreenCanvas.width,
        height: offscreenCanvas.height
      }
    });
  }

  return null;
}
