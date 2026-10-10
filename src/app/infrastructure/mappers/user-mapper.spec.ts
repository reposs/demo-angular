import { describe, it, expect } from 'vitest';
import { UserMapper } from './user-mapper';
import { User } from '@domain/entities/user';
import { UserDto } from '@infrastructure/dto/user-response-dto';

describe('UserMapper', () => {
  it('should map UserDto to User domain entity correctly', () => {
    const dto: UserDto = {
      id: 10,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
    };

    const user = UserMapper.toDomain(dto);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(10);
    expect(user.firstname).toBe('Jane');
    expect(user.lastname).toBe('Doe');
    expect(user.email).toBe('jane.doe@example.com');
    expect(user.fullName).toBe('Jane Doe');
  });

  it('should map User domain entity to UserDto correctly', () => {
    const user = new User({
      id: 20,
      firstname: 'Mark',
      lastname: 'Twain',
      email: 'mark@example.com',
    });

    const dto = UserMapper.toDto(user);

    expect(dto).toEqual({
      id: 20,
      firstName: 'Mark',
      lastName: 'Twain',
      email: 'mark@example.com',
    });
  });
});
