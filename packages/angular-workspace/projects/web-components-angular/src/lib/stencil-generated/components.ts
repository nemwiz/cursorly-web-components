/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from '@cursorly/web-components/components';

import { defineCustomElement as defineCameraSelection } from '@cursorly/web-components/components/camera-selection.js';
import { defineCustomElement as defineCursorlySpinner } from '@cursorly/web-components/components/cursorly-spinner.js';
import { defineCustomElement as defineGestureDetector } from '@cursorly/web-components/components/gesture-detector.js';
import { defineCustomElement as defineScreenSelection } from '@cursorly/web-components/components/screen-selection.js';
import { defineCustomElement as defineSettingsComponent } from '@cursorly/web-components/components/settings-component.js';
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


