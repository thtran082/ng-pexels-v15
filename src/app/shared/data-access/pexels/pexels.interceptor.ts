import { HttpInterceptorFn } from '@angular/common/http';
import { injectAppConfig } from '../../config/config.di';

export const pexelsInterceptor: HttpInterceptorFn = (req, next) => {
  const { pexels: { apiKey } } = injectAppConfig();
  if (!apiKey) return next(req);
  return next(req.clone({ setHeaders: { Authorization: apiKey } }));
};
