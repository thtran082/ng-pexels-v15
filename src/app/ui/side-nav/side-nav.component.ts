import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'ngx-side-nav',
  standalone: true,
  imports: [MatListModule, RouterLink, RouterLinkActive],
  template: `
    <mat-nav-list>
      <mat-list-item><b>Image gallery</b></mat-list-item>
      <a mat-list-item
         routerLink="/"
         #homeRla="routerLinkActive"
         routerLinkActive
         [routerLinkActiveOptions]="{exact: true}"
         [activated]="homeRla.isActive">
        Home
      </a>
      <a mat-list-item
         routerLink="/random"
         #randomRla="routerLinkActive"
         routerLinkActive
         [routerLinkActiveOptions]="{exact: true}"
         [activated]="randomRla.isActive">
        Random Photos
      </a>
    </mat-nav-list>
  `,
  styles: []
})
export class SideNavComponent {

}
