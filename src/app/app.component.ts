import { Component, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  static bootstrap() {
    bootstrapApplication(this, {
        providers: [
          provideRouter(routes),
          provideAnimations(),
          importProvidersFrom([BrowserAnimationsModule]),
        ]
      }
    ).catch(error => console.error(error));
  }
}
