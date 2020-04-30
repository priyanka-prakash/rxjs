import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
  getDatas() {
    return this.http.get('https://api.npms.io/v2/search?q=scope:angular');
  }
}