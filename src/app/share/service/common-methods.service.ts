import {Injectable} from '@angular/core';
import {isArray} from 'util';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {

  constructor() {
  }

  /**
   * 数字不足10的开头补0
   */
  static fillZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
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
  getDateToTime(date: Date): string {
    const year = date.getFullYear();
    const month = CommonMethodsService.fillZero(date.getMonth() + 1);
    const day = CommonMethodsService.fillZero(date.getDate());
    const hours = CommonMethodsService.fillZero(date.getHours());
    const minutes = CommonMethodsService.fillZero(date.getMinutes());
    const seconds = CommonMethodsService.fillZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  /**
   * 日期转换成 YYYY-MM-DD
   */
  getDateToDay(date: Date): string {
    const year = date.getFullYear();
    const month = CommonMethodsService.fillZero(date.getMonth() + 1);
    const day = CommonMethodsService.fillZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  /**
   * 日期转换成 YYYY-MM-DD 00:00:00 或者 YYYY-MM-DD 23:59:59
   */
  getDay(date: Date, type: 0 | 1): string {
    const year = date.getFullYear();
    const month = CommonMethodsService.fillZero(date.getMonth() + 1);
    const day = CommonMethodsService.fillZero(date.getDate());
    return type ? `${year}-${month}-${day} 00:00:00` : `${year}-${month}-${day} 23:59:59`;
  }
}
