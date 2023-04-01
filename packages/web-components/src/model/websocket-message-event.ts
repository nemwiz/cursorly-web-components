export enum WebsocketEvents {
  TOUCHPAD_BOX_OPEN = 'TOUCHPAD-BOX-OPEN',
  TOUCHPAD_BOX_CLOSE = 'TOUCHPAD-BOX-CLOSE'
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
  WebsocketMessageEvent<WebsocketEvents.TOUCHPAD_BOX_CLOSE, {}>
