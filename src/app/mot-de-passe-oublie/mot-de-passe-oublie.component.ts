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
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-mot-de-passe-oublie',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './mot-de-passe-oublie.component.html',
  styleUrl: './mot-de-passe-oublie.component.scss',
})
export class MotDePasseOublieComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  notification = inject(MatSnackBar);

  constructor(private passwordService: PasswordService) {}

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  envoiMail() {
    if (this.formulaire.valid) {
      const compteEmail: string = this.formulaire.value.email ?? '';

      console.log(compteEmail);

      this.passwordService.requestPasswordReset(compteEmail).subscribe(
        () => {
          this.notification.open(
            'Un lien de réinitialisation a été envoyé à votre adresse email.',
            '',
            {
              duration: 5000,
              verticalPosition: 'top',
            }
          );
          this.router.navigateByUrl('/connexion');
        },
        (error) => {
          console.error(error);
          this.notification.open(
            "Une erreur est survenue. Vérifiez l'email et réessayez.",
            '',
            {
              duration: 5000,
              verticalPosition: 'top',
            }
          );
        }
      );
    } else {
      this.formulaire.markAllAsTouched();
    }
  }
}
