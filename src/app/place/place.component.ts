import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-place',
  imports: [],
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss',
})
export class PlaceComponent {
  @Input()
  numero: string = '';
}
