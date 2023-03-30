import {GestureRecognizer, GestureRecognizerResult} from '@mediapipe/tasks-vision';
import {createRecognizer} from '../../utils/mediapipe';

let recognizer: GestureRecognizer;

export const createGestureRecognizer = async () => {
  recognizer = await createRecognizer();
}

export const detect = async (image: ImageBitmap): Promise<GestureRecognizerResult> => {
  return recognizer.recognizeForVideo(image, Date.now());
}
