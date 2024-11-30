import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SharedService } from '../shared/shared.service';
import { CookieService } from 'ngx-cookie-service';

import { jwtDecode } from 'jwt-decode';

import { Token } from '../interfaces/token';

export const authGuard: CanActivateFn = (route, state) => {
  const sharedService = inject(SharedService);
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const user = sharedService.getSession();
  let token = cookieService.get('Authorization');

  if (user && token) {
    token = token.replace('Bearer ', '');
    const decodedToken: Token = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentDate = new Date().getTime();

    if (expirationDate < currentDate) {
      router.navigate(['login']);
      return false;
    }

    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
