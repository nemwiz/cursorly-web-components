export interface CreateSettingsRequest {
  airTouchpad: {
    screenId: number;
    isSingleScreen: boolean;
  };
  noseTouchpad: {
    screenId: number;
    isSingleScreen: boolean;
  };
  notifications: boolean;
}
