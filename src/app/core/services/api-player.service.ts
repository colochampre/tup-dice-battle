import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Player, RandomUserResponse } from '../models/player.model';

const API_URL = 'https://randomuser.me/api/';

@Injectable({
  providedIn: 'root',
})
export class ApiPlayerService {
  private http = inject(HttpClient);

  getPlayers(page: number, count: number): Observable<Player[]> {
    return this.http
      .get<RandomUserResponse>(API_URL, {
        params: { results: count.toString(), page: page.toString(), seed: 'dicebattle' },
      })
      .pipe(map((response) => response.results.map(this.mapToPlayer)));
  }

  private mapToPlayer(result: RandomUserResponse['results'][number]): Player {
    return {
      firstName: result.name.first,
      lastName: result.name.last,
      email: result.email,
      age: result.dob.age,
      phone: result.phone,
      picture: result.picture.large,
      country: result.location.country,
      state: result.location.state,
      city: result.location.city,
      score: Math.floor(Math.random() * 9999) + 1,
    };
  }
}
