import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hero } from '../_models/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHeroes() {
    return this.http.get<Hero[]>(this.baseUrl + 'users');
  }

  getHero(username: string) {
    return this.http.get<Hero>(this.baseUrl + 'users/' + username);
  }
}
