import { Component, inject } from '@angular/core';
import { Button } from '@shared/ui/button/button';
import { TranslationService } from '@presentation/i18n/translation.service';

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
})
export class Home {
  protected readonly i18n = inject(TranslationService);
}
