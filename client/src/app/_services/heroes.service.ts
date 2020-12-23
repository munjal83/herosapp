import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hero } from '../_models/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  baseUrl = environment.apiUrl;
  heroes: Hero[] = [];

  constructor(private http: HttpClient) {}

  getHeroes() {
    if (this.heroes.length > 0) return of(this.heroes);
    return this.http.get<Hero[]>(this.baseUrl + 'users').pipe(
      map((heroes) => {
        this.heroes = heroes;
        return heroes;
      })
    );
  }

  getHero(username: string) {
    const hero = this.heroes.find((x) => x.username === username);
    if (hero !== undefined) return of(hero);
    return this.http.get<Hero>(this.baseUrl + 'users/' + username);
  }

  updateHero(hero: Hero) {
    return this.http.put(this.baseUrl + 'users', hero).pipe(
      map(() => {
        const index = this.heroes.indexOf(hero);
        this.heroes[index] = hero;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
