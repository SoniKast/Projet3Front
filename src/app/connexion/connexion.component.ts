import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConnexionService } from '../connexion.service';

@Component({
  selector: 'app-connexion',
  imports: [MatButtonModule, ReactiveFormsModule, FormsModule, MatInputModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent {
  connexionService = inject(ConnexionService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  notification = inject(MatSnackBar);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onConnexion() {
    if (this.formulaire.valid) {
      const utilisateur = this.formulaire.value;

      this.connexionService.connexion(utilisateur).subscribe((jwt) => {
        this.notification.open('Vous êtes connecté', '', {
          duration: 5000,
          verticalPosition: 'top',
        });
        this.router.navigateByUrl('/accueil');
      });
    }
  }
}
