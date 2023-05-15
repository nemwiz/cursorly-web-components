/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from '@cursorly/web-components/components';

import { defineCustomElement as defineCameraPermission } from '@cursorly/web-components/components/camera-permission.js';
import { defineCustomElement as defineCameraPermissionDenied } from '@cursorly/web-components/components/camera-permission-denied.js';
import { defineCustomElement as defineCameraPermissionInfo } from '@cursorly/web-components/components/camera-permission-info.js';
import { defineCustomElement as defineCameraPermissionPrompt } from '@cursorly/web-components/components/camera-permission-prompt.js';
import { defineCustomElement as defineCameraSelection } from '@cursorly/web-components/components/camera-selection.js';
import { defineCustomElement as defineCursorlySpinner } from '@cursorly/web-components/components/cursorly-spinner.js';
import { defineCustomElement as defineGestureDetector } from '@cursorly/web-components/components/gesture-detector.js';
import { defineCustomElement as defineScreenSelection } from '@cursorly/web-components/components/screen-selection.js';
import { defineCustomElement as defineSettingsComponent } from '@cursorly/web-components/components/settings-component.js';
@ProxyCmp({
  defineCustomElementFn: defineCameraPermission,
  inputs: ['docsUrl']
})
@Component({
  selector: 'camera-permission',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['docsUrl'],
})
export class CameraPermission {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['permissionGranted']);
  }
}


export declare interface CameraPermission extends Components.CameraPermission {
  /**
   * This event notifies parents components that the user granted permission to use the camera
   */
  permissionGranted: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCameraPermissionDenied,
  inputs: ['docsUrl']
})
@Component({
  selector: 'camera-permission-denied',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['docsUrl'],
})
export class CameraPermissionDenied {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CameraPermissionDenied extends Components.CameraPermissionDenied {}


@ProxyCmp({
  defineCustomElementFn: defineCameraPermissionInfo,
  inputs: ['docsUrl', 'isFirefox']
})
@Component({
  selector: 'camera-permission-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['docsUrl', 'isFirefox'],
})
export class CameraPermissionInfo {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['permissionInfoContinued']);
  }
}


export declare interface CameraPermissionInfo extends Components.CameraPermissionInfo {
  /**
   * Emits the event so that the next screen could be shown
   */
  permissionInfoContinued: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCameraPermissionPrompt
})
@Component({
  selector: 'camera-permission-prompt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class CameraPermissionPrompt {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['cameraPermissionGranted']);
  }
}


export declare interface CameraPermissionPrompt extends Components.CameraPermissionPrompt {
  /**
   * This event notifies parents components that the user granted permission to use the camera
   */
  cameraPermissionGranted: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCameraSelection,
  inputs: ['cameras']
})
@Component({
  selector: 'camera-selection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cameras'],
})
export class CameraSelection {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['cameraSelected']);
  }
}


export declare interface CameraSelection extends Components.CameraSelection {
  /**
   * When a camera gets selected from the dropdown, this event emits [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo)
   */
  cameraSelected: EventEmitter<CustomEvent<MediaDeviceInfo>>;
}


@ProxyCmp({
  defineCustomElementFn: defineCursorlySpinner,
  inputs: ['size']
})
@Component({
  selector: 'cursorly-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['size'],
})
export class CursorlySpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface CursorlySpinner extends Components.CursorlySpinner {}


@ProxyCmp({
  defineCustomElementFn: defineGestureDetector,
  inputs: ['cameraId', 'websocketUrl']
})
@Component({
  selector: 'gesture-detector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cameraId', 'websocketUrl'],
})
export class GestureDetector {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['gestureDetected']);
  }
}


export declare interface GestureDetector extends Components.GestureDetector {
  /**
   * Event that fires off when one of the supported gestures is detected
   */
  gestureDetected: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  defineCustomElementFn: defineScreenSelection,
  inputs: ['screens']
})
@Component({
  selector: 'screen-selection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['screens'],
})
export class ScreenSelection {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['screenSelected']);
  }
}


import type { ScreenSettings as IScreenSelectionScreenSettings } from '@cursorly/web-components/components';

export declare interface ScreenSelection extends Components.ScreenSelection {
  /**
   * When a screen gets selected from the dropdown, this event emits selected screen information
   */
  screenSelected: EventEmitter<CustomEvent<IScreenSelectionScreenSettings>>;
}


@ProxyCmp({
  defineCustomElementFn: defineSettingsComponent,
  inputs: ['cameras', 'screens']
})
@Component({
  selector: 'settings-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cameras', 'screens'],
})
export class SettingsComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['settingsChanged', 'cameraChanged']);
  }
}


import type { Settings as ISettingsComponentSettings } from '@cursorly/web-components/components';

export declare interface SettingsComponent extends Components.SettingsComponent {
  /**
   * Triggers every time when a user updates any of the settings
   */
  settingsChanged: EventEmitter<CustomEvent<ISettingsComponentSettings>>;
  /**
   * Re-emits the camera id. This one is only used locally within the browser
   */
  cameraChanged: EventEmitter<CustomEvent<string>>;
}


