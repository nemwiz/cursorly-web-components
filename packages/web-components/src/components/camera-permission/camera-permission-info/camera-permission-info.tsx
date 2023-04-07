import {Component, h, Host, Event, EventEmitter, Prop} from '@stencil/core';

@Component({
  tag: 'camera-permission-info',
  shadow: false,
})
export class CameraPermissionInfo {

  /**
   * Emits the event so that the next screen could be shown
   */
  @Event({eventName: 'permissionInfoContinued'})
  permissionInfoContinued: EventEmitter<void>;

  /**
   * Hides the continue button on Firefox because Permission API for camera is not supported
   */
  @Prop()
  isFirefox: boolean;

  render() {
    return (
      <Host>
        <h4>Camera time <i class="fa-solid fa-camera"></i></h4>
        <p>By allowing camera access, Cursorly is able to detect your hand gestures and let you move the cursor in a
          touch-free manner.</p>
        <p>
          {/*{// TODO - link to Cursorly docs and privacy statement}*/}
          <a href={''} target='_blank'>How Cursorly uses your camera</a>
        </p>
        {this.isFirefox
          ? null
          : <button class='btn btn-primary' onClick={() => {
            this.permissionInfoContinued.emit();
          }}>Continue
          </button>}
      </Host>
    );
  }

}
