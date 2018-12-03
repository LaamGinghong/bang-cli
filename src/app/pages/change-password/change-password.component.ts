import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {ChangePasswordService} from './change-password.service';
import {CookieService} from '../../share/service/cookie.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  validateForm: FormGroup;
  changingStatus = false;

  constructor(
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private changePasswordService: ChangePasswordService,
    private notification: NzNotificationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]]
    });
  }

  confirm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    for (const i in this.validateForm.value) {
      if (this.validateForm.value.hasOwnProperty(i)) {
        if (!this.validateForm.value[i]) {
          return;
        }
      }
    }
    if (this.validateForm.value.newPassword !== this.validateForm.value.passwordConfirm) {
      this.message.error('两次输入的密码不一致，请重新输入！');
      return;
    }
    const option = {
      oldpwd: this.validateForm.value.oldPassword,
      newPwd: this.validateForm.value.newPassword
    };
    this.changingStatus = true;
    this.changePasswordService.changePassword(option).subscribe((result: { success: boolean, result: boolean }) => {
      if (result.success) {
        if (result.result) {
          this.notification.success('修改', '成功！');
          CookieService.delete('WSP_JSESSIONID');
          this.router.navigateByUrl('/pages/login');
        }
      }
      this.changingStatus = false;
    });
  }

  reset(e: MouseEvent): void {
    e.preventDefault();
  }
}
