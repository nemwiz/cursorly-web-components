import { newSpecPage } from '@stencil/core/testing';
import { CameraPermissionInfo } from './camera-permission-info';

describe('camera-permission-info', () => {
  it('does not show continue button when rendered on Firefox', async () => {
    const page = await newSpecPage({
      components: [CameraPermissionInfo],
      html: `<camera-permission-info is-firefox="true"></camera-permission-info>`,
    });


    expect(page.root.innerHTML).not.toContain('button');
  });
  it('shows continue button when rendered on other browsers', async () => {
    const page = await newSpecPage({
      components: [CameraPermissionInfo],
      html: `<camera-permission-info is-firefox="false"></camera-permission-info>`,
    });


    expect(page.root.innerHTML).toContain('button');
  });
});
