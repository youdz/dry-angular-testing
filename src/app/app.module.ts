import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GreetComponent } from './greet/greet.component';
import { NameFormComponent } from './name-form/name-form.component';

@NgModule({
  declarations: [
    AppComponent,
    GreetComponent,
    NameFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
