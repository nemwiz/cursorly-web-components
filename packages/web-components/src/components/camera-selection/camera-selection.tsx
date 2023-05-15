import {Component, Event, EventEmitter, h, Host, Prop} from '@stencil/core';

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

  /**
   * JSON.stringify() array of cameras
   */
  @Prop()
  cameras: string = '';

  camerasInfo: MediaDeviceInfo[] = [];

  componentWillRender() {
    this.camerasInfo = JSON.parse(this.cameras);
  }

  async componentDidLoad() {
    this.cameraSelected.emit(this.camerasInfo[0]);
  }

  render() {
    return (
      <Host>
        <div>
          <label>Camera</label>
        </div>
        {
          this.camerasInfo.length !== 0
            ? <div class="input-control">
              <select class="select" onChange={(event: Event) => {
                const selectedCamera = this.camerasInfo.find(c => c.deviceId === (event.target as HTMLSelectElement).value);
                this.cameraSelected.emit(selectedCamera);
              }}>
                {this.camerasInfo.map(camera =>
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
