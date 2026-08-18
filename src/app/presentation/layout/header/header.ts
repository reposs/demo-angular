import { Component } from '@angular/core';
import { Nav } from './components/nav/nav';

@Component({
  selector: 'app-header',
  imports: [Nav],
  template: `
    <header>
      <app-nav />
    </header>
  `,
})
export class Header {}
