import { Component, inject, signal } from '@angular/core';
import { Button } from '@shared/ui/button/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { TranslationService } from '@presentation/i18n/translation.service';
import { ToastService } from '@shared/ui/toast/toast-service';

@Component({
  selector: 'app-contact',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly i18n = inject(TranslationService);
  protected readonly toast = inject(ToastService);

  loading = signal(false);

  form = new FormGroup({
    name: new FormControl<string>('demo', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('demo@dd.com', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl<string>('demo', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {}

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.loading.set(true);
    this.form.disable();

    // simulating call => timer(3000)
    timer(3000).subscribe(() => {
      this.loading.set(false);

      Math.floor(Math.random() * 2)
        ? this.toast.success(this.i18n.translateKey('contact.success'))
        : this.toast.error(this.i18n.translateKey('contact.error'));

      this.form.enable();
      this.form.reset();
    });
  }
}
