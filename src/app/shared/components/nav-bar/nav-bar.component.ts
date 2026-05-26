import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NavItemComponent } from '../nav-item/nav-item.component';
import { ModalComponent } from '../modal/modal.component';
import { AppInfoComponent } from '../app-info/app-info.component';
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NavItemComponent, ModalComponent, AppInfoComponent, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  showLogoutModal = signal(false);
  showAppInfoModal = signal(false);
  avatarUrl = 'https://randomuser.me/api/portraits/lego/1.jpg';

  constructor(private authService: AuthService, private router: Router) {}

  openLogoutModal(): void {
    this.showLogoutModal.set(true);
  }

  closeLogoutModal(): void {
    this.showLogoutModal.set(false);
  }

  confirmLogout(): void {
    this.showLogoutModal.set(false);
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToConfig(): void {
    this.router.navigate(['/config']);
  }

  openAppInfoModal(): void {
    this.showAppInfoModal.set(true);
  }

  closeAppInfoModal(): void {
    this.showAppInfoModal.set(false);
  }
}
