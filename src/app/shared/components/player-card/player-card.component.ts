import { Component, input } from '@angular/core';
import { Player } from '../../../core/models/player.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css',
})
export class PlayerCardComponent {
  player = input.required<Player>();
}
