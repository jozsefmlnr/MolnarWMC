import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Hinzufügen
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // ✅ CommonModule importieren
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  user$;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$; // ✅ Jetzt im Konstruktor initialisiert
  }

  login() {
    this.authService.loginWithGoogle();
  }

  logout() {
    this.authService.logout();
  }
}
