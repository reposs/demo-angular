import { InjectionToken } from '@angular/core';
import { StoragePort } from '@domain/ports/storage-port';

export const STORAGE_PORT = new InjectionToken<StoragePort>('STORAGE_PORT');
