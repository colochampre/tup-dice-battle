import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, SpinnerComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  loading = input(false);
  label = input.required<string>();
  clicked = output<void>();

  onClick(): void {
    if (!this.loading()) {
      this.clicked.emit();
    }
  }
}
