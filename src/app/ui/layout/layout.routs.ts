import { Route } from '@angular/router';

const layoutRoutes: Route[] = [
  { path: '', loadComponent: () => import('../../page/home/home.component') },
  { path: 'random', loadComponent: () => import('../../page/random/random.component') },
];
export default layoutRoutes;
