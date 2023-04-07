import {Component, Event, EventEmitter, h} from '@stencil/core';
import {showPromptForCameraAccess} from '../../../utils/camera';

@Component({
  tag: 'camera-permission-prompt',
  shadow: false,
})
export class CameraPermissionPrompt {

  /**
   * This event notifies parents components that the user granted permission to use the camera
   */
  @Event({eventName: 'cameraPermissionGranted'})
  cameraPermissionGranted: EventEmitter<boolean>;

  async componentDidLoad() {

    try {
      await showPromptForCameraAccess();
      this.cameraPermissionGranted.emit(true);
    } catch {
      this.cameraPermissionGranted.emit(false);
    }
  }

  render() {
    return (
      <p>Almost there... Please press the popup at the top of the screen.</p>
    );
  }

}
