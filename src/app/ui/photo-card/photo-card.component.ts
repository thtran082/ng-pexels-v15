import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Photo } from '../../shared/data-access/pexels/pexels.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'ngx-photo-card[photo]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgOptimizedImage],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ photo.photographer }}</mat-card-title>
        <mat-card-subtitle>{{ photo.alt || 'Untitled' }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <img mat-card-image [ngSrc]="photo.src.large" fill [alt]="photo.alt"/>
      </mat-card-content>
      <mat-card-actions>
        <a mat-button color="accent" [href]="photo.photographer_url">
          <mat-icon fontIcon="link"></mat-icon>
          {{ photo.photographer }}
        </a>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    :host {
      position: relative;

      & mat-card {
        width: 486px;

        & .example-header-image {
          background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
          background-size: cover;
        }

        & mat-card-header {
          padding: 1rem;

          & mat-card-subtitle {
            height: 2.4rem;
            line-height: 1.2rem;
          }
        }

        & mat-card-actions {
          padding: 1rem;
        }

        & mat-card-content {
          position: relative;
          height: 400px;
        }

        & [mat-card-image] {
          object-fit: cover;
        }
      }
    }
  `],
})
export class PhotoCardComponent {
  @Input() photo!: Photo;
}
