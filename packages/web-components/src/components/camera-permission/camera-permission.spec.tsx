jest.mock('../../utils/camera');
import {CameraPermission} from './camera-permission';
import {PermissionScreens} from './permission-screens.enum';

import {showPromptForCameraAccess} from '../../utils/camera';

const showCameraPromptMock = jest.mocked(showPromptForCameraAccess, true);

describe('camera-permission', () => {
  it('shows a page explaining user why we need camera access if access is not granted yet', async () => {
    const cameraPermissions = new CameraPermission();

    cameraPermissions.checkPermissionsAndShowScreen('prompt');

    expect(cameraPermissions.currentScreen).toEqual(PermissionScreens.PERMISSION_INFO);
  });
  it('shows a page with explanation on how to give manual camera when user denies camera access via prompt', async () => {
    const cameraPermissions = new CameraPermission();

    cameraPermissions.checkPermissionsAndShowScreen('denied');

    expect(cameraPermissions.currentScreen).toEqual(PermissionScreens.PERMISSION_DENIED);
  });
  it('shows a loading spinner and emit permission granted event when user grants access to camera', async () => {
    const cameraPermissions = new CameraPermission();
    const permissionGrantedEventSpy = jest.fn();
    cameraPermissions.permissionGranted.emit = permissionGrantedEventSpy;

    cameraPermissions.checkPermissionsAndShowScreen('granted');

    expect(cameraPermissions.currentScreen).toEqual(PermissionScreens.SPINNER);
    expect(permissionGrantedEventSpy).toHaveBeenCalled();
  });
  it('goes to the next screen', () => {
    const cameraPermissions = new CameraPermission();

    expect(cameraPermissions.currentScreen).toEqual(PermissionScreens.SPINNER);

    cameraPermissions.showNextScreen();

    expect(cameraPermissions.currentScreen).toEqual(PermissionScreens.PERMISSION_INFO);
  });
  it('when on Firefox, prompts user for camera and emits a permission granted event if user grants access', async () => {
    const cameraPermissions = new CameraPermission();
    expect(cameraPermissions.isFirefox).toEqual(false);

    const permissionGrantedEventSpy = jest.fn();
    cameraPermissions.permissionGranted.emit = permissionGrantedEventSpy;
    // @ts-ignore
    navigator.permissions = {query: jest.fn().mockRejectedValue({})};
    showCameraPromptMock.mockResolvedValue();

    await cameraPermissions.componentDidLoad();

    expect(cameraPermissions.isFirefox).toEqual(true);
    expect(cameraPermissions.currentScreen).toEqual(PermissionScreens.SPINNER);
    expect(permissionGrantedEventSpy).toHaveBeenCalled();
  });
  it('when on Firefox, prompts user for camera and emits and shows denied screen when user denies access', async () => {
    const cameraPermissions = new CameraPermission();
    expect(cameraPermissions.isFirefox).toEqual(false);

    const permissionGrantedEventSpy = jest.fn();
    cameraPermissions.permissionGranted.emit = permissionGrantedEventSpy;
    // @ts-ignore
    navigator.permissions = {query: jest.fn().mockRejectedValue({})};
    showCameraPromptMock.mockRejectedValue({});

    await cameraPermissions.componentDidLoad();

    expect(cameraPermissions.isFirefox).toEqual(true);
    expect(cameraPermissions.currentScreen).toEqual(PermissionScreens.PERMISSION_DENIED);
    expect(permissionGrantedEventSpy).not.toHaveBeenCalled();
  });
});
