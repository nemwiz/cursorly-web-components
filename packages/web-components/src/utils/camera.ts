export const getDevices = async () => {
  await navigator.mediaDevices.getUserMedia({video: true, audio: false});
  const mediaDevices = await navigator.mediaDevices.enumerateDevices();
  return mediaDevices
    .filter(mediaDevice => mediaDevice.kind === 'videoinput');
}

export const showPromptForCameraAccess = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
  stream.getTracks().forEach(t => t.stop());
}
