import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnexionService } from '../connexion.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent {
  connexionService = inject(ConnexionService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  notification = inject(MatSnackBar);
  exists: any;
  http = inject(HttpClient);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: ['EMPLOYE'],
  });

  onInscription() {
    if (!this.formulaire.valid) return;

    const utilisateur = this.formulaire.value;
    const email = utilisateur.email;

    this.http
      .get<boolean>(`http://localhost:8080/utilisateur/exists?email=${email}`)
      .subscribe({
        next: (exists) => {
          if (exists) {
            this.formulaire.get('email')?.setErrors({ emailExiste: true });
            this.notification.open('Cet email est déjà utilisé.', '', {
              duration: 3000,
              verticalPosition: 'top',
            });
          } else {
            this.connexionService.inscription(utilisateur).subscribe({
              next: () => {
                this.notification.open('Inscription réussie !', '', {
                  duration: 5000,
                  verticalPosition: 'top',
                });
                this.router.navigateByUrl('/connexion');
              },
              error: () => {
                this.notification.open("Erreur lors de l'inscription.", '', {
                  duration: 5000,
                  verticalPosition: 'top',
                });
              },
            });
          }
        },
        error: () => {
          this.notification.open(
            "Erreur lors de la vérification de l'email.",
            '',
            {
              duration: 5000,
              verticalPosition: 'top',
            }
          );
        },
      });
  }
}
