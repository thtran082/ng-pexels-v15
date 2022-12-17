import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaginatorComponent } from '../paginator/paginator.component';
import { SearchComponent } from '../search/search.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { injectPhotoQuery, injectPhotosStore } from '../../shared/data-access/photo/photos.store';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { PushModule } from '@ngrx/component';

@Component({
  selector: 'ngx-photos-grid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PaginatorComponent,
    SearchComponent,
    NgIf,
    PhotoCardComponent,
    AsyncPipe,
    NgFor,
    PushModule,
  ],
  template: `
    <ngx-paginator></ngx-paginator>
    <ngx-search *ngIf="withSearch" [photoQuery]="photoQuery" (query)="photosStore.setQuery($event)"></ngx-search>
    <div class="photos-grid">
      <ngx-photo-card *ngFor="let photo of photosStore.photos$ | ngrxPush" [photo]="photo"></ngx-photo-card>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem;

      & .photos-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        row-gap: 2rem;
      }
    }
  `],
})
export class PhotosGridComponent {
  @Input() withSearch = false;
  readonly photoQuery = injectPhotoQuery();
  readonly photosStore = injectPhotosStore();
}
