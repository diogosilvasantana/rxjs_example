import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from './../environments/environment';
import { AppInterface } from './app.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  env = environment;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(public httpClient: HttpClient) {}

  getNomes(nome?: string): Observable<AppInterface[]> {
    const params = nome
      ? new HttpParams().append('nome_like', nome)
      : undefined;

    return this.httpClient
      .get<AppInterface[]>(`${this.env.api}/nomes`, { params: params })
      .pipe(tap((valor) => console.log(valor)));
  }
}
