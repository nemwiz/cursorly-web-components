export interface Screen {
  name: string;
  screenId: number;
}

export interface ScreenSettings {
  isSingleScreen: boolean;
  screen: Screen;
}
