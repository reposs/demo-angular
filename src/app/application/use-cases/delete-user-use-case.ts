import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UserRepositoryPort } from '@domain/ports/user-repository-port';
import { USER_REPOSITORY } from '@application/tokens/user-repository-token';

@Injectable({
  providedIn: 'root',
})
export class DeleteUserUseCase {
  private readonly userRepository = inject<UserRepositoryPort>(USER_REPOSITORY);

  execute(id: number): Observable<void> {
    return this.userRepository.delete(id);
  }
}
