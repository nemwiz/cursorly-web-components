import {FilesetResolver, GestureRecognizer} from '@mediapipe/tasks-vision';

export const createRecognizer = async (): Promise<GestureRecognizer> => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  return await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task"
    },
    runningMode: 'VIDEO'
  });
}
