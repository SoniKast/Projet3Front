import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionService } from './connexion.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  connexionService = inject(ConnexionService);
  utilisateurConnecte: Utilisateur | null = null;

  ngOnInit() {
    this.connexionService.utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur)
    );
  }
}
