import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {RoutingGuards} from './routing-guards';
import {CookieService} from '../../share/service/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingGuardService implements CanActivate {

  constructor(
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // 返回值 true: 跳转到当前路由 false: 不跳转到当前路由
    // 当前路由名称
    const path = route.routeConfig.path;
    // 需要守卫的路由地址
    const routingGuards = RoutingGuards;
    const isLogin = !!CookieService.get('WSP_JSESSIONID');
    if (routingGuards.indexOf(path) >= 0) {
      if (!isLogin) {
        this.router.navigateByUrl('/pages/login');
        return false;
      } else {
        return true;
      }
    }

    if (path === 'login') {
      return !isLogin;
    }
  }
}
