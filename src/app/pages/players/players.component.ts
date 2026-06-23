import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { PlayerService } from '../../core/services/player.service';
import { Player } from '../../core/models/player.model';
import { PlayerCardComponent } from '../../shared/components/player-card/player-card.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { ModalComponent, ModalStyle } from '../../shared/components/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

const PAGE_SIZE = 24;
const TOTAL_PAGES = 50;

export type SortField = 'firstName' | 'lastName' | 'age' | 'score';
export type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [
    PlayerCardComponent,
    SpinnerComponent,
    ModalComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
})
export class PlayersComponent implements OnInit {
  players = signal<Player[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  totalPages = TOTAL_PAGES;

  searchTerm = signal('');
  sortField = signal<SortField>('firstName');
  sortDirection = signal<SortDirection>('asc');

  showModal = signal(false);
  modalMessage = signal('');
  modalStyle = signal<ModalStyle>('info');

  private playerService = inject(PlayerService);

  filteredPlayers = computed(() => {
    let result = this.players();
    const term = this.searchTerm().toLowerCase().trim();

    if (term) {
      result = result.filter(
        (p) =>
          p.firstName.toLowerCase().includes(term) ||
          p.lastName.toLowerCase().includes(term) ||
          p.email.toLowerCase().includes(term) ||
          p.country.toLowerCase().includes(term) ||
          p.state.toLowerCase().includes(term) ||
          p.city.toLowerCase().includes(term),
      );
    }

    const field = this.sortField();
    const dir = this.sortDirection() === 'asc' ? 1 : -1;

    return [...result].sort((a, b) => {
      const valA = a[field];
      const valB = b[field];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB) * dir;
      }
      return ((valA as number) - (valB as number)) * dir;
    });
  });

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

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number): void {
    this.loading.set(true);
    this.playerService.getPlayers(page, PAGE_SIZE).subscribe({
      next: (players) => {
        this.players.set(players);
        this.currentPage.set(page);
        this.loading.set(false);
      },
      error: (err) => {
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
