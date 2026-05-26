import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const APP_NAME = 'Dice Battle';
const APP_VERSION = '0.0.0';

@Component({
  selector: 'app-app-info',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './app-info.component.html',
  styleUrl: './app-info.component.css',
})
export class AppInfoComponent {
  appName = APP_NAME;
  appVersion = APP_VERSION;
  userAgent = navigator.userAgent;
}
