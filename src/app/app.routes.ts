import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'players', pathMatch: 'full' },
      { path: 'players', loadComponent: () => import('./pages/players/players.component').then(m => m.PlayersComponent) },
      { path: 'config', loadComponent: () => import('./pages/config/config.component').then(m => m.ConfigComponent) },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
