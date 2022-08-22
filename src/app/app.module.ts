import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TestUntilDestroyDirective } from './directive/test-until-destroy.directive';

@NgModule({
  declarations: [
    AppComponent,
    TestUntilDestroyDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
