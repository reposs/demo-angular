import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@domain/entities/user';
import { UserRepositoryPort } from '@domain/ports/user-repository-port';
import { USER_REPOSITORY } from '@application/tokens/user-repository-token';

@Injectable({
  providedIn: 'root',
})
export class GetUserByIdUseCase {
  private readonly userRepository: UserRepositoryPort;

  constructor(@Inject(USER_REPOSITORY) userRepository?: UserRepositoryPort) {
    this.userRepository = userRepository ?? inject(USER_REPOSITORY);
  }

  execute(id: number): Observable<User | null> {
    return this.userRepository.findById(id);
  }
}
