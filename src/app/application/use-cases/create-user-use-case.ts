import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@domain/entities/user';
import { UserRepositoryPort } from '@domain/ports/user-repository-port';
import { USER_REPOSITORY } from '@application/tokens/user-repository-token';

@Injectable({
  providedIn: 'root',
})
export class CreateUserUseCase {
  private readonly userRepository = inject<UserRepositoryPort>(USER_REPOSITORY);

  execute(user: User): Observable<User> {
    return this.userRepository.create(user);
  }
}
