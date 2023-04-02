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

  screensInfo: Screen[] = [];

  @State()
  isSingleScreen: boolean = false;

  componentWillRender() {
    this.screensInfo = JSON.parse(this.screens);
  }

  async componentDidLoad() {
    this.screenSelected.emit({isSingleScreen: this.isSingleScreen, screen: this.screensInfo[0]});
  }

  render() {
    return (
      <Host>

        <div class="form-ext-control no-padding-form-control u-relative">
        <span class="icon subtitle mb-0 tooltip u-absolute"
              data-tooltip="When turned on, you have to move your hand more."
              style={{top: '0'}}>
              <i class="fas fa-wrapper fa-info-circle"></i>
            </span>
          <label class="form-ext-toggle__label">
            <span class="pl-3">Multi-display</span>
            <div class="form-ext-toggle form-ext-toggle--dark">
              <input type="checkbox" class="form-ext-input"
                     checked={this.isSingleScreen}
                     onChange={() => this.isSingleScreen = !this.isSingleScreen}/>
              <div class="form-ext-toggle__toggler"><i></i></div>
            </div>
          </label>
        </div>

        <div class="input-control mt-2">
          <label>Display name</label>
          <select class="select" disabled={this.isSingleScreen} onChange={(event: Event) => {
            const selectedScreen = this.screensInfo.find(s => s.screenId === parseInt((event.target as HTMLSelectElement).value));
            this.screenSelected.emit({isSingleScreen: this.isSingleScreen, screen: selectedScreen});
          }}>
            {this.screensInfo.map(screen =>
              <option value={screen.screenId}>
                {screen.name}
              </option>
            )}
          </select>
        </div>

      </Host>
    );
  }

}
