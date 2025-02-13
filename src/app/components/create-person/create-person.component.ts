import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Person } from '../../models/person.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  imports: [FormsModule],
  
})
export class CreatePersonComponent {
  newPerson: Person = {
    code: '',
    name: '',
    document: '',
    documentType: '',
    personType: '',
    clientType: ''
  };

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService.createPerson(this.newPerson).subscribe(
      response => {
        console.log('Persona creada:', response);
        alert('Persona creada exitosamente');
        this.resetForm();
      },
      error => {
        console.error('Error al crear persona:', error);
        alert('Ocurrió un error al crear la persona. Por favor, intenta nuevamente.');
      }
    );
  }

  resetForm() {
    this.newPerson = {
      code: '',
      name: '',
      document: '',
      documentType: '',
      personType: '',
      clientType: ''
    };
  }
}