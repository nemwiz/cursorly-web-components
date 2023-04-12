import {Component, h, Prop} from '@stencil/core';

@Component({
  tag: 'cursorly-spinner',
  styles: `.spinner-size-override:after {
  height: 3rem !important;
  width: 3rem !important;
}`,
  shadow: false,
})
export class CursorlySpinner {

  /**
   * Size of the spinner. Only values supported are 'regular' or 'large'
   */
  @Prop()
  size: string = 'regular'

  render() {
    return (
      <div class={`animated loading hide-text ${this.size === 'large' ? 'spinner-size-override': ''}`}><p>Hidden</p></div>
    );
  }

}
