import { Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { AppInfoComponent } from '../../shared/components/app-info/app-info.component';
import { AuthService } from '../../core/services/auth.service';
import { RandomUserResponse } from '../../core/models/player.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  picture: string;
  country: string;
  state: string;
  city: string;
}

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [MatIconModule, SpinnerComponent, ModalComponent, AppInfoComponent, TranslatePipe],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css',
})
export class ConfigComponent implements OnInit {
  user = signal<UserProfile | null>(null);
  loading = signal(true);
  showLogoutModal = signal(false);
  showAppInfoModal = signal(false);

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  protected readonly currentLang = this.translate.currentLang;

  changeLang(lang: string): void {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.http
      .get<RandomUserResponse>('https://randomuser.me/api/?seed=dicebattle-user&results=1')
      .subscribe({
        next: (res) => {
          const r = res.results[0];
          this.user.set({
            firstName: r.name.first,
            lastName: r.name.last,
            email: r.email,
            phone: r.phone,
            picture: r.picture.large,
            country: r.location.country,
            state: r.location.state,
            city: r.location.city,
          });
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

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

  openAppInfoModal(): void {
    this.showAppInfoModal.set(true);
  }

  closeAppInfoModal(): void {
    this.showAppInfoModal.set(false);
  }
}
