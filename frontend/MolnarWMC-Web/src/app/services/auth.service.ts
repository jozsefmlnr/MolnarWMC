import { Injectable, inject } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.auth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
    });
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      this.userSubject.next(result.user); // Benutzer speichern
      console.log('User:', result.user);
      return result.user;
    } catch (error) {
      console.error('Login-Fehler:', error);
      return null;
    }
  }

  async logout() {
    await signOut(this.auth);
    this.userSubject.next(null); // Benutzer entfernen
  }
}
