import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StoragePort } from '@domain/ports/storage-port';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageAdapter implements StoragePort {
  private readonly platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  get(key: string): string | null {
    if (!this.isBrowser) {
      return null;
    }
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  set(key: string, value: string): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore quota or private browsing errors gracefully
    }
  }

  remove(key: string): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore
    }
  }
}
