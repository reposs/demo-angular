import { Injectable, signal } from '@angular/core';

export type RepositoryAdapterMode = 'mock' | 'http';

@Injectable({ providedIn: 'root' })
export class AdapterModeService {
  private readonly _mode = signal<RepositoryAdapterMode>('mock');
  readonly mode = this._mode.asReadonly();

  set(mode: RepositoryAdapterMode): void {
    this._mode.set(mode);
  }

  getValue(): RepositoryAdapterMode {
    return this._mode();
  }
}
