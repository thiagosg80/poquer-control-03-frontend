import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared-modules/material.module';
import { TimerComponent } from './components/timer/timer.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { PeriodsComponent } from './components/periods/periods.component';
import { MontanteComponent } from './components/montante/montante.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { AwardComponent } from './components/award/award.component';
import { FightComponent } from './components/fight/fight.component';
registerLocaleData(ptBr);

@NgModule({ declarations: [
        AppComponent,
        TimerComponent,
        ButtonsComponent,
        PeriodsComponent,
        MontanteComponent,
        AwardComponent,
        FightComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        MaterialModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
