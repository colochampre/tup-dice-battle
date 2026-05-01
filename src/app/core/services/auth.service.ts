import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

const AUTH_KEY = 'isAuthenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(): Observable<boolean> {
    return timer(2000).pipe(
      map(() => {
        sessionStorage.setItem(AUTH_KEY, 'true');
        return true;
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem(AUTH_KEY);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }
}
