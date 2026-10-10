import { describe, it, expect } from 'vitest';
import { User } from './user';
import { InvalidUserException } from '@domain/exceptions/domain-exception';

describe('User Entity', () => {
  it('should create a valid user instance', () => {
    const user = new User({
      id: 1,
      firstname: 'Alice',
      lastname: 'Smith',
      email: 'alice@example.com',
    });

    expect(user.id).toBe(1);
    expect(user.firstname).toBe('Alice');
    expect(user.lastname).toBe('Smith');
    expect(user.email).toBe('alice@example.com');
    expect(user.fullName).toBe('Alice Smith');
    expect(user.hasEmail()).toBe(true);
  });

  it('should format fullName correctly when lastname is not provided', () => {
    const user = new User({
      id: 2,
      firstname: 'Bob',
    });

    expect(user.fullName).toBe('Bob');
    expect(user.lastname).toBeUndefined();
    expect(user.hasEmail()).toBe(false);
  });

  it('should throw InvalidUserException if firstname is empty or whitespace', () => {
    expect(() => new User({ id: 3, firstname: '' })).toThrow(InvalidUserException);
    expect(() => new User({ id: 3, firstname: '   ' })).toThrow(InvalidUserException);
  });

  it('should trim firstname and optional fields', () => {
    const user = new User({
      id: 4,
      firstname: '  Charlie  ',
      lastname: '  Brown  ',
      email: '  charlie@example.com  ',
    });

    expect(user.firstname).toBe('Charlie');
    expect(user.lastname).toBe('Brown');
    expect(user.email).toBe('charlie@example.com');
  });

  it('should return a new user instance on withUpdatedInfo without mutating original', () => {
    const original = new User({
      id: 5,
      firstname: 'Diana',
      lastname: 'Prince',
    });

    const updated = original.withUpdatedInfo({ firstname: 'Wonder', lastname: 'Woman' });

    expect(original.firstname).toBe('Diana');
    expect(updated.id).toBe(5);
    expect(updated.firstname).toBe('Wonder');
    expect(updated.lastname).toBe('Woman');
  });
});
