/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SettingsComponent {
    }
}
declare global {
    interface HTMLSettingsComponentElement extends Components.SettingsComponent, HTMLStencilElement {
    }
    var HTMLSettingsComponentElement: {
        prototype: HTMLSettingsComponentElement;
        new (): HTMLSettingsComponentElement;
    };
    interface HTMLElementTagNameMap {
        "settings-component": HTMLSettingsComponentElement;
    }
}
declare namespace LocalJSX {
    interface SettingsComponent {
    }
    interface IntrinsicElements {
        "settings-component": SettingsComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "settings-component": LocalJSX.SettingsComponent & JSXBase.HTMLAttributes<HTMLSettingsComponentElement>;
        }
    }
}
