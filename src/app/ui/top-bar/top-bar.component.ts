import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'ngx-top-bar',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      Image Gallery
    </mat-toolbar>
  `,
})
export class TopBarComponent {

}
