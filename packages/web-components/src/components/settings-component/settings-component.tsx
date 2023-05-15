import {Component, Event, EventEmitter, h, Prop} from '@stencil/core';
import {ScreenSettings} from '../../model/screen';
import {Settings} from '../../model/settings';

@Component({
  tag: 'settings-component',
  styles: `.no-padding-form-control {
  padding: 0! important;
  }`,
  shadow: false,
})
export class SettingsComponent {

  /**
   * Triggers every time when a user updates any of the settings
   */
  @Event({eventName: 'settingsChanged'})
  settingsChanged: EventEmitter<Settings>;

  /**
   * Re-emits the camera id. This one is only used locally within the browser
   */
  @Event({eventName: 'cameraChanged'})
  cameraChanged: EventEmitter<string>;

   /**
   * JSON.stringify() array of screens
   */
  @Prop()
  screens: string;

  /**
   * JSON.stringify() array of cameras
   */
  @Prop()
  cameras: string = '';

  selectedCamera: MediaDeviceInfo | undefined;
  selectedScreen: ScreenSettings | undefined;

  async setSettings() {
    const settings = {
      airTouchpad: {
        screenId: this.selectedScreen?.screen.screenId,
        isSingleScreen: this.selectedScreen?.isSingleScreen
      },
      noseTouchpad: {
        screenId: this.selectedScreen?.screen.screenId,
        isSingleScreen: this.selectedScreen?.isSingleScreen
      },
      notifications: false
    }

    this.settingsChanged.emit(settings);
  }

  render() {
    return (
      <div class="u-flex u-flex-column">

        <camera-selection cameras={this.cameras} onCameraSelected={async (event) => {
          this.selectedCamera = event.detail;
          this.cameraChanged.emit(this.selectedCamera.deviceId);
        }
        }></camera-selection>

        <screen-selection class="mt-2"
                          screens={this.screens}
                          onScreenSelected={async (event) => {
                            this.selectedScreen = event.detail;
                            await this.setSettings();
                          }}></screen-selection>

      </div>
    );
  }

}
