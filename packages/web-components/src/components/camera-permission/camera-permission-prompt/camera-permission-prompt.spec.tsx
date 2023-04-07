jest.mock('../../../utils/camera');

import {showPromptForCameraAccess} from '../../../utils/camera';
import {CameraPermissionPrompt} from './camera-permission-prompt';

const showCameraPromptMock = jest.mocked(showPromptForCameraAccess, true);

describe('camera-permission-prompt', () => {
  it('shows a prompt to the user and emit success event when user grants permissions', async () => {
    const cameraPermissionPrompt = new CameraPermissionPrompt();
    const permissionGrantedEventSpy = jest.fn();
    cameraPermissionPrompt.cameraPermissionGranted.emit = permissionGrantedEventSpy;
    showCameraPromptMock.mockResolvedValue();

    await cameraPermissionPrompt.componentDidLoad();

    expect(permissionGrantedEventSpy).toHaveBeenCalledWith(true);
  });
  it('shows a prompt to the user and emit failure event when user does grants permissions', async () => {
    const cameraPermissionPrompt = new CameraPermissionPrompt();
    const permissionGrantedEventSpy = jest.fn();
    cameraPermissionPrompt.cameraPermissionGranted.emit = permissionGrantedEventSpy;
    showCameraPromptMock.mockRejectedValue({});

    await cameraPermissionPrompt.componentDidLoad();

    expect(permissionGrantedEventSpy).toHaveBeenCalledWith(false);
  });
});
