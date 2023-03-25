import {defineCustomElements} from '../packages/web-components/dist/esm/loader';
import 'cirrus-ui';

defineCustomElements();

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    disable: true,
    values: []
  },
}
