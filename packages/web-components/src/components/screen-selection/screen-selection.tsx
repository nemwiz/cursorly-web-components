import {Component, Event, EventEmitter, h, State} from '@stencil/core';
import {Screen} from '../../model/screen';
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
  screenSelected: EventEmitter<Screen>;

  @State()
  screens: Screen[] = [];

  async componentDidLoad() {
    // TODO - parametrize url
    this.screens = await get<Screen[]>('http://localhost:39459/settings/screens');
    this.screenSelected.emit(this.screens[0]);
  }

  render() {
    return (
      <div class="input-control">
        <label>Screen</label>
        <select class="select" onChange={(event: Event) => {
          const selectedScreen = this.screens.find(s => s.screenId === parseInt((event.target as HTMLSelectElement).value));
          this.screenSelected.emit(selectedScreen);
        }}>
          {this.screens.map(screen =>
            <option value={screen.screenId}>
              {screen.name}
            </option>
          )}
        </select>
      </div>
    );
  }

}
