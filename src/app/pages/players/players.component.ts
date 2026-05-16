import { Component, OnInit, signal, computed } from '@angular/core';
import { PlayerService } from '../../core/services/player.service';
import { Player } from '../../core/models/player.model';
import { PlayerCardComponent } from '../../shared/components/player-card/player-card.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { ModalComponent, ModalStyle } from '../../shared/components/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const PAGE_SIZE = 24;
const TOTAL_PAGES = 50;

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [PlayerCardComponent, SpinnerComponent, ModalComponent, MatButtonModule, MatIconModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
})
export class PlayersComponent implements OnInit {
  players = signal<Player[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  totalPages = TOTAL_PAGES;

  showModal = signal(false);
  modalMessage = signal('');
  modalStyle = signal<ModalStyle>('info');

  pageNumbers = computed(() => {
    const current = this.currentPage();
    const pages: (number | string)[] = [];

    if (current > 1) pages.push(current - 1);
    pages.push(current);
    if (current < this.totalPages) pages.push(current + 1);

    if (current > 2) {
      pages.unshift('...');
      pages.unshift(1);
    }

    if (current < this.totalPages - 1) {
      pages.push('...');
      pages.push(this.totalPages);
    }

    return pages;
  });

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.loading.set(true);
    this.playerService.getPlayers(page, PAGE_SIZE).subscribe({
      next: players => {
        this.players.set(players);
        this.currentPage.set(page);
        this.loading.set(false);
      },
      error: err => {
        console.error('Failed to load players:', err);
        this.loading.set(false);
        this.modalStyle.set('danger');
        this.modalMessage.set('No se pudieron cargar los jugadores. Intenta nuevamente más tarde.');
        this.showModal.set(true);
      },
    });
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.loadPage(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages) {
      this.loadPage(this.currentPage() + 1);
    }
  }

  goToPage(page: number | string): void {
    if (typeof page === 'number') {
      this.loadPage(page);
    }
  }

  closeModal(): void {
    this.showModal.set(false);
  }
}
