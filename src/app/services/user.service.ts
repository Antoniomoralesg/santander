import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Person } from '../models/person.model';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  searchEmployees(
    personType: string,
    searchCriteria: string,
    searchQuery: string,
    documentType?: string
  ): Observable<Person[]> {
    return this.getPeople();
  }

  getUserProfile(uid: string): Observable<any> {
    return of({
      attributes: {
        fullName: 'Juan Pérez',
        mail: 'juan.perez@example.com',
      },
    });
  }

  getPeople(): Observable<Person[]> {
    const people: Person[] = [
      { code: '001', name: 'Juan Pérez', document: '12345678A', clientType: 'Normal', personType: 'F', documentType: 'DNI' },
      { code: '002', name: 'Empresa S.A.', document: 'B12345678', clientType: 'Empresa', personType: 'J', documentType: 'CIF' },
      { code: '003', name: 'Ana Gómez', document: '87654321Z', clientType: 'VIP', personType: 'F', documentType: 'NIE' },
    ];
    return of(people);
  }
}
