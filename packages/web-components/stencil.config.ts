import {Config} from '@stencil/core';
import {angularOutputTarget} from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'web-components',
  devServer: undefined,
  sourceMap: true,
  bundles: [
    {
      components: [
        'camera-permission',
        'camera-permission-denied',
        'camera-permission-info',
        'camera-permission-prompt',
        'camera-selection',
        'cursorly-spinner',
        'gesture-detector',
        'screen-selection',
        'settings-component',
      ]
    }
  ],
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
    },
    angularOutputTarget({
      componentCorePackage: '@cursorly/web-components',
      directivesProxyFile: '../angular-workspace/projects/web-components-angular/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular-workspace/projects/web-components-angular/src/lib/stencil-generated/index.ts',
      includeImportCustomElements: true
    })
  ],
};
