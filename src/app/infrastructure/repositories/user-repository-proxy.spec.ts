import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { UserRepositoryProxy } from './user-repository-proxy';
import { AdapterModeService } from '@infrastructure/adapters/adapter-mode.service';
import { UserMockRepository } from './user-mock-repository';
import { UserHttpRepository } from './user-http-repository';
import { User } from '@domain/entities/user';

describe('UserRepositoryProxy', () => {
  let proxy: UserRepositoryProxy;
  let adapterModeService: AdapterModeService;
  const mockUser = new User({ id: 1, firstname: 'MockUser' });
  const httpUser = new User({ id: 2, firstname: 'HttpUser' });

  const fakeMockRepo = {
    findAll: () => of([mockUser]),
    findById: () => of(mockUser),
    create: () => of(mockUser),
    update: () => of(mockUser),
    delete: () => of(void 0),
  };

  const fakeHttpRepo = {
    findAll: () => of([httpUser]),
    findById: () => of(httpUser),
    create: () => of(httpUser),
    update: () => of(httpUser),
    delete: () => of(void 0),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserRepositoryProxy,
        AdapterModeService,
        { provide: UserMockRepository, useValue: fakeMockRepo },
        { provide: UserHttpRepository, useValue: fakeHttpRepo },
      ],
    });

    proxy = TestBed.inject(UserRepositoryProxy);
    adapterModeService = TestBed.inject(AdapterModeService);
  });

  it('should delegate to mockRepo when adapter mode is "mock"', () => {
    adapterModeService.set('mock');

    proxy.findAll().subscribe((users) => {
      expect(users[0]).toBe(mockUser);
    });
  });

  it('should delegate to httpRepo when adapter mode is "http"', () => {
    adapterModeService.set('http');

    proxy.findAll().subscribe((users) => {
      expect(users[0]).toBe(httpUser);
    });
  });
});
