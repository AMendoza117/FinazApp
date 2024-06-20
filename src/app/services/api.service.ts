import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "https://localhost:8080";

  constructor(private http: HttpClient, private httpClient: HttpClient) { }

  // Método para realizar una solicitud GET a una API en el backend.
  public get(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url);
  }

  // Método para realizar una solicitud POST a una API en el backend.
  public post(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers });
  }

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };

    const url = `${this.apiUrl}/api/login.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, credentials, { headers });
  }

  login2(token: string): Observable<any> {
    const credentials = { token };

    const url = `${this.apiUrl}/api/login2Fa.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, credentials, { headers });
  }
}
