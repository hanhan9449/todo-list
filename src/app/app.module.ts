import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ListItemComponent,
    ListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
