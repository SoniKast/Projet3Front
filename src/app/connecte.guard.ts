import { CanActivateFn, Router } from '@angular/router';
import { ConnexionService } from './connexion.service';
import { inject } from '@angular/core';

export const connecteGuard: CanActivateFn = (route, state) => {
  const connexionService = inject(ConnexionService);

  if (connexionService.utilisateurConnecte.value != null) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/connexion');
};
