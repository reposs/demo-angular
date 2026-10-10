import { Injectable } from '@angular/core';
import { UserRepositoryPort } from '@domain/ports/user-repository-port';
import { User } from '@domain/entities/user';
import { delay, Observable, of, throwError } from 'rxjs';
import { UserNotFoundException } from '@domain/exceptions/domain-exception';

@Injectable({
  providedIn: 'root',
})
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
    new User({
      id: 3,
      firstname: 'Sophia',
      lastname: 'Brown',
      email: 'sophia.brown@example.com',
    }),
  ];

  findAll(): Observable<User[]> {
    return of([...this.users]).pipe(delay(200));
  }

  findById(id: number): Observable<User | null> {
    const found = this.users.find((user) => user.id === id) ?? null;
    return of(found).pipe(delay(200));
  }

  create(user: User): Observable<User> {
    this.users = [...this.users, user];
    return of(user).pipe(delay(200));
  }

  update(user: User): Observable<User> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      return throwError(() => new UserNotFoundException(user.id));
    }

    const current = this.users[index];
    const updated = current.withUpdatedInfo({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });

    this.users = [
      ...this.users.slice(0, index),
      updated,
      ...this.users.slice(index + 1),
    ];

    return of(updated).pipe(delay(200));
  }

  delete(id: number): Observable<void> {
    this.users = this.users.filter((user) => user.id !== id);
    return of(void 0).pipe(delay(200));
  }
}
