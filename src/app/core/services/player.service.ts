import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';
import { Player, RandomUserResponse } from '../models/player.model';

const API_URL = 'https://randomuser.me/api/';
const CACHE_PREFIX = 'players_page_';
const CACHE_TTL_MS = 5 * 60 * 1000;

interface CachedData<T> {
  data: T;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class PlayerService {
  constructor(private http: HttpClient) {}

  getPlayers(page: number, count: number): Observable<Player[]> {
    const cached = this.getFromCache(page);
    if (cached) {
      return of(cached);
    }

    return this.http
      .get<RandomUserResponse>(API_URL, {
        params: { results: count.toString(), page: page.toString(), seed: 'dicebattle' },
      })
      .pipe(
        map(response => response.results.map(this.mapToPlayer)),
        tap(players => this.saveToCache(page, players))
      );
  }

  private getFromCache(page: number): Player[] | null {
    const raw = localStorage.getItem(CACHE_PREFIX + page);
    if (!raw) return null;

    const cached: CachedData<Player[]> = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_PREFIX + page);
      return null;
    }

    return cached.data;
  }

  private saveToCache(page: number, players: Player[]): void {
    const entry: CachedData<Player[]> = { data: players, timestamp: Date.now() };
    localStorage.setItem(CACHE_PREFIX + page, JSON.stringify(entry));
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
    };
  }
}
