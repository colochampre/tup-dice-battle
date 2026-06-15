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
  variant = input<ModalStyle>('info');
  message = input.required<string>();
  confirmLabel = input<string>('');
  cancelLabel = input<string>('');
  closed = output<void>();
  confirmed = output<void>();

  get icon(): string {
    const icons: Record<ModalStyle, string> = {
      info: 'info',
      success: 'check_circle',
      danger: 'error',
    };
    return icons[this.variant()];
  }

  onClose(): void {
    this.closed.emit();
  }

  onConfirm(): void {
    this.confirmed.emit();
  }
}
