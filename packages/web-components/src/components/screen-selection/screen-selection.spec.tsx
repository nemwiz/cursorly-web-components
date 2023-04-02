import {newSpecPage} from '@stencil/core/testing';
import {ScreenSelection} from './screen-selection';

describe('screen-selection', () => {
  it('shows the list of screens', async () => {

    const dummyScreens = [
      {name: 'TestScreen1', screenId: 123},
      {name: 'TestScreen2', screenId: 456}
    ]

    const {root} = await newSpecPage({
      components: [ScreenSelection],
      html: `<screen-selection screens='${JSON.stringify(dummyScreens)}'></screen-selection>`,
    });

    expect(root.innerHTML).toContain(dummyScreens[0].name);
    expect(root.innerHTML).toContain(dummyScreens[1].name);
  });
});
