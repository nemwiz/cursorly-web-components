export enum WebsocketEvents {
  TOUCHPAD_BOX = 'TOUCHPAD-BOX'
}

export interface WebsocketMessageEvent<T> {
  name: WebsocketEvents;
  data: T;
}

export interface TouchpadBoxEvent {
  xMin: number;
  xMax: number;
  width: number;
  yMin: number;
  yMax: number;
  height: number;
}
