import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { TranslationService } from '@presentation/i18n/translation.service';
import { LanguageSelector } from '../language-selector/language-selector';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, NgTemplateOutlet, LanguageSelector],
  templateUrl: './nav.html',
})
export class Nav {
  protected readonly i18n = inject(TranslationService);

  menuOpen = signal(false);

  links = [
    { label: 'nav.home', path: '/' },
    { label: 'nav.services', path: '/services' },
    { label: 'nav.about', path: '/about' },
    { label: 'nav.contact', path: '/contact' },
  ];

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
}
