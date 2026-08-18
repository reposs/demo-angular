import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IGNORE_ERROR } from '@infrastructure/http/http-context-tokens';

export interface HttpApiOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  context?: HttpContext;
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  private readonly baseUrl = 'https://dummyjson.com';

  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-lang': 'en',
  });

  private defaultContext = new HttpContext();

  clearContext() {
    this.defaultContext = new HttpContext();
  }

  ignoreError() {
    this.defaultContext.set(IGNORE_ERROR, true);
  }

  constructor(private http: HttpClient) {}

  // ---- common options ----
  private buildOptions(options?: HttpApiOptions) {
    return {
      headers: options?.headers ?? this.defaultHeaders,
      params: options?.params,
      context: options?.context ?? this.defaultContext,
      withCredentials: options?.withCredentials,
    };
  }

  // ---- métodos HTTP ----
  get<T>(url: string, options?: HttpApiOptions): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${url}`, this.buildOptions(options))
      .pipe(finalize(() => this.clearContext()));
  }

  head<T>(url: string, options?: HttpApiOptions): Observable<T> {
    return this.http
      .head<T>(`${this.baseUrl}${url}`, this.buildOptions(options))
      .pipe(finalize(() => this.clearContext()));
  }

  post<T>(url: string, body: unknown, options?: HttpApiOptions): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${url}`, body, this.buildOptions(options))
      .pipe(finalize(() => this.clearContext()));
  }

  put<T>(url: string, body: unknown, options?: HttpApiOptions): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}${url}`, body, this.buildOptions(options))
      .pipe(finalize(() => this.clearContext()));
  }

  patch<T>(url: string, body: unknown, options?: HttpApiOptions): Observable<T> {
    return this.http
      .patch<T>(`${this.baseUrl}${url}`, body, this.buildOptions(options))
      .pipe(finalize(() => this.clearContext()));
  }

  delete<T>(url: string, options?: HttpApiOptions): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${url}`, this.buildOptions(options))
      .pipe(finalize(() => this.clearContext()));
  }
}
