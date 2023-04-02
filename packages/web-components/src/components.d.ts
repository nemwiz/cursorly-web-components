/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ScreenSettings } from "./model/screen";
import { Settings } from "./model/settings";
export { ScreenSettings } from "./model/screen";
export { Settings } from "./model/settings";
export namespace Components {
    interface CameraSelection {
    }
    interface GestureDetector {
        /**
          * The device id of selected camera
         */
        "cameraId": string;
    }
    interface ScreenSelection {
    }
    interface SettingsComponent {
    }
}
export interface CameraSelectionCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCameraSelectionElement;
}
export interface ScreenSelectionCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLScreenSelectionElement;
}
export interface SettingsComponentCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLSettingsComponentElement;
}
declare global {
    interface HTMLCameraSelectionElement extends Components.CameraSelection, HTMLStencilElement {
    }
    var HTMLCameraSelectionElement: {
        prototype: HTMLCameraSelectionElement;
        new (): HTMLCameraSelectionElement;
    };
    interface HTMLGestureDetectorElement extends Components.GestureDetector, HTMLStencilElement {
    }
    var HTMLGestureDetectorElement: {
        prototype: HTMLGestureDetectorElement;
        new (): HTMLGestureDetectorElement;
    };
    interface HTMLScreenSelectionElement extends Components.ScreenSelection, HTMLStencilElement {
    }
    var HTMLScreenSelectionElement: {
        prototype: HTMLScreenSelectionElement;
        new (): HTMLScreenSelectionElement;
    };
    interface HTMLSettingsComponentElement extends Components.SettingsComponent, HTMLStencilElement {
    }
    var HTMLSettingsComponentElement: {
        prototype: HTMLSettingsComponentElement;
        new (): HTMLSettingsComponentElement;
    };
    interface HTMLElementTagNameMap {
        "camera-selection": HTMLCameraSelectionElement;
        "gesture-detector": HTMLGestureDetectorElement;
        "screen-selection": HTMLScreenSelectionElement;
        "settings-component": HTMLSettingsComponentElement;
    }
}
declare namespace LocalJSX {
    interface CameraSelection {
        /**
          * When a camera gets selected from the dropdown, this event emits [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo)
         */
        "onCameraSelected"?: (event: CameraSelectionCustomEvent<MediaDeviceInfo>) => void;
    }
    interface GestureDetector {
        /**
          * The device id of selected camera
         */
        "cameraId"?: string;
    }
    interface ScreenSelection {
        /**
          * When a screen gets selected from the dropdown, this event emits selected screen information
         */
        "onScreenSelected"?: (event: ScreenSelectionCustomEvent<ScreenSettings>) => void;
    }
    interface SettingsComponent {
        /**
          * Re-emits the camera id. This one is only used locally within the browser
         */
        "onCameraChanged"?: (event: SettingsComponentCustomEvent<string>) => void;
        /**
          * Triggers every time when a user updates any of the settings
         */
        "onSettingsChanged"?: (event: SettingsComponentCustomEvent<Settings>) => void;
    }
    interface IntrinsicElements {
        "camera-selection": CameraSelection;
        "gesture-detector": GestureDetector;
        "screen-selection": ScreenSelection;
        "settings-component": SettingsComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "camera-selection": LocalJSX.CameraSelection & JSXBase.HTMLAttributes<HTMLCameraSelectionElement>;
            "gesture-detector": LocalJSX.GestureDetector & JSXBase.HTMLAttributes<HTMLGestureDetectorElement>;
            "screen-selection": LocalJSX.ScreenSelection & JSXBase.HTMLAttributes<HTMLScreenSelectionElement>;
            "settings-component": LocalJSX.SettingsComponent & JSXBase.HTMLAttributes<HTMLSettingsComponentElement>;
        }
    }
}
