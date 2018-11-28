import {Injectable} from '@angular/core';
import {ApiUrl} from '../api-url';
import {API_ROOT} from '../constant';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: ApiUrl;

  constructor() {
  }

  getConfig(key: string): string {
    return this.config[key];
  }

  load(): ApiUrl {
    this.config = API_ROOT;
    return this.config;
  }
}
