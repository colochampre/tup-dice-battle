import { Component } from '@angular/core';
import { NavItemComponent } from '../nav-item/nav-item.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NavItemComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {}
