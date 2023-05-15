import {newSpecPage} from '@stencil/core/testing';
import {CameraSelection} from './camera-selection';

describe('camera-selection', () => {

  const dummyCameras = [
    {
      deviceId: '123',
      groupId: '',
      kind: '',
      label: 'TestCamera1'
    },
    {
      deviceId: '456',
      groupId: '',
      kind: '',
      label: 'TestCamera2'
    }
  ] as unknown as MediaDeviceInfo[];

  it('shows a list of cameras provided by the browser', async () => {

    const {root} = await newSpecPage({
      components: [CameraSelection],
      html: `<camera-selection cameras='${JSON.stringify(dummyCameras)}'></camera-selection>`,
    });

    expect(root.innerHTML).toContain(dummyCameras[0].label);
    expect(root.innerHTML).toContain(dummyCameras[1].label);
  });
});
