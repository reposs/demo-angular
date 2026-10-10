import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgTemplateOutlet } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  disabled = input<boolean>(false);
  link = input<string>();
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<ButtonVariant>('primary');
  clicked = output<void>();
}
