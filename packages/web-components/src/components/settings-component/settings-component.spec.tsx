import { newSpecPage } from '@stencil/core/testing';
import { SettingsComponent } from '../settings-component';

describe('settings-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SettingsComponent],
      html: `<settings-component></settings-component>`,
    });
    expect(page.root).toEqualHtml(`
      <settings-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </settings-component>
    `);
  });
});
