import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservation-place',
  imports: [],
  templateUrl: './reservation-place.component.html',
  styleUrl: './reservation-place.component.scss',
})
export class ReservationPlaceComponent {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  router = inject(Router);
  notification = inject(MatSnackBar);

  place?: Place = undefined;

  ngOnInit() {
    this.route.params.subscribe((parametres) => {
      const idPlace = parametres['id'];

      this.http
        .get<Place>('http://localhost:8080/place/' + idPlace)
        .subscribe((place) => (this.place = place));
    });
  }

  onReservationPlace() {
    const reservation = { place: { id: this.place?.id } };

    this.http
      .post('http://localhost:8080/reservation-place-journee', reservation)
      .subscribe((resultat) => {
        this.notification.open('Votre réservation a bien été effectuée', '', {
          duration: 5000,
          panelClass: 'notification-ok',
          verticalPosition: 'top',
        });
        this.router.navigateByUrl('/accueil');
      });
  }
}
