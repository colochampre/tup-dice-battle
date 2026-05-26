import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

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
  imports: [MatIconModule, SpinnerComponent],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css',
})
export class ConfigComponent implements OnInit {
  user = signal<UserProfile | null>(null);
  loading = signal(true);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://randomuser.me/api/?seed=dicebattle-user&results=1')
      .subscribe({
        next: res => {
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
}
