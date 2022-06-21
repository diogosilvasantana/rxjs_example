import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { AppInterface } from './app.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(public httpClient: HttpClient) {}

  // Promises
  getPromiseTable() {
    return this.httpClient.get(`${environment.api}/tabela`);
  }

  postPromiseTable(item: AppInterface) {
    return this.httpClient.post(`${environment.api}/tabela`, item, {
      headers: this.headers,
    });
  }

  putPromiseTable(item: AppInterface) {
    return this.httpClient.put(`${environment.api}/tabela/${item.id}`, item, {
      headers: this.headers,
    });
  }

  deletePromiseTable() {}

  // Observables
  getObservableTable(): Observable<AppInterface[]> {
    return this.httpClient.get<AppInterface[]>(`${environment.api}/tabela`);
  }

  postObservableTable() {}

  putObservableTable() {}

  deleteObservableTable() {}
}
