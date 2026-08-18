import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@presentation/layout/header/header';
import { Footer } from '@presentation/layout/footer/footer';
import { Toast } from '@shared/ui/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Toast],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header />

      <main class="flex-1 flex items-center justify-center">
        <router-outlet />
      </main>

      <app-footer />
    </div>
    <app-toast />
  `,
})
export class App {
  protected readonly title = signal('demo-angular');
}
