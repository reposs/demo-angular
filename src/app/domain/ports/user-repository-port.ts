import { Observable } from 'rxjs';
import { User } from '@domain/entities/user';

export interface UserRepositoryPort {
  findAll(): Observable<User[]>;
  findById(id: number): Observable<User | null>;
  create(user: User): Observable<User>;
  update(user: User): Observable<User>;
  delete(id: number): Observable<void>;
}
