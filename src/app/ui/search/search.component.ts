import { ChangeDetectionStrategy, Component, inject, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ngx-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <mat-form-field>
      <input matInput type="text" placeholder="write something ..." [formControl]="queryControl">
      <button *ngIf="queryControl.value"
              matSuffix
              mat-icon-button
              (click)="queryControl.reset()"
              aria-label="close/reset button">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
})
export class SearchComponent {
  readonly queryControl = inject(NonNullableFormBuilder).control('search');

  @Input() set photoQuery(val: string) {
    this.queryControl.setValue(val, { emitEvent: true });
  }

  @Output() query = this.queryControl.valueChanges.pipe(debounceTime(300));
}
