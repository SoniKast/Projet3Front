import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = localStorage.getItem('jwt');

  if (jwt != null && !req.url.includes('/connexion')) {
    const requeteAvecJwt = req.clone({
      setHeaders: { Authorization: 'Bearer ' + jwt },
    });

    return next(requeteAvecJwt);
  }

  return next(req);
};
