import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Player } from '../models/player.model';
import { ApiPlayerService } from './api-player.service';
import { LocalStorageService } from './local-storage.service';

const CACHE_PREFIX = 'players_page_';
const CACHE_TTL_MS = 5 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private apiService = inject(ApiPlayerService);
  private storageService = inject(LocalStorageService);

  getPlayers(page: number, count: number): Observable<Player[]> {
    const cacheKey = CACHE_PREFIX + page;
    const cachedPlayers = this.storageService.getFromCache<Player[]>(cacheKey, CACHE_TTL_MS);

    if (cachedPlayers) {
      return of(cachedPlayers);
    }

    return this.apiService
      .getPlayers(page, count)
      .pipe(tap((players) => this.storageService.saveToCache(cacheKey, players)));
  }
}
