import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { timer } from 'rxjs';
import { ToastService, ToastType } from './toast-service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  imports: [NgClass],
})
export class Toast {
  private readonly toastService = inject(ToastService);

  readonly message = input('');
  readonly type = input<ToastType>('info');
  readonly duration = input(3000);
  readonly show = input(false);

  readonly globalToast = this.toastService.toast;

  readonly visible = signal(false);
  readonly leaving = signal(false);

  readonly messageToShow = computed(() => this.globalToast()?.message ?? this.message());
  readonly typeToShow = computed(() => this.globalToast()?.type ?? this.type());

  constructor() {
    effect((onCleanup) => {
      const globalToast = this.globalToast();
      const localShow = this.show();

      if (!globalToast && !localShow) {
        this.visible.set(false);
        return;
      }

      this.visible.set(true);
      this.leaving.set(false);

      const duration = globalToast?.duration ?? this.duration();

      const subscription = timer(duration).subscribe(() => {
        this.leaving.set(true);
      });

      onCleanup(() => subscription.unsubscribe());
    });
  }
}
