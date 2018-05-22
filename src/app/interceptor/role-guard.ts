import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.role;
    var userData = JSON.parse(sessionStorage.getItem("User"));

    if (userData == undefined) {
      this.router.navigate(['login'], { skipLocationChange: true });
      return false;
    }
    else if (userData.role) {
      var counter = 0;
      userData.role.forEach(role => {
        if (expectedRole.some(r => { return role.toUpperCase() == r.toUpperCase() }) == true)
          counter += 1;
      });

      if (counter == 0) {
        this.router.navigate(['unauthorized'], { skipLocationChange: true });
        return false;
      }
      else
        return true;
    }
    else {
      this.router.navigate(['unauthorized'], { skipLocationChange: true });
      return false;
    }
  }
}