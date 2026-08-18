import { Component, inject } from '@angular/core';
import { TranslationService, AppLanguage } from '@presentation/i18n/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.html',
})
export class LanguageSelector {
  protected readonly i18n = inject(TranslationService);

  setLanguage(lang: AppLanguage) {
    this.i18n.setLanguage(lang);
  }
}
