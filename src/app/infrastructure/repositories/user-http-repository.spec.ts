import { describe, it, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { UserHttpRepository } from './user-http-repository';
import { HttpApiService } from '@infrastructure/http/http-api-service';
import { User } from '@domain/entities/user';
import { UsersResponseDto, UserDto } from '@infrastructure/dto/user-response-dto';

describe('UserHttpRepository', () => {
  const dummyDto: UserDto = {
    id: 1,
    firstName: 'HttpFirst',
    lastName: 'HttpLast',
    email: 'http@example.com',
  };

  const usersResponse: UsersResponseDto = {
    users: [dummyDto],
    total: 1,
    skip: 0,
    limit: 10,
  };

  it('findAll should map UsersResponseDto to User[] domain entities', async () => {
    const mockHttpApi = {
      get: vi.fn(() => of(usersResponse)),
    } as unknown as HttpApiService;

    const repo = new UserHttpRepository(mockHttpApi);

    const users = await new Promise<User[]>((resolve) => {
      repo.findAll().subscribe(resolve);
    });

    expect(users).toHaveLength(1);
    expect(users[0]).toBeInstanceOf(User);
    expect(users[0].firstname).toBe('HttpFirst');
    expect(users[0].fullName).toBe('HttpFirst HttpLast');
  });

  it('findById should map UserDto to User entity and return null if not found', async () => {
    const mockHttpApi = {
      get: vi.fn((url: string) => {
        if (url === '/users/1') return of(dummyDto);
        return throwError(() => new Error('Not found'));
      }),
    } as unknown as HttpApiService;

    const repo = new UserHttpRepository(mockHttpApi);

    const user = await new Promise<User | null>((resolve) => {
      repo.findById(1).subscribe(resolve);
    });
    expect(user?.firstname).toBe('HttpFirst');

    const notFound = await new Promise<User | null>((resolve) => {
      repo.findById(999).subscribe(resolve);
    });
    expect(notFound).toBeNull();
  });

  it('create should convert User to UserDto and map response back to User', async () => {
    const mockHttpApi = {
      post: vi.fn((url: string, body: unknown) => of(body as UserDto)),
    } as unknown as HttpApiService;

    const repo = new UserHttpRepository(mockHttpApi);
    const domainUser = new User({ id: 5, firstname: 'CreatedFirst', lastname: 'CreatedLast' });

    const created = await new Promise<User>((resolve) => {
      repo.create(domainUser).subscribe(resolve);
    });

    expect(created).toBeInstanceOf(User);
    expect(created.firstname).toBe('CreatedFirst');
    expect(mockHttpApi.post).toHaveBeenCalledWith('/users/add', {
      id: 5,
      firstName: 'CreatedFirst',
      lastName: 'CreatedLast',
      email: '',
    });
  });
});
