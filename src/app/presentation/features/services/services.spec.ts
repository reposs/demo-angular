import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { Services } from './services';
import { UserMockRepository } from '@infrastructure/repositories/user-mock-repository';
import { USER_REPOSITORY } from '@application/tokens/user-repository-token';

describe('Services', () => {
  let component: Services;
  let fixture: ComponentFixture<Services>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Services],
      providers: [
        provideRouter([]),
        provideTranslateService({ fallbackLang: 'en', lang: 'en' }),
        UserMockRepository,
        {
          provide: USER_REPOSITORY,
          useExisting: UserMockRepository,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Services);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with mock mode enabled', () => {
    expect(component.mock.getAll).toBe(true);
    expect(component.mock.getById).toBe(true);
    expect(component.mock.create).toBe(true);
    expect(component.mock.update).toBe(true);
    expect(component.mock.delete).toBe(true);
  });
});
