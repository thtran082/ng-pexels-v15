import { Component, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideAppConfig } from './shared/config/config.di';

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
  static bootstrap(config: any) {
    return bootstrapApplication(this, {
        providers: [
          provideRouter(routes),
          provideAnimations(),
          importProvidersFrom([BrowserAnimationsModule]),
          provideAppConfig(config)
        ]
      }
    ).catch(error => console.error(error));
  }
}
