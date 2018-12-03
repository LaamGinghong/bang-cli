import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class CommonRouteReuse implements RouteReuseStrategy {

  public static handlers: { [key: string]: DetachedRouteHandle } = {};

  private static waitDelete: string;

  public static deleteRouteSnapshot(name: string): void {
    const url = name.split('/').join('_');
    if (CommonRouteReuse.handlers[url]) {
      CommonRouteReuse.handlers[url]['componentRef'].destroy();
      delete CommonRouteReuse.handlers[url];
    } else {
      CommonRouteReuse.waitDelete = url;
    }
  }

  public static getRouteUrl(route: ActivatedRouteSnapshot) {
    return route['_routerState'].url.replace(/\//g, '_');
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig) {
      return null;
    }

    return CommonRouteReuse.handlers[CommonRouteReuse.getRouteUrl(route)];
  }

  /** 若 path 在缓存中有的都认为允许还原路由 */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!CommonRouteReuse.handlers[CommonRouteReuse.getRouteUrl(route)];
  }

  /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !route.data.clear;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params);
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (CommonRouteReuse.waitDelete && CommonRouteReuse.waitDelete === CommonRouteReuse.getRouteUrl(route)) {
      // 如果待删除是当前路由则不存储快照
      handle['componentRef'].destroy();
      CommonRouteReuse.waitDelete = null;
      return;
    }
    CommonRouteReuse.handlers[CommonRouteReuse.getRouteUrl(route)] = handle;
  }
}
