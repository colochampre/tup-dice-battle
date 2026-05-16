import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export type ModalStyle = 'info' | 'success' | 'danger';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  style = input<ModalStyle>('info');
  message = input.required<string>();
  closed = output<void>();

  get icon(): string {
    const icons: Record<ModalStyle, string> = {
      info: 'info',
      success: 'check_circle',
      danger: 'error',
    };
    return icons[this.style()];
  }

  onClose(): void {
    this.closed.emit();
  }
}
