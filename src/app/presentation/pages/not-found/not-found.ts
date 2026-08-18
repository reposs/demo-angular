import { Component, inject } from '@angular/core';
import { Button } from '@shared/ui/button/button';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-not-found',
  imports: [Button],
  templateUrl: './not-found.html',
})
export class NotFound {
  protected readonly i18n = inject(TranslationService);
}
