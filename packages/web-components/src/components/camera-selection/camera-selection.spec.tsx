import { newSpecPage } from '@stencil/core/testing';
import { CameraSelection } from './camera-selection';

describe('camera-selection', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CameraSelection],
      html: `<camera-selection></camera-selection>`,
    });
    expect(page.root).toEqualHtml(`
      <camera-selection>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </camera-selection>
    `);
  });
});
