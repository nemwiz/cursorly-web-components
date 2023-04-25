export const getDevices = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
  const mediaDevices = await navigator.mediaDevices.enumerateDevices();
  stream.getTracks().forEach(t => t.stop());
  return mediaDevices
    .filter(mediaDevice => mediaDevice.kind === 'videoinput');
}

export const showPromptForCameraAccess = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
  stream.getTracks().forEach(t => t.stop());
}
