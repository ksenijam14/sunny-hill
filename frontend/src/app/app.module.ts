import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule } from '@angular/common/http';
//import {FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';

import { GrafikonComponent } from './grafikon/grafikon.component';
import { HomeComponent } from './home/home.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { DialogRegisterComponent } from './dialog-register/dialog-register.component';
import { RegPravnaLicaComponent } from './reg-pravna-lica/reg-pravna-lica.component';
import { FirmaComponent } from './firma/firma.component';
import { KlijentComponent } from './klijent/klijent.component';
import { SmestajComponent } from './smestaj/smestaj.component';
import { SkiSkolaComponent } from './ski-skola/ski-skola.component';
import { PlaninariComponent } from './planinari/planinari.component';
import { NovaTuraComponent } from './nova-tura/nova-tura.component';
import { PregledTuraComponent } from './pregled-tura/pregled-tura.component';
import { DetaljiTureComponent } from './detalji-ture/detalji-ture.component';
import { PonudaSkiSkolaComponent } from './ponuda-ski-skola/ponuda-ski-skola.component';
import { RezSkiComponent } from './rez-ski/rez-ski.component';
import { NoveRezervacijeComponent } from './nove-rezervacije/nove-rezervacije.component';
import { OdobreneRezComponent } from './odobrene-rez/odobrene-rez.component';
import { OdbijeneRezComponent } from './odbijene-rez/odbijene-rez.component';
import { DialogNotifyComponent } from './dialog-notify/dialog-notify.component';
import { PonudaSvihTuraComponent } from './ponuda-svih-tura/ponuda-svih-tura.component';
import { RezTuraComponent } from './rez-tura/rez-tura.component';
import { PonudaSmestajaComponent } from './ponuda-smestaja/ponuda-smestaja.component';
import { RezSmestajComponent } from './rez-smestaj/rez-smestaj.component';
import { ValidnaFormaDirective } from './validna-forma.directive';
import { MeniFirmeComponent } from './meni-firme/meni-firme.component';
import { MeniClassicComponent } from './meni-classic/meni-classic.component';
import { MeniFirmaRegComponent } from './meni-firma-reg/meni-firma-reg.component';
import { MeniKlijentComponent } from './meni-klijent/meni-klijent.component';
import { RezPoslKComponent } from './rez-posl-k/rez-posl-k.component';
import { RezPotKComponent } from './rez-pot-k/rez-pot-k.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { MeniAdminComponent } from './meni-admin/meni-admin.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminComponent } from './admin/admin.component';
import { AdminZahteviComponent } from './admin-zahtevi/admin-zahtevi.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { AdminPregledComponent } from './admin-pregled/admin-pregled.component';

@NgModule({
  declarations: [
    AppComponent,
    GrafikonComponent,
    HomeComponent,
    DialogLoginComponent,
    DialogRegisterComponent,
    RegPravnaLicaComponent,
    FirmaComponent,
    KlijentComponent,
    SmestajComponent,
    SkiSkolaComponent,
    PlaninariComponent,
    NovaTuraComponent,
    PregledTuraComponent,
    DetaljiTureComponent,
    PonudaSkiSkolaComponent,
    RezSkiComponent,
    NoveRezervacijeComponent,
    OdobreneRezComponent,
    OdbijeneRezComponent,
    DialogNotifyComponent,
    PonudaSvihTuraComponent,
    RezTuraComponent,
    PonudaSmestajaComponent,
    RezSmestajComponent,
    ValidnaFormaDirective,
    MeniFirmeComponent,
    MeniClassicComponent,
    MeniFirmaRegComponent,
    MeniKlijentComponent,
    RezPoslKComponent,
    RezPotKComponent,
    ChangePassComponent,
    MeniAdminComponent,
    AdminPageComponent,
    AdminComponent,
    AdminZahteviComponent,
    PretragaComponent,
    AdminPregledComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule ,
    //FlexLayoutModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
