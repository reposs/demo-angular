import { describe, it, expect } from 'vitest';
import { UserMockRepository } from './user-mock-repository';
import { User } from '@domain/entities/user';
import { UserNotFoundException } from '@domain/exceptions/domain-exception';

describe('UserMockRepository', () => {
  it('should list all initial users', async () => {
    const repo = new UserMockRepository();
    const users = await new Promise<User[]>((resolve) => {
      repo.findAll().subscribe(resolve);
    });

    expect(users.length).toBe(3);
    expect(users[0].firstname).toBe('Emily');
  });

  it('should find user by id if exists, or null if not', async () => {
    const repo = new UserMockRepository();
    const user = await new Promise<User | null>((resolve) => {
      repo.findById(1).subscribe(resolve);
    });
    expect(user?.firstname).toBe('Emily');

    const notFound = await new Promise<User | null>((resolve) => {
      repo.findById(999).subscribe(resolve);
    });
    expect(notFound).toBeNull();
  });

  it('should create and append a new user', async () => {
    const repo = new UserMockRepository();
    const newUser = new User({ id: 99, firstname: 'NewUser', lastname: 'Test' });

    const created = await new Promise<User>((resolve) => {
      repo.create(newUser).subscribe(resolve);
    });
    expect(created.id).toBe(99);

    const all = await new Promise<User[]>((resolve) => {
      repo.findAll().subscribe(resolve);
    });
    expect(all.length).toBe(4);
    expect(all.some((u) => u.id === 99)).toBe(true);
  });

  it('should properly update existing user information and state', async () => {
    const repo = new UserMockRepository();
    const updatePayload = new User({
      id: 1,
      firstname: 'EmilyUpdated',
      lastname: 'JohnsonUpdated',
    });

    const updated = await new Promise<User>((resolve) => {
      repo.update(updatePayload).subscribe(resolve);
    });

    expect(updated.firstname).toBe('EmilyUpdated');
    expect(updated.lastname).toBe('JohnsonUpdated');

    const fetched = await new Promise<User | null>((resolve) => {
      repo.findById(1).subscribe(resolve);
    });
    expect(fetched?.firstname).toBe('EmilyUpdated');
  });

  it('should throw UserNotFoundException when updating non-existent user', async () => {
    const repo = new UserMockRepository();
    const ghost = new User({ id: 9999, firstname: 'Ghost' });

    await expect(
      new Promise((resolve, reject) => {
        repo.update(ghost).subscribe({ next: resolve, error: reject });
      })
    ).rejects.toThrow(UserNotFoundException);
  });

  it('should delete an existing user', async () => {
    const repo = new UserMockRepository();
    await new Promise<void>((resolve) => {
      repo.delete(1).subscribe(resolve);
    });

    const fetched = await new Promise<User | null>((resolve) => {
      repo.findById(1).subscribe(resolve);
    });
    expect(fetched).toBeNull();
  });
});
