import {Component, Event, EventEmitter, h, Host, State} from '@stencil/core';
import {getDevices} from '../../utils/camera';

@Component({
  tag: 'camera-selection',
  shadow: false,
})
export class CameraSelection {

  /**
   * When a camera gets selected from the dropdown, this event emits [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo)
   */
  @Event({eventName: 'cameraSelected'})
  cameraSelected: EventEmitter<MediaDeviceInfo>;

  @State()
  cameras: MediaDeviceInfo[] = [];

  async componentDidLoad() {
    try {
      this.cameras = await getDevices();
      this.cameraSelected.emit(this.cameras[0]);
    } catch (e) {
      console.log('There was an error while setting up the camera', e);
      this.cameraSelected.emit(null);
    }
  }

  render() {
    return (
      <Host>
        <div>
          <label>Camera</label>
        </div>
        {
          this.cameras.length !== 0
            ? <div class="input-control">
              <select class="select" onChange={(event: Event) => {
                const selectedCamera = this.cameras.find(c => c.deviceId === (event.target as HTMLSelectElement).value);
                this.cameraSelected.emit(selectedCamera);
              }}>
                {this.cameras.map(camera =>
                  <option value={camera.deviceId}>
                    {camera.label}
                  </option>
                )}
              </select>
            </div>
            : <cursorly-spinner></cursorly-spinner>
        }
      </Host>
    );
  }


}
