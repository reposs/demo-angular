import { HttpContextToken } from '@angular/common/http';

export const IGNORE_ERROR = new HttpContextToken<boolean>(() => false);
