import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * 公用存取cookie方法
 */

export class CookieService {

  constructor() {
  }

  static regExp(name: string): RegExp {
    name = encodeURIComponent(name);
    return new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
  }

  static check(name: string): boolean { // 检测是否含有名字为name的cookie
    if (typeof document === 'undefined') {
      return false;
    }
    const regexp = CookieService.regExp(name);
    return regexp.test(document.cookie);
  }

  static get(name: string): string { // 获取名字为name的cookie
    if (CookieService.check(name)) {
      const regexp = CookieService.regExp(name);
      return decodeURIComponent(regexp.exec(document.cookie)[1]);
    } else {
      return null;
    }
  }

  static getAll(): object { // 获取所有cookie，以键值对形式返回
    const cookies: any = {};
    if (document.cookie) {
      const split = document.cookie.split(';');
      for (const s of split) {
        const currCookie = s.split('=');
        currCookie[0] = currCookie[0].replace(/^ /, '');
        cookies[decodeURIComponent(currCookie[0])] = decodeURIComponent(currCookie[1]);
      }
    }
    return cookies;
  }

  static set(name: string, value: string, expires?: Date, path?: string, domain?: string, secure?: boolean): void { // 设置cookie
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;
    if (expires) {
      cookie += `expires=${expires.toUTCString()};`;
    }
    if (path) {
      cookie += `path=${path};`;
    }
    if (domain) {
      cookie += `domain=${domain};`;
    }
    if (secure) {
      cookie += `secure=${secure};`;
    }
    document.cookie = cookie;
  }

  static delete(name: string): void { // 删除cookie
    CookieService.set(name, '');
  }

  static deleteAll(): void {  // 删除所有cookie
    const cookies = document.cookie.split(';').map((item: string) => {
      return item.split('=')[0];
    });
    cookies.forEach((item: string) => {
      CookieService.delete(item);
    });
  }
}
