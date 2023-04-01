export const processEvent = <T>(event: MessageEvent): T => {
  return JSON.parse(event.data) as T;
}
