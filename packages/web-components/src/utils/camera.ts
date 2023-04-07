export const getDevices = async () => {
  const mediaDevices = await navigator.mediaDevices.enumerateDevices()
  return mediaDevices
    .filter(mediaDevice => mediaDevice.kind === 'videoinput');
}

export const showPromptForCameraAccess = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({video: true});
  stream.getTracks().forEach(t => t.stop());
}
