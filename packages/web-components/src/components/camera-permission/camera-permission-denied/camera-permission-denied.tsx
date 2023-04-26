import {Component, h, Host, Prop} from '@stencil/core';

@Component({
  tag: 'camera-permission-denied',
  shadow: false,
})
export class CameraPermissionDenied {

  /**
   * Url to Cursorly documentation
   */
  @Prop()
  docsUrl: string = '#';

  render() {
    return (
      <Host>
        <h4>We still need camera access :(</h4>
        <p>Sorry, Cursorly can't work without a camera. You'll have to enable the permissions manually within your
          browser.
          Follow below articles on how to do that.</p>

        <ul>
          <li>
            <a href={'https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DDesktop'}
               target='_blank'>
              Allow camera access on Chrome
            </a>
          </li>

          <li>
            <a href={'https://support.mozilla.org/en-US/kb/how-manage-your-camera-and-microphone-permissions'}
               target='_blank'>
              Allow camera access on Firefox
            </a>
          </li>

          <li>
            <a
              href={'https://support.microsoft.com/en-us/windows/windows-camera-microphone-and-privacy-a83257bc-e990-d54a-d212-b5e41beba857'}
              target='_blank'>
              Allow camera access on Edge
            </a>
          </li>

          <li>
            <a href={this.docsUrl} target='_blank'>How Cursorly uses your camera</a>
          </li>
        </ul>

      </Host>
    );
  }

}
