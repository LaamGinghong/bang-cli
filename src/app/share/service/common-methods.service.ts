import {Injectable} from '@angular/core';
import {isArray} from 'util';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {

  constructor() {
  }

  /**
   * 判断字符串是否为空、全为空格、数组长度为0
   */
  isNull(value: string | Array<any>): boolean {
    if (!value) {
      return true;
    }
    if (isArray(value)) {
      if (value.length === 0) {
        return true;
      }
    } else {
      const reg = new RegExp('^[ ]+$');
      return reg.test(value);
    }
  }

  /**
   * 日期转换成 YYYY-MM-DD hh:mm:ss
   */
  getDateTime(date: Date): string {
    return ``;
  }
}
