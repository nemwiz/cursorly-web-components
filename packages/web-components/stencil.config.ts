import {Config} from '@stencil/core';
import {angularOutputTarget} from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'web-components',
  devServer: undefined,
  sourceMap: true,
  bundles: [
    {
      components: [
        'camera-selection',
        'cursorly-spinner',
        'gesture-detector',
        'screen-selection',
        'settings-component',
      ]
    }
  ],
  testing: {
    modulePathIgnorePatterns: ['dist']
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle'
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
