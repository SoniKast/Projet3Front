import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  notification = inject(MatSnackBar);
  exists: any;
  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  formulaire = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: ['EMPLOYE'],
  });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];

      if (token) {
        this.http
          .post('http://localhost:8080/valider-inscription', token, {
            headers: { 'Content-Type': 'text/plain' },
          })
          .subscribe({
            next: () => {
              this.notification.open('Inscription confirmée avec succès.', '', {
                duration: 4000,
                verticalPosition: 'top',
              });
              this.router.navigateByUrl('/connexion');
            },
            error: () => {
              this.notification.open('Lien invalide ou expiré.', '', {
                duration: 4000,
                verticalPosition: 'top',
              });
            },
          });
      } else {
        this.notification.open('Aucun token fourni.', '', {
          duration: 4000,
          verticalPosition: 'top',
        });
      }
    });
  }
}
