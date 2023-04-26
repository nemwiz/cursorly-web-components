export enum WebsocketEvents {
  TOUCHPAD_BOX_OPEN = 'TOUCHPAD-BOX-OPEN',
  TOUCHPAD_BOX_CLOSE = 'TOUCHPAD-BOX-CLOSE',
  STABILIZE_CURSOR_START = 'STABILIZE-CURSOR-START',
  STABILIZE_CURSOR_STOP = 'STABILIZE-CURSOR-STOP'
}

export interface WebsocketMessageEvent<K, T> {
  name: K;
  data: T;
}

export interface TouchpadBoxOpenEvent {
  xMin: number;
  xMax: number;
  width: number;
  yMin: number;
  yMax: number;
  height: number;
}

export type WebsocketEvent =
  WebsocketMessageEvent<WebsocketEvents.TOUCHPAD_BOX_OPEN, TouchpadBoxOpenEvent> |
  WebsocketMessageEvent<WebsocketEvents.TOUCHPAD_BOX_CLOSE, {}> |
  WebsocketMessageEvent<WebsocketEvents.STABILIZE_CURSOR_START, {}> |
  WebsocketMessageEvent<WebsocketEvents.STABILIZE_CURSOR_STOP, {}>
