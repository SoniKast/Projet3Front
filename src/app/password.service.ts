import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private http: HttpClient) {}

  requestPasswordReset(email: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<string>(
      'http://localhost:8080/password/reset-request',
      email,
      { headers }
    );
  }

  resetPassword(token: string, newPassword: string): Observable<string> {
    return this.http.post<string>(
      'http://localhost:8080/password/reset-password',
      { token, newPassword }
    );
  }
}
