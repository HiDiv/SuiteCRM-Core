import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ExtensionModule } from '../extension.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, ExtensionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
