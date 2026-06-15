import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { AppInfoComponent } from '../../shared/components/app-info/app-info.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [MatIconModule, ModalComponent, AppInfoComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css',
})
export class ConfigComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.user;
  showLogoutModal = signal(false);
  showAppInfoModal = signal(false);

  openLogoutModal(): void {
    this.showLogoutModal.set(true);
  }

  closeLogoutModal(): void {
    this.showLogoutModal.set(false);
  }

  confirmLogout(): void {
    this.showLogoutModal.set(false);
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  openAppInfoModal(): void {
    this.showAppInfoModal.set(true);
  }

  closeAppInfoModal(): void {
    this.showAppInfoModal.set(false);
  }
}
