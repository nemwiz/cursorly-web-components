export const getDevices = async () => {
  const mediaDevices = await navigator.mediaDevices.enumerateDevices()
  return mediaDevices
    .filter(mediaDevice => mediaDevice.kind === 'videoinput');
}

export const stopCameraStream = (stream: MediaStream): void => {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}
