import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';

export const adminGuard: CanActivateFn = () => {
  const sesion = inject(SesionService);
  const router = inject(Router);

  if (!sesion.estaLogueado()) {
    router.navigate(['/login']);
    return false;
  }

  if (sesion.esAdmin()) {
    return true;
  }

  router.navigate(['/tienda']);
  return false;
};
