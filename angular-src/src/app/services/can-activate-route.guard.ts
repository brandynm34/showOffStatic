import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JRLoginService } from '../services/jr-login-service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private auth: JRLoginService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log('from canAuth', this.auth.getAuth())
    if(this.auth.getAuth()) {
        return true;
    } else {
    this.router.navigate(['landing']);
    return false;
    }

  }

}
