import {newSpecPage} from '@stencil/core/testing';
import {SettingsComponent} from './settings-component';

describe('settings-component', () => {
  it('transmits a camera id when user selects a camera from the dropdown', async () => {
    const {doc, rootInstance} = await newSpecPage({
      components: [SettingsComponent],
      html: `<settings-component></settings-component>`,
    });

    const emitSpy = jest.spyOn(rootInstance.cameraChanged, 'emit');

    const dummyCameraId = '91823';

    doc.getElementsByTagName('camera-selection')[0].dispatchEvent(new CustomEvent('cameraSelected', {
      detail: {
        deviceId: dummyCameraId
      }
    }))

    expect(emitSpy).toHaveBeenCalledWith(dummyCameraId);
  });
  it('transmits a settings changed event when user selects a new screen from the dropdown', async () => {
    const {doc, rootInstance} = await newSpecPage({
      components: [SettingsComponent],
      html: `<settings-component></settings-component>`,
    });

    const emitSpy = jest.spyOn(rootInstance.settingsChanged, 'emit');

    const dummyScreen = {
      isSingleScreen: false,
      screen: {
        name: 'dummyScreen',
        screenId: 123
      }
    };

    doc.getElementsByTagName('screen-selection')[0].dispatchEvent(new CustomEvent('screenSelected', {
      detail: dummyScreen
    }))

    expect(emitSpy).toHaveBeenCalledWith({
      airTouchpad: {
        screenId: dummyScreen.screen.screenId,
        isSingleScreen: dummyScreen.isSingleScreen
      },
      noseTouchpad: {
        screenId: dummyScreen.screen.screenId,
        isSingleScreen: dummyScreen.isSingleScreen
      },
      notifications: true
    });
  });
});
