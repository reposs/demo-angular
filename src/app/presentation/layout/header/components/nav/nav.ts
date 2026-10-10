import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { TranslationService } from '@presentation/i18n/translation.service';
import { LanguageSelector } from '../language-selector/language-selector';
import { APP_NAV_LINKS } from '@presentation/layout/navigation.config';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet, LanguageSelector],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav.html',
})
export class Nav {
  protected readonly i18n = inject(TranslationService);

  readonly menuOpen = signal(false);
  readonly links = APP_NAV_LINKS;

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
}
