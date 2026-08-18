import { Injectable } from '@angular/core';
import { UserRepositoryPort } from '@domain/ports/user-repository-port';
import { User } from '@domain/entities/user';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable()
export class UserMockRepository implements UserRepositoryPort {
  private users: User[] = [
    new User({
      id: 1,
      firstname: 'Emily',
      lastname: 'Johnson',
      email: 'emily.johnson@example.com',
    }),
    new User({
      id: 2,
      firstname: 'Michael',
      lastname: 'Williams',
      email: 'michael.williams@example.com',
    }),
    new User({ id: 3, firstname: 'Sophia', lastname: 'Brown', email: 'sophia.brown@example.com' }),
  ];

  findAll(): Observable<User[]> {
    return of([...this.users]).pipe(delay(2000));
  }

  findById(id: number): Observable<User | null> {
    return of(this.users.find((user) => user.id === id) ?? null).pipe(delay(3000));
  }

  create(user: User): Observable<User> {
    this.users.push(user);

    return of(user).pipe(delay(3000));
  }

  update(user: User): Observable<User> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }

    const updatedUser = {
      ...this.users[index],
      ...(user.firstname !== undefined && { name: user.firstname }),
      ...(user.lastname !== undefined && { surname: user.lastname }),
      ...(user.email !== undefined && { email: user.email }),
    };

    return of(updatedUser as User).pipe(delay(3000));
  }

  delete(id: number): Observable<void> {
    this.users = this.users.filter((user) => user.id !== id);

    return of(void 0).pipe(delay(3000));
  }
}
