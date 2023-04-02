jest.mock('../../utils/camera');

import {newSpecPage} from '@stencil/core/testing';
import {CameraSelection} from './camera-selection';
import {getDevices} from '../../utils/camera';

const getDevicesMock = jest.mocked(getDevices);

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

    getDevicesMock.mockResolvedValue(
      dummyCameras
    )

    const {root} = await newSpecPage({
      components: [CameraSelection],
      html: `<camera-selection></camera-selection>`,
    });

    expect(root.innerHTML).toContain(dummyCameras[0].label);
    expect(root.innerHTML).toContain(dummyCameras[1].label);
  });
});
