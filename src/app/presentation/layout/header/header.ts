import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Nav } from './components/nav/nav';

@Component({
  selector: 'app-header',
  imports: [Nav],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <app-nav />
    </header>
  `,
})
export class Header {}
