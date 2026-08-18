import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GetUsersUseCase } from '@application/use-cases/get-users-use-case';
import { GetUserByIdUseCase } from '@application/use-cases/get-user-by-id-use-case';
import { CreateUserUseCase } from '@application/use-cases/create-user-use-case';
import { Button } from '@shared/ui/button/button';
import { User } from '@domain/entities/user';
import { DeleteUserUseCase } from '@application/use-cases/delete-user-use-case';
import { UpdateUserUseCase } from '@application/use-cases/update-user-use-case';
import { AdapterModeService } from '@application/adapters/adapter-mode.service';
import { TranslationService } from '@presentation/i18n/translation.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './services.html',
})
export class Services {
  protected readonly i18n = inject(TranslationService);
  private readonly adapterModeService = inject(AdapterModeService);

  private readonly getUsersUseCase = inject(GetUsersUseCase);
  private readonly getUserByIdUseCase = inject(GetUserByIdUseCase);
  private readonly createUserUseCase = inject(CreateUserUseCase);
  private readonly updateUserUseCase = inject(UpdateUserUseCase);
  private readonly deleteUserUseCase = inject(DeleteUserUseCase);

  mock = { getAll: true, getById: true, create: true, update: true, delete: true };

  getAll = signal({ loading: false, error: '', result: null as User[] | null });
  getById = signal({ id: 0, loading: false, error: '', result: null as User | null });
  create = signal({ firstname: '', loading: false, error: '', result: null as User | null });
  update = signal({
    id: 0,
    loading: false,
    error: '',
    firstname: '',
    result: null as User | null,
  });
  delete = signal({ id: 0, loading: false, error: '', result: '' });

  runGetAll() {
    this.adapterModeService.set(this.mock.getAll ? 'mock' : 'http');

    this.getAll.update((state) => ({ ...state, loading: true, error: '', result: null }));

    this.getUsersUseCase.execute().subscribe({
      next: (res) => {
        this.getAll.update((state) => ({ ...state, loading: false, result: res }));
      },
      error: (err) => {
        this.getAll.update((state) => ({ ...state, loading: false, error: err.error }));
      },
    });
  }

  runGetById() {
    this.adapterModeService.set(this.mock.getById ? 'mock' : 'http');

    this.getById.update((state) => ({ ...state, loading: true, error: '', result: null }));

    if (!this.getById().id) {
      this.getById.update((state) => ({ ...state, loading: false, error: 'Provide an id' }));
      return;
    }

    this.getUserByIdUseCase.execute(this.getById().id).subscribe({
      next: (res) => {
        this.getById.update((state) => ({ ...state, loading: false, result: res }));
      },
      error: (err) => {
        this.getById.update((state) => ({ ...state, loading: false, error: err.error }));
      },
    });
  }

  runCreate() {
    this.adapterModeService.set(this.mock.create ? 'mock' : 'http');

    this.create.update((state) => ({ ...state, loading: true, error: '', result: null }));

    try {
      const newUser = new User({
        id: Math.floor(Math.random() * 10000),
        firstname: this.create().firstname,
        lastname: 'Demo',
        email: `${(this.create().firstname || 'new').toLowerCase()}@example.com`,
      });

      this.createUserUseCase.execute(newUser).subscribe({
        next: (res) => {
          this.create.update((state) => ({ ...state, loading: false, result: res }));
        },
        error: (err) => {
          this.create.update((state) => ({ ...state, loading: false, error: err.error }));
        },
      });
    } catch (e: any) {
      this.create.update((state) => ({ ...state, loading: false, error: e?.message || e.error }));
    }
  }

  runUpdate() {
    this.adapterModeService.set(this.mock.create ? 'mock' : 'http');

    this.update.update((state) => ({ ...state, loading: true, error: '', result: null }));

    try {
      const newUser = new User({
        id: this.update().id,
        firstname: this.update().firstname,
      });
      this.updateUserUseCase.execute(newUser).subscribe({
        next: (res) => {
          this.update.update((state) => ({ ...state, loading: false, result: res }));
        },
        error: (err) => {
          this.update.update((state) => ({ ...state, loading: false, error: err.error }));
        },
      });
    } catch (e: any) {
      this.update.update((state) => ({ ...state, loading: false, error: e?.message || e.error }));
    }
  }

  runDelete() {
    this.adapterModeService.set(this.mock.create ? 'mock' : 'http');

    this.delete.update((state) => ({ ...state, loading: true, error: '', result: '' }));

    try {
      this.deleteUserUseCase.execute(this.delete().id).subscribe({
        next: () => {
          this.delete.update((state) => ({
            ...state,
            loading: false,
            result: `Removed user with id: ${this.delete().id}`,
          }));
        },
        error: (err) => {
          this.delete.update((state) => ({ ...state, loading: false, error: err.error }));
        },
      });
    } catch (e: any) {
      this.delete.update((state) => ({ ...state, loading: false, error: e?.message || e.error }));
    }
  }
}
