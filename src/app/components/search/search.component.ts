import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { ResultsComponent } from '../results/results.component';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [FormsModule, ResultsComponent, CommonModule],
})
export class SearchComponent {
  results: Person[] = [];
  personType: string = 'F';
  searchCriteria: string = 'DOCUMENTO';
  documentType: string = 'DNI';
  searchQuery: string = '';
  showAlert: boolean = false;

  constructor(private userService: UserService) {}

  onSearch() {
    if (this.searchQuery.trim() === '') {
      alert('Por favor, ingresa un término de búsqueda');
      return;
    }
  
    this.userService.searchEmployees(this.personType, this.searchCriteria, this.searchQuery, this.documentType).subscribe(
      data => {
        this.results = data.filter((person: Person) => {
          // Filtrar por tipo de persona
          if (person.personType !== this.personType) return false;
  
          // Filtrar por criterio de búsqueda
          if (this.searchCriteria === 'DOCUMENTO') {
            return person.document.includes(this.searchQuery) && person.documentType === this.documentType;
          } else if (this.searchCriteria === 'NOMBRE') {
            return person.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          }
  
          return false;
        });
  
        this.showAlert = this.results.length === 0;
  
        console.log('Resultados filtrados:', this.results);
      },
      error => {
        console.error('Error al buscar empleados:', error);
        alert('Ocurrió un error al realizar la búsqueda. Por favor, intenta nuevamente.');
      }
    );
  }
}