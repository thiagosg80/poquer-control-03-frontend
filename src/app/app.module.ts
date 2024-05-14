import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared-modules/material.module';
import { TimerComponent } from './components/timer/timer.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { PeriodsComponent } from './components/periods/periods.component';
import { MontanteComponent } from './components/montante/montante.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ButtonsComponent,
    PeriodsComponent,
    MontanteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
