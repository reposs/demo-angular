import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideRouter([]),
        provideTranslateService({ fallbackLang: 'en', lang: 'en' }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create and initialize contact form', () => {
    expect(component).toBeTruthy();
    expect(component.form.valid).toBe(true);
  });

  it('should invalidate form when email format is incorrect', () => {
    component.form.controls.email.setValue('invalid-email');
    expect(component.form.controls.email.valid).toBe(false);
  });
});
