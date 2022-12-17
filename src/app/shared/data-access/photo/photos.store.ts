import { inject, Injectable } from '@angular/core';
import { ComponentStore, OnStateInit, OnStoreInit } from '@ngrx/component-store';
import { Photo } from '../pexels/pexels.model';
import { injectPexelsService } from '../pexels/pexels.service';
import { injectPaginationStore } from '../pagination/pagination.store';
import { createInjectionToken } from '../../utils/di';
import { catchError, defer, EMPTY, pipe, switchMap, tap, withLatestFrom } from 'rxjs';

export const [injectPhotoQuery, providePhotoQuery] = createInjectionToken<string>('PHOTO QUERY');

@Injectable()
export class PhotosStore extends ComponentStore<{ photos: Photo[], query: string }> implements OnStoreInit, OnStateInit {
  public readonly photos$ = this.select(s => s.photos, { debounce: true });

  private readonly paginationStore = injectPaginationStore();
  private readonly pexelsService = injectPexelsService();
  private readonly photoQuery = injectPhotoQuery();
  private readonly query$ = this.select(s => s.query);

  private readonly getPhotos = this.effect<{ query: string, page: number }>(
    pipe(
      switchMap(({ query, page }) =>
        defer(() =>
          query
            ? this.pexelsService.searchPhoto(query, page)
            : this.pexelsService.randomPhotos(page)
        ).pipe(
          tap((response) => {
            this.paginationStore.setTotal(response.total_results);
            this.patchState({ photos: response.photos });
          }),
          catchError(() => EMPTY),
        )
      )
    )
  );

  public readonly setQuery = this.effect<string>(
    pipe(
      withLatestFrom(this.query$),
      tap(([query, previousQuery]) => {
        // that means user s search by searchTerm and then reset it
        if (!query && previousQuery) {
          this.paginationStore.setPage(1);
        }
        this.patchState({ query });
      }),
    )
  );

  public ngrxOnStoreInit(): void {
    this.setState({ photos: [], query: this.photoQuery });
  }

  public ngrxOnStateInit(): void {
    this.getPhotos(
      this.select({
        query: this.query$,
        page: this.paginationStore.currentPage$,
      })
    );
  }
}

export function injectPhotosStore() {
  return inject(PhotosStore);
}
