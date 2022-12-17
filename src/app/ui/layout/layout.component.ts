import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatSidenavModule, SideNavComponent, TopBarComponent, RouterOutlet, SideNavComponent, SideNavComponent],
  template: `
    <mat-sidenav-container class="layout-container">
      <mat-sidenav mode="side" opened>
        <ngx-side-nav></ngx-side-nav>
      </mat-sidenav>
      <mat-sidenav-content>
        <ngx-top-bar></ngx-top-bar>
        <div class="layout-content-container">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .layout-container {
      position: absolute;
      inset: 0 0 0 0;
    }

    .layout-content-container {
      width: 100%;
      height: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
}
