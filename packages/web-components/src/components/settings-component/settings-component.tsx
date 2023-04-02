import {Component, Event, EventEmitter, h, State} from '@stencil/core';
import '@mediapipe/drawing_utils';
import '@mediapipe/hands';
import {ScreenSettings} from '../../model/screen';
import {post} from '../../service/http.service';
import {Settings} from '../../model/settings';

@Component({
  tag: 'settings-component',
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

  selectedCamera: MediaDeviceInfo | undefined;
  selectedScreen: ScreenSettings | undefined;

  @State()
  notifications: boolean = true;

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
      notifications: this.notifications
    }

    this.settingsChanged.emit(settings);
    // TODO - move this in the parent component
    await post<void, Settings>('http://localhost:39459/settings', settings);
  }

  render() {
    return (
      <div class="u-flex u-flex-column w-40p">

        <camera-selection onCameraSelected={async (event) => {
          this.selectedCamera = event.detail;
          this.cameraChanged.emit(this.selectedCamera.deviceId);
        }
        }></camera-selection>

        <screen-selection class="mt-2" onScreenSelected={async (event) => {
          this.selectedScreen = event.detail;
          await this.setSettings();
        }
        }></screen-selection>

        <div class="form-ext-control no-padding-form-control mt-2">
          <label class="form-ext-toggle__label"><span>Notifications</span>
            <div class="form-ext-toggle form-ext-toggle--dark">
              <input type="checkbox" class="form-ext-input" checked={this.notifications}
                     onChange={async () => {
                       this.notifications = !this.notifications;
                       await this.setSettings();
                     }}/>
              <div class="form-ext-toggle__toggler"><i></i></div>
            </div>
          </label>
        </div>

      </div>
    );
  }

}
