import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GetUsersUseCase } from '@application/use-cases/get-users-use-case';
import { GetUserByIdUseCase } from '@application/use-cases/get-user-by-id-use-case';
import { CreateUserUseCase } from '@application/use-cases/create-user-use-case';
import { UpdateUserUseCase } from '@application/use-cases/update-user-use-case';
import { DeleteUserUseCase } from '@application/use-cases/delete-user-use-case';
import { Button } from '@shared/ui/button/button';
import { User } from '@domain/entities/user';
import { AdapterModeService } from '@infrastructure/adapters/adapter-mode.service';
import { TranslationService } from '@presentation/i18n/translation.service';

@Component({
  selector: 'app-services',
  imports: [JsonPipe, NgTemplateOutlet, FormsModule, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
})
export class Services {
  protected readonly i18n = inject(TranslationService);
  private readonly adapterModeService = inject(AdapterModeService);
  private readonly destroyRef = inject(DestroyRef);

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

  private extractErrorMessage(err: unknown): string {
    if (!err) return 'Unknown error';
    if (typeof err === 'string') return err;
    const anyErr = err as { message?: string; error?: { message?: string } | string };
    if (typeof anyErr.error === 'string') return anyErr.error;
    if (anyErr.error?.message) return anyErr.error.message;
    if (anyErr.message) return anyErr.message;
    return 'Operation failed';
  }

  runGetAll() {
    this.adapterModeService.set(this.mock.getAll ? 'mock' : 'http');
    this.getAll.update((state) => ({ ...state, loading: true, error: '', result: null }));

    this.getUsersUseCase
      .execute()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.getAll.update((state) => ({ ...state, loading: false, result: res }));
        },
        error: (err) => {
          this.getAll.update((state) => ({ ...state, loading: false, error: this.extractErrorMessage(err) }));
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

    this.getUserByIdUseCase
      .execute(this.getById().id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.getById.update((state) => ({ ...state, loading: false, result: res }));
        },
        error: (err) => {
          this.getById.update((state) => ({ ...state, loading: false, error: this.extractErrorMessage(err) }));
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

      this.createUserUseCase
        .execute(newUser)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this.create.update((state) => ({ ...state, loading: false, result: res }));
          },
          error: (err) => {
            this.create.update((state) => ({ ...state, loading: false, error: this.extractErrorMessage(err) }));
          },
        });
    } catch (e: unknown) {
      this.create.update((state) => ({ ...state, loading: false, error: this.extractErrorMessage(e) }));
    }
  }

  runUpdate() {
    this.adapterModeService.set(this.mock.update ? 'mock' : 'http');
    this.update.update((state) => ({ ...state, loading: true, error: '', result: null }));

    try {
      const newUser = new User({
        id: this.update().id,
        firstname: this.update().firstname,
      });

      this.updateUserUseCase
        .execute(newUser)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this.update.update((state) => ({ ...state, loading: false, result: res }));
          },
          error: (err) => {
            this.update.update((state) => ({ ...state, loading: false, error: this.extractErrorMessage(err) }));
          },
        });
    } catch (e: unknown) {
      this.update.update((state) => ({ ...state, loading: false, error: this.extractErrorMessage(e) }));
    }
  }

  runDelete() {
    this.adapterModeService.set(this.mock.delete ? 'mock' : 'http');
    this.delete.update((state) => ({ ...state, loading: true, error: '', result: '' }));

    try {
      this.deleteUserUseCase
        .execute(this.delete().id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.delete.update((state) => ({
              ...state,
              loading: false,
              result: `Removed user with id: ${this.delete().id}`,
            }));
          },
          error: (err) => {
            this.delete.update((state) => ({ ...state, loading: false, error: this.extractErrorMessage(err) }));
          },
        });
    } catch (e: unknown) {
      this.delete.update((state) => ({ ...state, loading: false, error: this.extractErrorMessage(e) }));
    }
  }
}
