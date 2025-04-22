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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscription-mail',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './inscription-mail.component.html',
  styleUrl: './inscription-mail.component.scss',
})
export class InscriptionMailComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  notification = inject(MatSnackBar);
  http = inject(HttpClient);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  envoiMail() {
    if (this.formulaire.valid) {
      const compteEmail: string = this.formulaire.value.email ?? '';

      console.log(compteEmail);

      this.http
        .post('http://localhost:8080/inscription-mail', compteEmail, {
          headers: { 'Content-Type': 'text/plain' },
        })
        .subscribe({
          next: () => {
            this.notification.open(
              'Un email de confirmation a été envoyé.',
              '',
              {
                duration: 5000,
                verticalPosition: 'top',
              }
            );
            this.router.navigateByUrl('/connexion');
          },
          error: (err) => {
            console.error(err);
            this.notification.open(
              'Erreur : Email déjà utilisé ou serveur indisponible.',
              '',
              { duration: 5000, verticalPosition: 'top' }
            );
          },
        });
    } else {
      this.formulaire.markAllAsTouched();
    }
  }
}
