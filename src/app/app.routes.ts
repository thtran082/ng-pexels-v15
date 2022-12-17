import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./ui/layout/layout.component').then(m => m.LayoutComponent),
    loadChildren: () => import('./ui/layout/layout.routs'),
  }
];
