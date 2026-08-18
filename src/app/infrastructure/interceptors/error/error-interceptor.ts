import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { IGNORE_ERROR } from '@infrastructure/http/http-context-tokens';
import { ToastService } from '@shared/ui/toast/toast-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const platformId = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError((httpErrorResponse: HttpErrorResponse) => {
      if (isPlatformBrowser(platformId) && !req.context.get(IGNORE_ERROR)) {
        toastService.error(httpErrorResponse.error?.message);
      }

      return throwError(() => httpErrorResponse);
    }),
  );
};
