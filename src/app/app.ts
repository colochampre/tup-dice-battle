import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Dice-Battle');
  private translate = inject(TranslateService);

  constructor() {
    this.translate.setFallbackLang('es');
    this.translate.use('es');
  }
}
