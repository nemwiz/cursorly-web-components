import {Config} from '@stencil/core';

export const config: Config = {
  namespace: 'web-components',
  devServer: undefined,
  sourceMap: true,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
      strict: true,
      footer: 'Built by Cursorly'
    }
  ],
};
