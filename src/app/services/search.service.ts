import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';

interface Person {
  uid: string;
  realm: string;
  attributes: { [key: string]: string };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api'; // Ajusta la URL

  // Signal en lugar de BehaviorSubject
  private _userData = signal<Person | null>(null);
  public userData = this._userData.asReadonly();

  constructor(private http: HttpClient) {}

  testConnection(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/test-connection`).pipe(
      catchError((error) => {
        console.error('Error en la conexión:', error);
        return throwError(() => new Error('No se pudo conectar con el backend'));
      })
    );
  }

  getUserProfile(uid: string): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/person/${uid}`).pipe(
      catchError((error) => {
        console.error('Error obteniendo perfil:', error);
        return throwError(() => new Error('No se pudo obtener el perfil'));
      })
    );
  }

  searchEmployees(personType: string, searchCriteria: string, searchQuery: string, documentType?: string): Observable<Person[]> {
    let params = new HttpParams()
      .set('personType', personType)
      .set('searchCriteria', searchCriteria)
      .set('query', searchQuery);

    if (searchCriteria === 'DOCUMENTO' && documentType) {
      params = params.set('documentType', documentType);
    }

    return this.http.get<Person[]>(`${this.apiUrl}/employees`, { params }).pipe(
      catchError((error) => {
        console.error('Error en la búsqueda:', error);
        return throwError(() => new Error('No se pudieron obtener resultados'));
      })
    );
  }

  loadUserData(uid: string) {
    this.getUserProfile(uid).subscribe({
      next: (user) => this._userData.set(user),
      error: (err) => console.error('Error al cargar usuario:', err),
    });
  }
}
