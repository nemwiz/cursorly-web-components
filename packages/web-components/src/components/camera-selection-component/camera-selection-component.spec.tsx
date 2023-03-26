import { newSpecPage } from '@stencil/core/testing';
import { CameraSelectionComponent } from './camera-selection-component';

describe('camera-selection-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CameraSelectionComponent],
      html: `<camera-selection-component></camera-selection-component>`,
    });
    expect(page.root).toEqualHtml(`
      <camera-selection-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </camera-selection-component>
    `);
  });
});
