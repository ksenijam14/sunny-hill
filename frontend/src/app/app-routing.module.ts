import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminPregledComponent } from './admin-pregled/admin-pregled.component';
import { AdminZahteviComponent } from './admin-zahtevi/admin-zahtevi.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { DetaljiTureComponent } from './detalji-ture/detalji-ture.component';
import { FirmaComponent } from './firma/firma.component';
import { GrafikonComponent } from './grafikon/grafikon.component';
import { HomeComponent } from './home/home.component';
import { KlijentComponent } from './klijent/klijent.component';
import { NovaTuraComponent } from './nova-tura/nova-tura.component';
import { NoveRezervacijeComponent } from './nove-rezervacije/nove-rezervacije.component';
import { OdbijeneRezComponent } from './odbijene-rez/odbijene-rez.component';
import { OdobreneRezComponent } from './odobrene-rez/odobrene-rez.component';
import { PlaninariComponent } from './planinari/planinari.component';
import { PonudaSkiSkolaComponent } from './ponuda-ski-skola/ponuda-ski-skola.component';
import { PonudaSmestajaComponent } from './ponuda-smestaja/ponuda-smestaja.component';
import { PonudaSvihTuraComponent } from './ponuda-svih-tura/ponuda-svih-tura.component';
import { PregledTuraComponent } from './pregled-tura/pregled-tura.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { RegPravnaLicaComponent } from './reg-pravna-lica/reg-pravna-lica.component';
import { RezPoslKComponent } from './rez-posl-k/rez-posl-k.component';
import { RezPotKComponent } from './rez-pot-k/rez-pot-k.component';
import { RezSkiComponent } from './rez-ski/rez-ski.component';
import { RezSmestajComponent } from './rez-smestaj/rez-smestaj.component';
import { RezTuraComponent } from './rez-tura/rez-tura.component';
import { SkiSkolaComponent } from './ski-skola/ski-skola.component';
import { SmestajComponent } from './smestaj/smestaj.component';

const routes: Routes = [
  {path:'', component:HomeComponent},

  {path:'pretraga', component: PretragaComponent},

  {path: 'ski_skole', component:PonudaSkiSkolaComponent},
  {path: 'ski_skole/rez_ski', component:RezSkiComponent},

  {path: 'planinarske_ture', component: PonudaSvihTuraComponent},
  {path: 'planinarske_ture/rez_ture', component: RezTuraComponent},

  {path: 'smestaj', component: PonudaSmestajaComponent},
  {path: 'smestaj/rez_smestaj', component: RezSmestajComponent},
  
  //klijent
  {path: 'klijent', component:KlijentComponent},
  {path: 'klijent/poslate_rez', component:RezPoslKComponent},
  {path: 'klijent/potvrdjene_rez', component:RezPotKComponent},
  {path: 'klijent/detalji-ture', component:RezTuraComponent},

  //admin
  {path:'admin', component: AdminComponent},
  {path:'admin/admin-page', component: AdminPageComponent},
  {path:'admin/admin-page/zahtevi', component: AdminZahteviComponent},
  {path:'admin/admin-page/pregled-komentara', component: AdminPregledComponent},

  //firme uopsteno
  {path:'firma_reg', component:RegPravnaLicaComponent},
  {path:'firme', component:FirmaComponent},
  
  //planinari
  {path:'firme/planinari', component:PlaninariComponent},
  {path:'firme/planinari/nova_tura', component:NovaTuraComponent},
  {path:'firme/planinari/pregled_tura', component:PregledTuraComponent},
  {path:'firme/planinari/tura', component:DetaljiTureComponent},
  {path:'firme/planinari/nove_rezervacije', component:NoveRezervacijeComponent},
  {path:'firme/planinari/odobrene_rezervacije', component:OdobreneRezComponent},
  {path:'firme/planinari/odbijene_rezervacije', component:OdbijeneRezComponent},

  //ski_skole
  {path:'firme/ski_skola', component:SkiSkolaComponent},
  {path:'firme/ski_skola/nove_rezervacije', component:NoveRezervacijeComponent},
  {path:'firme/ski_skola/odobrene_rezervacije', component:OdobreneRezComponent},
  {path:'firme/ski_skola/odbijene_rezervacije', component:OdbijeneRezComponent},

  //smestaj
  {path:'firme/smestaj', component:SmestajComponent},
  {path:'firme/smestaj/nove_rezervacije', component:NoveRezervacijeComponent},
  {path:'firme/smestaj/odobrene_rezervacije', component:OdobreneRezComponent},
  {path:'firme/smestaj/odbijene_rezervacije', component:OdbijeneRezComponent},

  //promena lozinke
  {path: 'promena-lozinke', component:ChangePassComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
