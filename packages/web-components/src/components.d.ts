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
    interface CameraPermission {
    }
    interface CameraPermissionDenied {
    }
    interface CameraPermissionInfo {
        /**
          * Hides the continue button on Firefox because Permission API for camera is not supported
         */
        "isFirefox": boolean;
    }
    interface CameraPermissionPrompt {
    }
    interface CameraSelection {
    }
    interface CursorlySpinner {
        /**
          * Size of the spinner. Only values supported are 'regular' or 'large'
         */
        "size": string;
    }
    interface GestureDetector {
        /**
          * The device id of selected camera
         */
        "cameraId": string;
        /**
          * The url where websocket server is running. It should be in format host:port e.g. localhost:1234
         */
        "websocketUrl": string;
    }
    interface ScreenSelection {
        /**
          * JSON.stringify() array of screens
         */
        "screens": string;
    }
    interface SettingsComponent {
        /**
          * JSON.stringify() array of screens
         */
        "screens": string;
    }
}
export interface CameraPermissionCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCameraPermissionElement;
}
export interface CameraPermissionInfoCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCameraPermissionInfoElement;
}
export interface CameraPermissionPromptCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCameraPermissionPromptElement;
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
    interface HTMLCameraPermissionElement extends Components.CameraPermission, HTMLStencilElement {
    }
    var HTMLCameraPermissionElement: {
        prototype: HTMLCameraPermissionElement;
        new (): HTMLCameraPermissionElement;
    };
    interface HTMLCameraPermissionDeniedElement extends Components.CameraPermissionDenied, HTMLStencilElement {
    }
    var HTMLCameraPermissionDeniedElement: {
        prototype: HTMLCameraPermissionDeniedElement;
        new (): HTMLCameraPermissionDeniedElement;
    };
    interface HTMLCameraPermissionInfoElement extends Components.CameraPermissionInfo, HTMLStencilElement {
    }
    var HTMLCameraPermissionInfoElement: {
        prototype: HTMLCameraPermissionInfoElement;
        new (): HTMLCameraPermissionInfoElement;
    };
    interface HTMLCameraPermissionPromptElement extends Components.CameraPermissionPrompt, HTMLStencilElement {
    }
    var HTMLCameraPermissionPromptElement: {
        prototype: HTMLCameraPermissionPromptElement;
        new (): HTMLCameraPermissionPromptElement;
    };
    interface HTMLCameraSelectionElement extends Components.CameraSelection, HTMLStencilElement {
    }
    var HTMLCameraSelectionElement: {
        prototype: HTMLCameraSelectionElement;
        new (): HTMLCameraSelectionElement;
    };
    interface HTMLCursorlySpinnerElement extends Components.CursorlySpinner, HTMLStencilElement {
    }
    var HTMLCursorlySpinnerElement: {
        prototype: HTMLCursorlySpinnerElement;
        new (): HTMLCursorlySpinnerElement;
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
        "camera-permission": HTMLCameraPermissionElement;
        "camera-permission-denied": HTMLCameraPermissionDeniedElement;
        "camera-permission-info": HTMLCameraPermissionInfoElement;
        "camera-permission-prompt": HTMLCameraPermissionPromptElement;
        "camera-selection": HTMLCameraSelectionElement;
        "cursorly-spinner": HTMLCursorlySpinnerElement;
        "gesture-detector": HTMLGestureDetectorElement;
        "screen-selection": HTMLScreenSelectionElement;
        "settings-component": HTMLSettingsComponentElement;
    }
}
declare namespace LocalJSX {
    interface CameraPermission {
        /**
          * This event notifies parents components that the user granted permission to use the camera
         */
        "onPermissionGranted"?: (event: CameraPermissionCustomEvent<void>) => void;
    }
    interface CameraPermissionDenied {
    }
    interface CameraPermissionInfo {
        /**
          * Hides the continue button on Firefox because Permission API for camera is not supported
         */
        "isFirefox"?: boolean;
        /**
          * Emits the event so that the next screen could be shown
         */
        "onPermissionInfoContinued"?: (event: CameraPermissionInfoCustomEvent<void>) => void;
    }
    interface CameraPermissionPrompt {
        /**
          * This event notifies parents components that the user granted permission to use the camera
         */
        "onCameraPermissionGranted"?: (event: CameraPermissionPromptCustomEvent<boolean>) => void;
    }
    interface CameraSelection {
        /**
          * When a camera gets selected from the dropdown, this event emits [MediaDeviceInfo](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo)
         */
        "onCameraSelected"?: (event: CameraSelectionCustomEvent<MediaDeviceInfo>) => void;
    }
    interface CursorlySpinner {
        /**
          * Size of the spinner. Only values supported are 'regular' or 'large'
         */
        "size"?: string;
    }
    interface GestureDetector {
        /**
          * The device id of selected camera
         */
        "cameraId"?: string;
        /**
          * The url where websocket server is running. It should be in format host:port e.g. localhost:1234
         */
        "websocketUrl"?: string;
    }
    interface ScreenSelection {
        /**
          * When a screen gets selected from the dropdown, this event emits selected screen information
         */
        "onScreenSelected"?: (event: ScreenSelectionCustomEvent<ScreenSettings>) => void;
        /**
          * JSON.stringify() array of screens
         */
        "screens"?: string;
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
        /**
          * JSON.stringify() array of screens
         */
        "screens"?: string;
    }
    interface IntrinsicElements {
        "camera-permission": CameraPermission;
        "camera-permission-denied": CameraPermissionDenied;
        "camera-permission-info": CameraPermissionInfo;
        "camera-permission-prompt": CameraPermissionPrompt;
        "camera-selection": CameraSelection;
        "cursorly-spinner": CursorlySpinner;
        "gesture-detector": GestureDetector;
        "screen-selection": ScreenSelection;
        "settings-component": SettingsComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "camera-permission": LocalJSX.CameraPermission & JSXBase.HTMLAttributes<HTMLCameraPermissionElement>;
            "camera-permission-denied": LocalJSX.CameraPermissionDenied & JSXBase.HTMLAttributes<HTMLCameraPermissionDeniedElement>;
            "camera-permission-info": LocalJSX.CameraPermissionInfo & JSXBase.HTMLAttributes<HTMLCameraPermissionInfoElement>;
            "camera-permission-prompt": LocalJSX.CameraPermissionPrompt & JSXBase.HTMLAttributes<HTMLCameraPermissionPromptElement>;
            "camera-selection": LocalJSX.CameraSelection & JSXBase.HTMLAttributes<HTMLCameraSelectionElement>;
            "cursorly-spinner": LocalJSX.CursorlySpinner & JSXBase.HTMLAttributes<HTMLCursorlySpinnerElement>;
            "gesture-detector": LocalJSX.GestureDetector & JSXBase.HTMLAttributes<HTMLGestureDetectorElement>;
            "screen-selection": LocalJSX.ScreenSelection & JSXBase.HTMLAttributes<HTMLScreenSelectionElement>;
            "settings-component": LocalJSX.SettingsComponent & JSXBase.HTMLAttributes<HTMLSettingsComponentElement>;
        }
    }
}
