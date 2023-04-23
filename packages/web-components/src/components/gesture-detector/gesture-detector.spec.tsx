import {createOffscreenCanvas, drawToCanvas} from './detection.worker';
import {GestureRecognizerResult} from '@mediapipe/tasks-vision';
import {TouchpadBox} from '../../model/touchpad-box';
import {
  CURSOR_POINT_COLOR,
  CURSOR_POINT_SIZE,
  TOUCHPAD_BOX_GREEN,
  TOUCHPAD_BOX_ORANGE
} from './gesture-detector-constants';
import {GestureDetector} from './gesture-detector';
import {WebsocketEvents} from '../../model/websocket-message-event';

describe('gesture-detector', () => {
  it('saves, clears and restores canvas context for every draw to canvas', async () => {

    const dummyCanvasContext = {
      save: jest.fn(),
      clearRect: jest.fn(),
      restore: jest.fn(),
    }
    const dummyCanvas = {
      getContext: () => dummyCanvasContext
    }

    await createOffscreenCanvas(dummyCanvas as unknown as OffscreenCanvas);

    await drawToCanvas({landmarks: []} as GestureRecognizerResult, {} as TouchpadBox);

    expect(dummyCanvasContext.save).toHaveBeenCalled();
    expect(dummyCanvasContext.clearRect).toHaveBeenCalled();
    expect(dummyCanvasContext.restore).toHaveBeenCalled();
  });
  it('draws a rectangle when touchpad box is open', async () => {
    const dummyCanvasContext = {
      save: jest.fn(),
      clearRect: jest.fn(),
      restore: jest.fn(),
      fillRect: jest.fn(),
      strokeRect: jest.fn()
    }
    const dummyCanvas = {
      getContext: () => dummyCanvasContext,
    };
    const dummyTouchpadBox = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      isTouchpadBoxOpen: true,
      isCursorStable: false
    }

    await createOffscreenCanvas(dummyCanvas as unknown as OffscreenCanvas);
    await drawToCanvas({} as GestureRecognizerResult, dummyTouchpadBox);

    expect(dummyCanvasContext.strokeRect).toHaveBeenCalledWith(
      dummyTouchpadBox.x,
      dummyTouchpadBox.y,
      dummyTouchpadBox.width,
      dummyTouchpadBox.height
    );
  });
  it('does not draw a rectangle when touchpad box is not open', async () => {
    const dummyCanvasContext = {
      save: jest.fn(),
      clearRect: jest.fn(),
      restore: jest.fn(),
      fillRect: jest.fn(),
      strokeRect: jest.fn()
    }
    const dummyCanvas = {
      getContext: () => dummyCanvasContext,
    };
    const dummyTouchpadBox = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      isTouchpadBoxOpen: false,
      isCursorStable: false
    }

    await createOffscreenCanvas(dummyCanvas as unknown as OffscreenCanvas);
    await drawToCanvas({} as GestureRecognizerResult, dummyTouchpadBox);

    expect(dummyCanvasContext.strokeRect).not.toHaveBeenCalled();
  });
  it('shows a green touchpad box when cursor is stable', async () => {
    const dummyCanvasContext = {
      save: jest.fn(),
      clearRect: jest.fn(),
      restore: jest.fn(),
      fillRect: jest.fn(),
      strokeRect: jest.fn(),
      strokeStyle: '#000000'
    }
    const dummyCanvas = {
      getContext: () => dummyCanvasContext,
    };
    const dummyTouchpadBox = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      isTouchpadBoxOpen: true,
      isCursorStable: true
    }

    await createOffscreenCanvas(dummyCanvas as unknown as OffscreenCanvas);
    await drawToCanvas({} as GestureRecognizerResult, dummyTouchpadBox);

    expect(dummyCanvasContext.strokeStyle).toEqual(TOUCHPAD_BOX_GREEN);
  });
  it('shows an orange touchpad box when cursor is moving', async () => {
    const dummyCanvasContext = {
      save: jest.fn(),
      clearRect: jest.fn(),
      restore: jest.fn(),
      fillRect: jest.fn(),
      strokeRect: jest.fn(),
      strokeStyle: '#000000'
    }
    const dummyCanvas = {
      getContext: () => dummyCanvasContext,
    };
    const dummyTouchpadBox = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      isTouchpadBoxOpen: true,
      isCursorStable: false
    }

    await createOffscreenCanvas(dummyCanvas as unknown as OffscreenCanvas);
    await drawToCanvas({} as GestureRecognizerResult, dummyTouchpadBox);

    expect(dummyCanvasContext.strokeStyle).toEqual(TOUCHPAD_BOX_ORANGE);
  });
  it('draws a cursor point when index finger is visible to the camera', async () => {
    const dummyCanvasContext = {
      save: jest.fn(),
      clearRect: jest.fn(),
      restore: jest.fn(),
      fillRect: jest.fn(),
      fillStyle: '',
      strokeRect: jest.fn(),
      strokeStyle: '#000000'
    }
    const dummyCanvas = {
      getContext: () => dummyCanvasContext,
      width: 1,
      height: 1
    };
    const dummyCoordinate = {x: 111, y: 111};
    const recognizerResult = {
      landmarks: [
        [
          {x: 1, y: 1},
          {x: 1, y: 1},
          {x: 1, y: 1},
          {x: 1, y: 1},
          {x: 1, y: 1},
          dummyCoordinate
        ]
      ]
    };

    await createOffscreenCanvas(dummyCanvas as unknown as OffscreenCanvas);
    await drawToCanvas(recognizerResult as GestureRecognizerResult, {} as TouchpadBox);

    expect(dummyCanvasContext.fillStyle).toEqual(CURSOR_POINT_COLOR);
    expect(dummyCanvasContext.fillRect).toHaveBeenCalledWith(
      dummyCoordinate.x,
      dummyCoordinate.y,
      CURSOR_POINT_SIZE,
      CURSOR_POINT_SIZE,
    )
  });
  it('does not draw a cursor point when index finger is not visible to the camera', async () => {
    const dummyCanvasContext = {
      save: jest.fn(),
      clearRect: jest.fn(),
      restore: jest.fn(),
      fillRect: jest.fn(),
      fillStyle: '',
      strokeRect: jest.fn(),
      strokeStyle: '#000000'
    }
    const dummyCanvas = {
      getContext: () => dummyCanvasContext,
    };
    const recognizerResult = {};

    await createOffscreenCanvas(dummyCanvas as unknown as OffscreenCanvas);
    await drawToCanvas(recognizerResult as GestureRecognizerResult, {} as TouchpadBox);

    expect(dummyCanvasContext.fillRect).not.toHaveBeenCalled();
  });
  it('creates the touchpad box', () => {
    const event = {
      name: WebsocketEvents.TOUCHPAD_BOX_OPEN,
      data: {
        xMin: 123,
        xMax: 123,
        width: 123,
        yMin: 123,
        yMax: 123,
        height: 123,
      }
    }
    const gestureDetector = new GestureDetector();
    gestureDetector.gestureDetected.emit = jest.fn();
    gestureDetector.touchpadBox.isTouchpadBoxOpen = false;

    gestureDetector.handleServerMessage(event);

    expect(gestureDetector.touchpadBox.height).toEqual(event.data.height);
    expect(gestureDetector.touchpadBox.width).toEqual(event.data.width);
    expect(gestureDetector.touchpadBox.y).toEqual(event.data.yMin);
    expect(gestureDetector.touchpadBox.x).toEqual(event.data.xMin);
    expect(gestureDetector.touchpadBox.isTouchpadBoxOpen).toEqual(true);
    expect(gestureDetector.gestureDetected.emit).toHaveBeenCalledWith(event.name);
  });
  it('destroys the touchpad box', () => {
    const event = {
      name: WebsocketEvents.TOUCHPAD_BOX_CLOSE,
      data: {}
    } as any;
    const gestureDetector = new GestureDetector();
    gestureDetector.gestureDetected.emit = jest.fn();
    gestureDetector.touchpadBox.isTouchpadBoxOpen = true;

    gestureDetector.handleServerMessage(event);

    expect(gestureDetector.touchpadBox.isTouchpadBoxOpen).toEqual(false);
    expect(gestureDetector.gestureDetected.emit).toHaveBeenCalledWith(event.name);
  });
  it('starts stable cursor period', () => {
    const event = {
      name: WebsocketEvents.STABILIZE_CURSOR_START,
      data: {}
    } as any;
    const gestureDetector = new GestureDetector();
    gestureDetector.gestureDetected.emit = jest.fn();
    gestureDetector.touchpadBox.isCursorStable = false;

    gestureDetector.handleServerMessage(event);

    expect(gestureDetector.touchpadBox.isCursorStable).toEqual(true);
    expect(gestureDetector.gestureDetected.emit).toHaveBeenCalledWith(event.name);
  });
  it('stops stable cursor period', () => {
    const event = {
      name: WebsocketEvents.STABILIZE_CURSOR_STOP,
      data: {}
    } as any;
    const gestureDetector = new GestureDetector();
    gestureDetector.gestureDetected.emit = jest.fn();
    gestureDetector.touchpadBox.isCursorStable = true;

    gestureDetector.handleServerMessage(event);

    expect(gestureDetector.touchpadBox.isCursorStable).toEqual(false);
    expect(gestureDetector.gestureDetected.emit).toHaveBeenCalledWith(event.name);
  });
  it('cleans up video stream and animation frames when component is destroyed', async () => {
    const dummyAnimationId = 999;

    const gestureDetector = new GestureDetector();
    gestureDetector.isStreaming = true;
    gestureDetector.animationFrameId = dummyAnimationId;

    const dummyTrack = {
      stop: jest.fn()
    } as any;
    gestureDetector.currentVideoStream = {
      getTracks: () => [dummyTrack]
    } as any;

    const windowSpy = jest.spyOn(global.window, 'cancelAnimationFrame');

    await gestureDetector.disconnectedCallback();

    expect(dummyTrack.stop).toHaveBeenCalled();
    expect(gestureDetector.isStreaming).toEqual(false);
    expect(windowSpy).toHaveBeenCalledWith(dummyAnimationId);
  });
});
