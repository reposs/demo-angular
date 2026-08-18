import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserHttpRepository } from '@infrastructure/repositories/user-http-repository';
import { UserMockRepository } from '@infrastructure/repositories/user-mock-repository';
import { UserRepositoryProxy } from '@infrastructure/repositories/user-repository-proxy';
import { AdapterModeService } from '@application/adapters/adapter-mode.service';
import { USER_REPOSITORY } from '@application/tokens/user-repository-token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en',
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
    }),
    UserMockRepository,
    UserHttpRepository,
    AdapterModeService,
    UserRepositoryProxy,
    {
      provide: USER_REPOSITORY,
      useFactory: () => new UserRepositoryProxy(),
    },
  ],
};
