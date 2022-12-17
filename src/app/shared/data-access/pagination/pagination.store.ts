import { inject, Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { injectAppConfig } from '../../config/config.di';
import { debounceTime, map, pipe, tap } from 'rxjs';

@Injectable()
export class PaginationStore extends ComponentStore<{
  pageSize: number;
  total: number;
  currentPage: number;
}> implements OnStoreInit {

  public readonly currentPage$ = this.select(s => s.currentPage);

  public readonly paginator$ = this.select(
    {
      pageIndex: this.currentPage$.pipe(map(currentPage => currentPage - 1)),
      pageSize: this.select(s => s.pageSize),
      total: this.select(s => s.total),
    },
    { debounce: true }
  );

  public setTotal = this.updater<number>((state, total) => ({
    ...state, total,
  }));

  public setPage = this.effect<number>(
    pipe(
      debounceTime(300),
      tap((currentPage) => {
        this.patchState({ currentPage });
      })
    )
  );

  private readonly appConfig = injectAppConfig();

  public ngrxOnStoreInit(): void {
    this.setState({ pageSize: 0, total: this.appConfig.pexels.pageSize, currentPage: 1 });
  }
}

export function injectPaginationStore() {
  return inject(PaginationStore);
}
