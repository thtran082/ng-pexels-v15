import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { injectPaginationStore } from '../../shared/data-access/pagination/pagination.store';
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'ngx-paginator',
  standalone: true,
  imports: [MatPaginatorModule, LetModule],
  template: `
    <mat-paginator *ngrxLet="paginatorStore.paginator$ as paginator"
                   [length]="paginator.total"
                   [pageSize]="paginator.pageSize"
                   [showFirstLastButtons]="true"
                   (page)="paginatorStore.setPage($event.pageIndex + 1)"
                   [pageIndex]="paginator.pageIndex"
                   aria-label="select page"
    >

    </mat-paginator>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  readonly paginatorStore = injectPaginationStore();
}
