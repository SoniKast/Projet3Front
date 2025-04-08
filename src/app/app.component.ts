import { Component, inject } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ConnexionService } from './connexion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  connexionService = inject(ConnexionService);
  utilisateurConnecte: Utilisateur | null = null;
  router = inject(Router);

  ngOnInit() {
    this.connexionService.utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur)
    );
  }

  logOut() {
    localStorage.removeItem('jwt');
    this.connexionService.utilisateurConnecte.next(null);
    this.router.navigateByUrl('/connexion');
  }
}
