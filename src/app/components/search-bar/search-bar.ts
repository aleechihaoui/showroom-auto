import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightLong, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar implements OnInit {
  faMagnifyingGlass=faMagnifyingGlass
  faArrowRight=faArrowRightLong

  @Input() autos: Auto[] = []
  @Output() onSelectCar = new EventEmitter<Auto>()
  selectedAutos: Auto[] = []
  searchText = ''
  sortOrder: 'asc' | 'desc' | '' = '' //tri par prix choisi ('' = ordre d'origine)

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
    this.sortAutos()
  }

  //clic sur "Price ↑" ou "Price ↓" (un 2e clic sur le même bouton annule le tri)
  sortByPrice(order: 'asc' | 'desc') {
    this.sortOrder = this.sortOrder === order ? '' : order
    this.selectAutos(this.searchText)
  }

  private sortAutos() {
    if (this.sortOrder === 'asc')
      this.selectedAutos = [...this.selectedAutos].sort((a, b) => a.price - b.price)
    else if (this.sortOrder === 'desc')
      this.selectedAutos = [...this.selectedAutos].sort((a, b) => b.price - a.price)
  }
  //taille du nom géant derrière la photo : plus le nom est long, plus il est petit
  giantSize(model: string) {
    return `${Math.min(110, Math.round(520 / model.length))}px`
  }
  selectCar(auto: Auto) {
    this.onSelectCar.emit(auto)
  }
  viewDetails(auto: Auto) {
    alert(`${auto.brand} ${auto.model}\n\n${auto.description}`)
  }
}
