import { inject, InjectionToken, InjectOptions, Provider, Type } from '@angular/core';

export type InjectFn<T> = {
  (): T;
};

export type ProvideFn<T> = {
  (value: T): Provider;
  (deps: Array<Type<any>>, factory: (...args: any) => T): Provider;
};

export type InjectionTokenCreatorResult<T> = [
  InjectFn<T>,
  ProvideFn<T>,
  InjectionToken<T>
];

export function createInjectionToken<T>(description: string): InjectionTokenCreatorResult<T> {
  const token = new InjectionToken<T>(description);

  function injectFn(opt: InjectOptions = {}) {
    return inject(token, opt);
  }

  function provideFn(valueOrDeps: T | Array<Type<any>>, factory?: (...args: any[]) => T) {
    if (factory) {
      return { provide: token, useFactory: factory, deps: valueOrDeps as Array<Type<any>> };
    }
    return { provide: token, useValue: valueOrDeps as T };
  }

  return [injectFn as InjectFn<T>, provideFn, token];
}
