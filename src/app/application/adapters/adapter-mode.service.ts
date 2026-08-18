import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdapterModeService {
  private mode$ = new BehaviorSubject<'mock' | 'http'>('mock');
  readonly mode = this.mode$.asObservable();

  set(mode: 'mock' | 'http') {
    this.mode$.next(mode);
  }

  getValue(): 'mock' | 'http' {
    return this.mode$.value;
  }
}
