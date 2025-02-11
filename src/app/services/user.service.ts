import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/persons';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  searchEmployees(personType: string, searchCriteria: string, searchQuery: string, documentType?: string): Observable<Person[]> {
    let url = `${this.apiUrl}/search?personType=${personType}&searchCriteria=${searchCriteria}&searchQuery=${searchQuery}`;
    if (documentType) {
      url += `&documentType=${documentType}`;
    }
    return this.http.get<Person[]>(url);
  }

  getUserProfile(uid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/userProfile/${uid}`);
  }
}