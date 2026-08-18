import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '@presentation/i18n/translation.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly i18n = inject(TranslationService);

  links = [
    { label: 'nav.home', path: '/' },
    { label: 'nav.services', path: '/services' },
    { label: 'nav.about', path: '/about' },
    { label: 'nav.contact', path: '/contact' },
  ];
}
