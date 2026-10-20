import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar implements OnInit {
  faMagnifyingGlass=faMagnifyingGlass

  @Input() autos: Auto[] = []
  @Output() onSelectCar = new EventEmitter<Auto>()
  selectedAutos: Auto[] = []
  searchText = ''

  //au démarrage, afficher toutes les autos
  ngOnInit() {
    this.selectedAutos = this.autos
  }

  selectAutos(selectedBrand: string) {
    this.searchText = selectedBrand
    if (selectedBrand) {
      this.selectedAutos = this.autos.filter(
        x => x.brand.toLowerCase().startsWith(selectedBrand.toLowerCase()))
    }
    else
      this.selectedAutos=this.autos
  }
  selectCar(auto: Auto) {
    this.onSelectCar.emit(auto)
  }
  viewDetails(auto: Auto) {
    alert(`${auto.brand} ${auto.model}\n\n${auto.description}`)
  }
}
