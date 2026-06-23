import { Injectable } from '@angular/core';

export interface CachedData<T> {
  data: T;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getFromCache<T>(key: string, ttlMs: number): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }

    try {
      const cached: CachedData<T> = JSON.parse(raw);
      if (Date.now() - cached.timestamp > ttlMs) {
        localStorage.removeItem(key);
        return null;
      }
      return cached.data;
    } catch (e) {
      console.error(`Error parsing cache for key: ${key}`, e);
      localStorage.removeItem(key);
      return null;
    }
  }

  saveToCache<T>(key: string, data: T): void {
    const entry: CachedData<T> = { data, timestamp: Date.now() };
    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (e) {
      console.error(`Error saving to cache for key: ${key}`, e);
    }
  }

  removeFromCache(key: string): void {
    localStorage.removeItem(key);
  }
}
