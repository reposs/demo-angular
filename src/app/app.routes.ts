import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@presentation/features/home/home').then((c) => c.Home),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('@presentation/features/services/services.routes').then((m) => m.SERVICES_ROUTES),
  },
  {
    path: 'about',
    loadComponent: () => import('@presentation/features/about/about').then((c) => c.About),
  },
  {
    path: 'contact',
    loadComponent: () => import('@presentation/features/contact/contact').then((c) => c.Contact),
  },
  {
    path: '**',
    loadComponent: () => import('@presentation/pages/not-found/not-found').then((c) => c.NotFound),
  },
];
