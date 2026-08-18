import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastData {
  message: string;
  type: ToastType;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly toast = signal<ToastData | null>(null);

  show(message: string, type: ToastType = 'info', duration = 3000): void {
    this.toast.set({
      message,
      type,
      duration,
    });
  }

  success(message: string, duration = 3000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 5000): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration = 3000): void {
    this.show(message, 'info', duration);
  }

  clear(): void {
    this.toast.set(null);
  }
}
