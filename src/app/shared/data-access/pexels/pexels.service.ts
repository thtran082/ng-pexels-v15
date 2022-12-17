import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectAppConfig } from '../../config/config.di';
import { Observable } from 'rxjs';
import { PhotoPagination } from './pexels.model';

@Injectable({ providedIn: 'root' })
export class PexelsService {
  private readonly httpClient = inject(HttpClient);
  private readonly appConfig = injectAppConfig();

  randomPhotos(page: number = 1): Observable<PhotoPagination> {
    return this.httpClient.get<PhotoPagination>(
      `${this.appConfig.baseUrl}/curated`,
      {
        params: { per_page: this.appConfig.pexels.pageSize, page, }
      }
    );
  }

  searchPhoto(query: string, page: number = 1): Observable<PhotoPagination> {
    return this.httpClient.get<PhotoPagination>(
      `${this.appConfig.baseUrl}/search`,
      {
        params: { per_page: this.appConfig.pexels.pageSize, page, query, }
      }
    );
  }
}

export function injectPexelsService() {
  return inject(PexelsService);
}
