import { Component } from '@angular/core';
import { PhotosGridComponent } from '../../ui/photos-grid/photos-grid.component';
import { injectPhotosStore } from '../../shared/data-access/photo/photos.store';

@Component({
  selector: 'ngx-home',
  standalone: true,
  imports: [
    PhotosGridComponent,
  ],
  template: `
    <ngx-photos-grid [withSearch]="true"></ngx-photos-grid>
  `,
  styles: []
})
export default class HomeComponent {
  readonly photoStore = injectPhotosStore();
}
