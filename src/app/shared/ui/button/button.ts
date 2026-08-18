import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  disabled = input<boolean>(false);
  link = input<string>();
  type = input<'button' | 'submit' | 'reset'>('button');
  clicked = output<void>();
}
