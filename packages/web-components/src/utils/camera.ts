export const getDevices = async () => {
  const mediaDevices = await navigator.mediaDevices.enumerateDevices()
  return mediaDevices
    .filter(mediaDevice => mediaDevice.kind === 'videoinput');
}
