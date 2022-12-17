import { Route } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { PaginationStore } from '../../shared/data-access/pagination/pagination.store';
import { PhotosStore, providePhotoQuery } from '../../shared/data-access/photo/photos.store';

const layoutRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../../page/home/home.component'),
    providers: [
      provideComponentStore(PaginationStore),
      provideComponentStore(PhotosStore),
      providePhotoQuery('programming'),
    ],
  },
  {
    path: 'random',
    loadComponent: () => import('../../page/random/random.component'),
    providers: [
      provideComponentStore(PaginationStore),
      provideComponentStore(PhotosStore),
      providePhotoQuery('christmas'),
    ],
  },
];
export default layoutRoutes;
