import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-car-details',
  styleUrl: './car-details.css',
  templateUrl: './car-details.html',
})
export class CarDetails {
  faArrowLeftLong=faArrowLeftLong

  @Input() car: Auto | null = null //voiture reçue du composant parent (App)
  @Output() onClose = new EventEmitter<void>() //prévient App qu'on ferme la fiche

  //nom géant de la page de détails : réduit pour les noms longs
  giantSize(model: string) {
    return `min(24vw, ${Math.round(170 / model.length)}vw, 40vh)`
  }
  //logo de la marque : "Land Rover" -> images/logos/land-rover.svg
  logo(brand: string) {
    return `images/logos/${brand.toLowerCase().replaceAll(' ', '-')}.svg`
  }
  close() {
    this.onClose.emit()
  }
}
