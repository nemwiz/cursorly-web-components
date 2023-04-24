export default () => 'hello';

export class FilesetResolver {
  static forVisionTasks = () => jest.fn().mockResolvedValue({});
}

export class GestureRecognizer {
  static createFromOptions = jest.fn().mockResolvedValue({
    recognizeForVideo: () => jest.fn().mockReturnValue({landmarks: []})
  })
}
