import { InjectionToken } from '@angular/core';
import { UserRepositoryPort } from '@domain/ports/user-repository-port';

export const USER_REPOSITORY = new InjectionToken<UserRepositoryPort>('USER_REPOSITORY');
