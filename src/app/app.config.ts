import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserHttpRepository } from '@infrastructure/repositories/user-http-repository';
import { UserMockRepository } from '@infrastructure/repositories/user-mock-repository';
import { UserRepositoryProxy } from '@infrastructure/repositories/user-repository-proxy';
import { AdapterModeService } from '@infrastructure/adapters/adapter-mode.service';
import { LocalStorageAdapter } from '@infrastructure/adapters/local-storage-adapter';
import { USER_REPOSITORY } from '@application/tokens/user-repository-token';
import { STORAGE_PORT } from '@application/tokens/storage-token';
import { errorInterceptor } from '@infrastructure/interceptors/error/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en',
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
    }),
    LocalStorageAdapter,
    {
      provide: STORAGE_PORT,
      useExisting: LocalStorageAdapter,
    },
    UserMockRepository,
    UserHttpRepository,
    AdapterModeService,
    UserRepositoryProxy,
    {
      provide: USER_REPOSITORY,
      useExisting: UserRepositoryProxy,
    },
  ],
};
