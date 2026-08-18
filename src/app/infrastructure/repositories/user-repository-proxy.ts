import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@domain/entities/user';
import { UserRepositoryPort } from '@domain/ports/user-repository-port';
import { AdapterModeService } from '@application/adapters/adapter-mode.service';
import { UserMockRepository } from './user-mock-repository';
import { UserHttpRepository } from './user-http-repository';

@Injectable()
export class UserRepositoryProxy implements UserRepositoryPort {
  private readonly mode = inject(AdapterModeService);
  private readonly mockRepo = inject(UserMockRepository);
  private readonly httpRepo = inject(UserHttpRepository);

  private get repo(): UserRepositoryPort {
    return this.mode.getValue() === 'mock' ? this.mockRepo : this.httpRepo;
  }

  findAll(): Observable<User[]> {
    return this.repo.findAll();
  }

  findById(id: number): Observable<User | null> {
    return this.repo.findById(id);
  }

  create(user: User): Observable<User> {
    return this.repo.create(user);
  }

  update(user: User): Observable<User> {
    return this.repo.update(user);
  }

  delete(id: number): Observable<void> {
    return this.repo.delete(id);
  }
}
