import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { Page404Component } from './page404/page404.component';
import { ReservationPlaceComponent } from './reservation-place/reservation-place.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { InscriptionMailComponent } from './inscription-mail/inscription-mail.component';
import { MotDePasseOublieComponent } from './mot-de-passe-oublie/mot-de-passe-oublie.component';
import { ChangerMotDePasseComponent } from './changer-mot-de-passe/changer-mot-de-passe.component';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'inscription-mail', component: InscriptionMailComponent },
  { path: 'mdp-oublie', component: MotDePasseOublieComponent },
  { path: 'changer-mdp', component: ChangerMotDePasseComponent },
  { path: 'reservation-place/:id', component: ReservationPlaceComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];
