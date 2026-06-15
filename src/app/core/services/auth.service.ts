import { Injectable, signal } from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { firebaseAuth } from '../firebase/firebase.app';

export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  providerId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = firebaseAuth;

  readonly user = signal<AuthUser | null>(null);

  private resolveReady!: () => void;
  /** Resolves once Firebase has emitted the initial auth state. */
  readonly ready = new Promise<void>(resolve => (this.resolveReady = resolve));

  constructor() {
    onAuthStateChanged(this.auth, fbUser => {
      this.user.set(fbUser ? this.mapUser(fbUser) : null);
      this.resolveReady();
    });
  }

  login(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider).then(() => void 0));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  isLoggedIn(): boolean {
    return this.user() !== null;
  }

  private mapUser(u: User): AuthUser {
    return {
      uid: u.uid,
      displayName: u.displayName,
      email: u.email,
      photoURL: u.photoURL,
      emailVerified: u.emailVerified,
      providerId: u.providerData[0]?.providerId ?? 'firebase',
    };
  }
}
