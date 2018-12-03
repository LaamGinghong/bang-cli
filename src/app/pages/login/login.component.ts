import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {CookieService} from '../../share/service/cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  loginLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberUserName: [true],
      rememberPassword: [true]
    });
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo.rememberUserName) {
      this.validateForm.patchValue({
        userName: userInfo.userName
      });
    }
    if (userInfo.rememberPassword) {
      this.validateForm.patchValue({
        password: userInfo.password
      });
    }
  }

  login(): void {
    this.router.navigateByUrl('/pages/content');
    /*for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    for (const i in this.validateForm.value) {
      if (this.validateForm.value.hasOwnProperty(i)) {
        if (i !== 'rememberUserName' && i !== 'rememberPassword') {
          if (!this.validateForm.value[i]) {
            return;
          }
        }
      }
    }
    const option = {
      username: this.validateForm.value.userName,
      password: this.validateForm.value.password,
      rememberUserName: this.validateForm.value.rememberUserName,
      rememberPassword: this.validateForm.value.rememberPassword
    };
    this.loginLoading = true;
    this.loginService.login(option).subscribe((result: { success: boolean, result: boolean }) => {
      if (result.success) {
        if (result.result) {
          this.notification.success('登录', '成功！');
          localStorage.setItem('userInfo', JSON.stringify(option));
          CookieService.set('WSP_JSESSIONID', option.username);
          this.router.navigateByUrl('/pages/content');
        }
      }
      this.loginLoading = false;
    });*/
  }
}
