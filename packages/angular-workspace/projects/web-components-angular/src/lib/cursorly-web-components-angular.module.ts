import {APP_INITIALIZER, NgModule} from '@angular/core';
import {DIRECTIVES} from './stencil-generated';
import {defineCustomElements} from '@cursorly/web-components/loader';

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  // providers: [
  //   {
  //     provide: APP_INITIALIZER,
  //     useFactory: () => {
  //       return defineCustomElements();
  //     }
  //   }
  // ]
})
export class CursorlyWebComponentsAngularModule {
}
