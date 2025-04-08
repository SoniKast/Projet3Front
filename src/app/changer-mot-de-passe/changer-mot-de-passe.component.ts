import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordService } from '../password.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-changer-mot-de-passe',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrl: './changer-mot-de-passe.component.scss',
})
export class ChangerMotDePasseComponent {
  token: string = '';
  password: string = '';
  confirmPassword: string = '';
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  notification = inject(MatSnackBar);

  constructor(
    private passwordService: PasswordService,
    private router: Router
  ) {}

  // Initialize the form group with validation
  formulaire = this.formBuilder.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordsMatchValidator }
  );

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  // Custom Validator to check if the passwords match
  passwordsMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { passwordsNotMatch: true };
  }

  onSubmit() {
    if (this.formulaire.valid) {
      const newPassword = this.formulaire.get('newPassword')?.value;

      // Call the resetPassword method from the PasswordService
      this.passwordService.resetPassword(this.token, newPassword).subscribe(
        (response) => {
          this.notification.open('Mot de passe modifié avec succès', '', {
            duration: 5000,
            verticalPosition: 'top',
          });
          // Redirect to login page after successful password reset
          this.router.navigateByUrl('/connexion');
        },
        (error) => {
          console.error(error);
          // Handle error, for example show an error message
        }
      );
    }
  }
}
