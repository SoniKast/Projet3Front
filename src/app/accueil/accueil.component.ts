import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceComponent } from '../place/place.component';
import { ConnexionService } from '../connexion.service';

@Component({
  selector: 'app-accueil',
  imports: [PlaceComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
})
export class AccueilComponent {
  http = inject(HttpClient);
  router = inject(Router);
  listePlace: Place[] = [];
  connexionService = inject(ConnexionService);
  utilisateurConnecte: Utilisateur | null = null;

  ngOnInit() {
    this.connexionService.utilisateurConnecte.subscribe((utilisateur) => {
      this.utilisateurConnecte = utilisateur;
    });

    this.http
      .get<Place[]>('http://localhost:8080/places')
      .subscribe((listePlace) => (this.listePlace = listePlace));
  }

  onClickPlace(place: Place) {
    this.router.navigateByUrl('/reservation-place/' + place.id);
  }
}
