import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { STORAGE_PORT } from '@application/tokens/storage-token';
import { StoragePort } from '@domain/ports/storage-port';

export type AppLanguage = 'en' | 'es';

/** Centralizes application language selection and translation lookups. */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly storage = inject<StoragePort>(STORAGE_PORT, { optional: true });
  private readonly storageKey = 'portfolio-language';
  private readonly refreshVersion = signal(0);

  readonly language = signal<AppLanguage>(this.getSavedLanguage());

  constructor() {
    this.translate.setFallbackLang('en');
    this.translate.use(this.language());
    this.translate.onLangChange?.subscribe(({ lang }) => {
      if (this.document?.documentElement) {
        this.document.documentElement.lang = lang;
      }
      this.refreshVersion.update((version) => version + 1);
    });
  }

  setLanguage(language: AppLanguage): void {
    this.language.set(language);
    this.storage?.set(this.storageKey, language);
    this.translate.use(language);
  }

  translateKey(key: string): string {
    this.refreshVersion();
    return this.translate.instant(key) as string;
  }

  private getSavedLanguage(): AppLanguage {
    const savedLanguage = this.storage?.get(this.storageKey);
    return savedLanguage === 'es' ? 'es' : 'en';
  }
}
