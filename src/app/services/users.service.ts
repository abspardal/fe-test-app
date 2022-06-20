import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get(`${this.url}/users`);
  }

  getListByPage(payload) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', payload.page);
    queryParams = queryParams.append('limit', payload.limit);

    return this.http.get(`${this.url}/users`, {params: queryParams});
  }

  create(payload) {
    return this.http.post(`${this.url}/users`, payload);
  }

  getStatuses() {
    return this.http.get(`${this.url}/statuses`);
  }

  validateUsername(username) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('username', username);
    return this.http.get(`${this.url}/users`, {params: queryParams});
  }

}