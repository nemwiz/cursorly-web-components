export const showPromptForCameraAccess = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
  stream.getTracks().forEach(t => t.stop());
}
