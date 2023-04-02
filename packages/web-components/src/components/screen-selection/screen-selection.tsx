import {Component, Event, EventEmitter, h, Host, State} from '@stencil/core';
import {Screen, ScreenSettings} from '../../model/screen';
import {get} from '../../service/http.service';

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

  @State()
  screens: Screen[] = [];

  @State()
  isSingleScreen: boolean = false;

  async componentDidLoad() {
    // TODO - parametrize url, refactor this to prop and move it to the parent component
    this.screens = await get<Screen[]>('http://localhost:39459/settings/screens');
    this.screenSelected.emit({isSingleScreen: this.isSingleScreen, screen: this.screens[0]});
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
            const selectedScreen = this.screens.find(s => s.screenId === parseInt((event.target as HTMLSelectElement).value));
            this.screenSelected.emit({isSingleScreen: this.isSingleScreen, screen: selectedScreen});
          }}>
            {this.screens.map(screen =>
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
