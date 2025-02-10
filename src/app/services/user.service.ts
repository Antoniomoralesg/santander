import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private people: Person[] = [
    { code: '001', name: 'Juan Pérez', document: '12345678A', clientType: 'Normal', personType: 'F', documentType: 'DNI' },
    { code: '002', name: 'Empresa S.A.', document: 'B12345678', clientType: 'Empresa', personType: 'J', documentType: 'CIF' },
    { code: '003', name: 'Ana Gómez', document: '87654321Z', clientType: 'VIP', personType: 'F', documentType: 'NIE' },
    { code: '004', name: 'Carlos López', document: '23456789B', clientType: 'Normal', personType: 'F', documentType: 'DNI' },
    { code: '005', name: 'Tech Solutions', document: 'C23456789', clientType: 'Empresa', personType: 'J', documentType: 'CIF' },
    { code: '006', name: 'María Fernández', document: '34567890C', clientType: 'VIP', personType: 'F', documentType: 'DNI' },
  ];

  constructor(private http: HttpClient) {}

  getPeople(): Person[] {
    return this.people;
  }

  searchEmployees(personType: string, searchCriteria: string, searchQuery: string, documentType?: string): Person[] {
    return this.people.filter(person => {
      if (person.personType !== personType) return false;

      if (searchCriteria === 'DOCUMENTO') {
        return person.document.includes(searchQuery) && (!documentType || person.documentType === documentType);
      } else if (searchCriteria === 'NOMBRE') {
        return person.name.toLowerCase().includes(searchQuery.toLowerCase());
      }

      return false;
    });
  }

  getUserProfile(uid: string): Observable<any> {
    // Simulación de una llamada HTTP para obtener el perfil del usuario
    return this.http.get<any>(`/api/userProfile/${uid}`);
  }
}