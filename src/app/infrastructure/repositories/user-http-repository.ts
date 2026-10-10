import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UserRepositoryPort } from '@domain/ports/user-repository-port';
import { User } from '@domain/entities/user';
import { HttpApiService } from '@infrastructure/http/http-api-service';
import { UserMapper } from '@infrastructure/mappers/user-mapper';
import { UserDto, UsersResponseDto } from '@infrastructure/dto/user-response-dto';

@Injectable({
  providedIn: 'root',
})
export class UserHttpRepository implements UserRepositoryPort {
  constructor(private readonly api: HttpApiService) {}

  findAll(): Observable<User[]> {
    return this.api
      .get<UsersResponseDto>('/users')
      .pipe(map((response) => response.users.map((dto) => UserMapper.toDomain(dto))));
  }

  findById(id: number): Observable<User | null> {
    return this.api.get<UserDto>(`/users/${id}`).pipe(
      map((dto) => (dto ? UserMapper.toDomain(dto) : null)),
      catchError(() => of(null)),
    );
  }

  create(user: User): Observable<User> {
    const payload = UserMapper.toDto(user);
    return this.api
      .post<UserDto>('/users/add', payload)
      .pipe(map((responseDto) => UserMapper.toDomain(responseDto)));
  }

  update(user: User): Observable<User> {
    const payload = UserMapper.toDto(user);
    return this.api
      .put<UserDto>(`/users/${user.id}`, payload)
      .pipe(map((responseDto) => UserMapper.toDomain(responseDto)));
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`/users/${id}`).pipe(map(() => void 0));
  }
}
