export const getDevices = (mediaDevices: MediaDeviceInfo[]) => {
  return mediaDevices
    .filter(mediaDevice => mediaDevice.kind === 'videoinput');
}

export const stopCameraStream = (stream: MediaStream): void => {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}
