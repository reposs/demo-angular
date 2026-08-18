import { UserRepositoryPort } from '@domain/ports/user-repository-port';
import { map, Observable } from 'rxjs';
import { User } from '@domain/entities/user';
import { HttpApiService } from '@infrastructure/http/http-api-service';
import { Injectable } from '@angular/core';
import { UserMapper } from '@infrastructure/mappers/user-mapper';
import { UsersResponseDto } from '@infrastructure/dto/user-response-dto';

@Injectable()
export class UserHttpRepository implements UserRepositoryPort {
  constructor(private readonly api: HttpApiService) {}

  findAll(): Observable<User[]> {
    return this.api
      .get<UsersResponseDto>('/users')
      .pipe(map((response) => response.users.map((user) => UserMapper.toDomain(user))));
  }

  findById(id: number): Observable<User | null> {
    return this.api.get<User>(`/users/${id}`);
  }

  create(user: User): Observable<User> {
    return this.api.post<User>('/users/add', user);
  }

  update(user: User): Observable<User> {
    return this.api.put<User>(`/users/${user.id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`/users/${id}`);
  }
}
