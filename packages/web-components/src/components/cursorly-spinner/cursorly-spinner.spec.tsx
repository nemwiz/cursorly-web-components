import { newSpecPage } from '@stencil/core/testing';
import { CursorlySpinner } from './cursorly-spinner';

describe('cursorly-spinner', () => {
  it('renders a spinner of regular size', async () => {
    const {root} = await newSpecPage({
      components: [CursorlySpinner],
      html: `<cursorly-spinner></cursorly-spinner>`,
    });

    expect(root.innerHTML).not.toContain('spinner-size-override');
  });
  it('renders a large spinner', async () => {
    const {root} = await newSpecPage({
      components: [CursorlySpinner],
      html: `<cursorly-spinner size="large"></cursorly-spinner>`,
    });

    expect(root.innerHTML).toContain('spinner-size-override');
  });
});
