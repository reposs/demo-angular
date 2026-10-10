import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslationService, AppLanguage } from '@presentation/i18n/translation.service';

@Component({
  selector: 'app-language-selector',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-selector.html',
})
export class LanguageSelector {
  protected readonly i18n = inject(TranslationService);

  setLanguage(lang: AppLanguage) {
    this.i18n.setLanguage(lang);
  }
}
