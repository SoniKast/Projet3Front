import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  constructor() {
    this.extractUtilisateurFromJwt();
  }

  http = inject(HttpClient);
  utilisateurConnecte = new BehaviorSubject<Utilisateur | null>(null);

  public inscription(utilisateur: any): Observable<string> {
    return this.http.post('http://localhost:8080/inscription', utilisateur, {
      responseType: 'text',
    });
  }

  public connexion(utilisateur: any): Observable<string> {
    return this.http
      .post('http://localhost:8080/connexion', utilisateur, {
        responseType: 'text',
      })
      .pipe(
        tap((jwt) => {
          localStorage.setItem('jwt', jwt);
          this.extractUtilisateurFromJwt();
        })
      );
  }

  public extractUtilisateurFromJwt() {
    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      const partiesJwt = jwt.split('.');
      const bodyBase64 = partiesJwt[1];
      const bodyJson = atob(bodyBase64);
      const body = JSON.parse(bodyJson);

      this.utilisateurConnecte.next({
        id: body.id,
        email: body.sub,
        role: body.role,
      });
    }
  }
}
