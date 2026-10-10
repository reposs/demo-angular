import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IGNORE_ERROR } from '@infrastructure/http/http-context-tokens';

export interface HttpApiOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  context?: HttpContext;
  withCredentials?: boolean;
  ignoreError?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  private readonly baseUrl = 'https://dummyjson.com';

  private readonly defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-lang': 'en',
  });

  constructor(private readonly http: HttpClient) {}

  private buildOptions(options?: HttpApiOptions) {
    let context = options?.context;
    if (options?.ignoreError) {
      context = (context ?? new HttpContext()).set(IGNORE_ERROR, true);
    }

    return {
      headers: options?.headers ?? this.defaultHeaders,
      params: options?.params,
      context: context ?? new HttpContext(),
      withCredentials: options?.withCredentials,
    };
  }

  get<T>(url: string, options?: HttpApiOptions): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, this.buildOptions(options));
  }

  head<T>(url: string, options?: HttpApiOptions): Observable<T> {
    return this.http.head<T>(`${this.baseUrl}${url}`, this.buildOptions(options));
  }

  post<T>(url: string, body: unknown, options?: HttpApiOptions): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, this.buildOptions(options));
  }

  put<T>(url: string, body: unknown, options?: HttpApiOptions): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, body, this.buildOptions(options));
  }

  patch<T>(url: string, body: unknown, options?: HttpApiOptions): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${url}`, body, this.buildOptions(options));
  }

  delete<T>(url: string, options?: HttpApiOptions): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${url}`, this.buildOptions(options));
  }
}
