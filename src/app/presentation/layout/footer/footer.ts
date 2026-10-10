import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '@presentation/i18n/translation.service';
import { APP_NAV_LINKS } from '@presentation/layout/navigation.config';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly i18n = inject(TranslationService);
  readonly links = APP_NAV_LINKS;
}
