import {Component, Event, EventEmitter, h, State} from '@stencil/core';
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
      this.cameras = getDevices(await navigator.mediaDevices.enumerateDevices());
      this.cameraSelected.emit(this.cameras[0]);
    } catch (e) {
      console.log('eee', e)
    }
  }

  render() {
    return (
      <div class="input-control">
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
    );
  }


}
