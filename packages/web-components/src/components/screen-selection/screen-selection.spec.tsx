import { newSpecPage } from '@stencil/core/testing';
import { ScreenSelection } from './screen-selection';

describe('screen-selection', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ScreenSelection],
      html: `<screen-selection></screen-selection>`,
    });
    expect(page.root).toEqualHtml(`
      <screen-selection>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </screen-selection>
    `);
  });
});
