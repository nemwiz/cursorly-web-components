import {Component, Event, EventEmitter, h, Host, Prop, State} from '@stencil/core';
import {Screen, ScreenSettings} from '../../model/screen';

@Component({
  tag: 'screen-selection',
  shadow: false,
})
export class ScreenSelection {

  /**
   * When a screen gets selected from the dropdown, this event emits selected screen information
   */
  @Event({eventName: 'screenSelected'})
  screenSelected: EventEmitter<ScreenSettings>;

  /**
   * JSON.stringify() array of screens
   */
  @Prop()
  screens: string = '';

  selectedScreen: Screen;
  screensInfo: Screen[] = [];

  @State()
  isMultiDisplay: boolean = false;

  componentWillRender() {
    this.screensInfo = JSON.parse(this.screens);
  }

  componentDidLoad() {
    this.selectedScreen = this.screensInfo[0];
    this.emitChanges();
  }

  emitChanges() {
    this.screenSelected.emit({isSingleScreen: !this.isMultiDisplay, screen: this.selectedScreen});
  }

  render() {
    return (
      <Host>
        {this.screensInfo.length >= 2 ?
          <div>
            <div class="form-ext-control no-padding-form-control">
              <label class="form-ext-toggle__label">
                <span>Multi-display</span>
                <div class="form-ext-toggle form-ext-toggle--dark">
                  <input type="checkbox" class="form-ext-input"
                         checked={this.isMultiDisplay}
                         onChange={() => {
                           this.isMultiDisplay = !this.isMultiDisplay;
                           this.emitChanges();
                         }}/>
                  <div class="form-ext-toggle__toggler"><i></i></div>
                </div>
              </label>
            </div>

            <div class="input-control mt-2">
              <label>Display name</label>
              <select class="select" disabled={this.isMultiDisplay} onChange={(event: Event) => {
                const selectedScreen = this.screensInfo.find(s => s.screenId === parseInt((event.target as HTMLSelectElement).value));
                this.selectedScreen = selectedScreen;
                this.emitChanges();
              }}>
                {this.screensInfo.map(screen =>
                  <option value={screen.screenId}>
                    {screen.name} Hello
                  </option>
                )}
              </select>
            </div>
          </div>
          : null
        }
      </Host>
    );
  }

}
