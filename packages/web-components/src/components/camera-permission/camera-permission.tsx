import {Component, Event, EventEmitter, h, Listen, State} from '@stencil/core';
import {showPromptForCameraAccess} from '../../utils/camera';
import {PermissionScreens} from './permission-screens.enum';

@Component({
  tag: 'camera-permission',
  shadow: false,
})
export class CameraPermission {

  /**
   * This event notifies parents components that the user granted permission to use the camera
   */
  @Event({eventName: 'permissionGranted'})
  permissionGranted: EventEmitter<void>;

  @State()
  currentScreen: PermissionScreens = PermissionScreens.SPINNER;

  @State()
  isFirefox = false;

  permissions: PermissionStatus;

  @Listen('permissionInfoContinued')
  permissionInfoContinuedHandler() {
    this.showNextScreen();
  }

  @Listen('cameraPermissionGranted')
  cameraPermissionGrantedHandler(event: CustomEvent<boolean>) {
    event.detail ? this.permissionWasGranted() : this.currentScreen = PermissionScreens.PERMISSION_DENIED;
  }

  showNextScreen() {
    this.currentScreen = this.currentScreen + 1;
  }

  permissionWasGranted() {
    this.currentScreen = PermissionScreens.SPINNER;
    this.permissionGranted.emit();
  }

  checkPermissionsAndShowScreen(permissionState: PermissionState) {
    if (permissionState === 'granted') {
      this.permissionWasGranted()
    } else if (permissionState === 'prompt') {
      this.currentScreen = PermissionScreens.PERMISSION_INFO;
    } else if (permissionState === 'denied') {
      this.currentScreen = PermissionScreens.PERMISSION_DENIED;
    }
  }

  async componentDidLoad() {
    try {
      // @ts-ignore
      this.permissions = await navigator.permissions.query({name: 'camera'});
      this.checkPermissionsAndShowScreen(this.permissions.state);

      this.permissions.addEventListener('change', () => {
        this.checkPermissionsAndShowScreen(this.permissions.state);
      });
    } catch {
      this.isFirefox = true;
      this.currentScreen = PermissionScreens.PERMISSION_INFO;
      try {
        await showPromptForCameraAccess();
        this.permissionWasGranted()
      } catch {
        this.currentScreen = PermissionScreens.PERMISSION_DENIED;
      }
    }

  }

  disconnectedCallback() {
    if (this.permissions) {
      this.permissions.removeEventListener('change', () => {
      });
    }
  }

  render() {
    return (
      <div>
        {this.currentScreen === PermissionScreens.PERMISSION_INFO
          ? <camera-permission-info is-firefox={this.isFirefox}></camera-permission-info>
          : null}
        {this.currentScreen === PermissionScreens.PERMISSION_PROMPT
          ? <camera-permission-prompt></camera-permission-prompt>
          : null}
        {this.currentScreen === PermissionScreens.PERMISSION_DENIED
          ? <camera-permission-denied></camera-permission-denied>
          : null}
        {this.currentScreen === PermissionScreens.SPINNER
          ? <cursoly-spinner size={'large'}></cursoly-spinner>
          : null}
      </div>
    );
  }

}
