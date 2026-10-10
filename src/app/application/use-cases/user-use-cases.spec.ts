import { describe, it, expect, vi } from 'vitest';
import { of } from 'rxjs';
import { User } from '@domain/entities/user';
import { UserRepositoryPort } from '@domain/ports/user-repository-port';
import { GetUsersUseCase } from './get-users-use-case';
import { GetUserByIdUseCase } from './get-user-by-id-use-case';
import { CreateUserUseCase } from './create-user-use-case';
import { UpdateUserUseCase } from './update-user-use-case';
import { DeleteUserUseCase } from './delete-user-use-case';

describe('Application User Use Cases', () => {
  const dummyUser = new User({
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@example.com',
  });

  const mockRepo: UserRepositoryPort = {
    findAll: vi.fn(() => of([dummyUser])),
    findById: vi.fn((id: number) => of(id === 1 ? dummyUser : null)),
    create: vi.fn((user: User) => of(user)),
    update: vi.fn((user: User) => of(user)),
    delete: vi.fn(() => of(void 0)),
  };

  it('GetUsersUseCase should call findAll and return users', async () => {
    const useCase = new GetUsersUseCase(mockRepo);
    let result: User[] | undefined;

    useCase.execute().subscribe((users) => {
      result = users;
    });

    expect(mockRepo.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result?.[0].firstname).toBe('John');
  });

  it('GetUserByIdUseCase should call findById with correct id', () => {
    const useCase = new GetUserByIdUseCase(mockRepo);
    let result: User | null | undefined;

    useCase.execute(1).subscribe((user) => {
      result = user;
    });

    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(result?.fullName).toBe('John Doe');
  });

  it('CreateUserUseCase should call create with given user', () => {
    const useCase = new CreateUserUseCase(mockRepo);
    let result: User | undefined;

    useCase.execute(dummyUser).subscribe((user) => {
      result = user;
    });

    expect(mockRepo.create).toHaveBeenCalledWith(dummyUser);
    expect(result).toBe(dummyUser);
  });

  it('UpdateUserUseCase should call update with given user', () => {
    const useCase = new UpdateUserUseCase(mockRepo);
    let result: User | undefined;

    useCase.execute(dummyUser).subscribe((user) => {
      result = user;
    });

    expect(mockRepo.update).toHaveBeenCalledWith(dummyUser);
    expect(result).toBe(dummyUser);
  });

  it('DeleteUserUseCase should call delete with user id', () => {
    const useCase = new DeleteUserUseCase(mockRepo);
    let finished = false;

    useCase.execute(1).subscribe(() => {
      finished = true;
    });

    expect(mockRepo.delete).toHaveBeenCalledWith(1);
    expect(finished).toBe(true);
  });
});
