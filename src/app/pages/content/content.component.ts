import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ContentService} from './content.service';
import {Router} from '@angular/router';
import {CommonRouteReuse} from '../../core/common-route-reuse';
import {NzNotificationService} from 'ng-zorro-antd';
import Timer = NodeJS.Timer;
import {CookieService} from '../../share/service/cookie.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  userName: string;
  isCollapsed = false; // 侧边栏缩放
  menuData = []; // 菜单栏
  tabs: Array<object> = [{
    menuName: '首页',
    url: '/pages/home',
    breadcrumb: ['首页'],
    selected: true
  }]; // tab栏
  breadcrumb = ['首页']; // 面包屑
  headerWidth = document.body.offsetWidth - 200; // 头部长度
  showTabButton = false; // 左右移动按钮显示
  tabMoveInstance = 0; // 左右移动距离
  mouseDownTabMove: Timer; // 重复调用方法计时器
  @ViewChild('tab') tab: ElementRef;
  @ViewChild('menu') menu: ElementRef;

  constructor(
    private contentService: ContentService,
    private router: Router,
    private renderer2: Renderer2,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit(): void {
    this.initMenu();
    this.userName = CookieService.get('WSP_JSESSIONID');
  }

  /**
   * 初始化菜单
   */
  initMenu(): void {
    this.contentService.getMenu().subscribe((result: { success: boolean, result: Array<object> }) => {
      if (result.success) {
        let menu = result.result;
        menu.forEach((item: { id: string, parentId: string, children: Array<object> }) => {
          menu.forEach((value: { id: string, parentId: string }) => {
            if (item.id === value.parentId) {
              item.children.push(value);
            }
          });
        });
        const option = {};
        menu.forEach((item: { id: string, parentId: string }) => {
          if (!Number(item.parentId)) {
            option[item.id] = item;
          }
        });
        menu = [];
        for (const i in option) {
          if (option.hasOwnProperty(i)) {
            menu.push(option[i]);
          }
        }
        this.menuData = menu;
      }
    });
  }

  /**
   * 缩放侧边栏
   */
  collapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    const bodyWidth = document.body.offsetWidth;
    this.headerWidth = this.isCollapsed ? bodyWidth - 80 : bodyWidth - 200;
    this.renderer2.setStyle(this.tab.nativeElement, 'width', this.isCollapsed ? '1706px' : '1586px');
    if (this.showTabButton) {
      // [style.width]="isCollapsed?'1706px':'1586px'"
      this.renderer2.setStyle(this.menu.nativeElement, 'width', `${this.headerWidth - 58 - 60 - 76}px`);
      this.renderer2.setStyle(this.tab.nativeElement, 'width', `${this.headerWidth - 58 - 60 - 76}px`);
    }
  }

  /**
   * 当前只能打开一个一级菜单，并且关闭当前一级菜单下面所有二级菜单
   */
  changeOpen(value: { children: Array<{ open: boolean }> }, index: number): void {
    this.menuData.forEach((item: { open: boolean }, number: number) => {
      item.open = index === number;
    });
    value.children.forEach((item: { open: boolean }) => {
      item.open = false;
    });
  }

  /**
   * 打开路由页面
   */
  openItem(menu: HTMLElement, value: { url: string, menuName: string, breadcrumb?: Array<string> }, grandParentName?: string, parentName?: string): void {
    if (grandParentName) { // 修改面包屑，判断当前是在第几级菜单
      if (parentName) {
        this.breadcrumb = [grandParentName, parentName, value.menuName];
      } else {
        this.breadcrumb = [grandParentName, value.menuName];
      }
    } else {
      this.breadcrumb = value.breadcrumb;
    }
    // this.router.navigateByUrl(value.url).then((success: boolean) => {
    //   if (success) {
    if (this.tabs.some((item: { menuName: string }) => item.menuName === value.menuName)) { // 如果当前页面已经打开，则切换到当前打开路由，tab栏视情况跳转具体位置
      let index = 0;
      this.tabs.forEach((item: { selected: boolean, menuName: string }, number: number) => {
        item.selected = item.menuName === value.menuName;
        if (item.selected) {
          index = number;
        }
      });
      if (this.showTabButton) {
        let targetInstance = 0;
        Array.from(menu.children).forEach((item: HTMLElement, number: number) => {
          if (number < index) {
            targetInstance += item.offsetWidth;
          }
        });
        if (Math.abs(this.tabMoveInstance) > targetInstance) {
          this.renderer2.setStyle(menu, 'transform', `translate(${-targetInstance}px,0)`);
          this.tabMoveInstance = -targetInstance;
        } else {
          if (targetInstance + this.tabMoveInstance + menu.children[index]['offsetWidth'] > menu.offsetWidth) {
            this.renderer2.setStyle(menu, 'transform', `translate(${-(Math.abs(this.tabMoveInstance) + targetInstance + menu.children[index]['offsetWidth'] - Math.abs(this.tabMoveInstance) - menu.offsetWidth)}px,0)`);
            this.tabMoveInstance = -(Math.abs(this.tabMoveInstance) + targetInstance + menu.children[index]['offsetWidth'] - Math.abs(this.tabMoveInstance) - menu.offsetWidth);
          }
        }
      }
    } else { // 新增到tab
      this.tabs.forEach((item: { selected: boolean }) => {
        item.selected = false;
      });
      this.tabs.push({
        menuName: value.menuName,
        url: value.url,
        breadcrumb: [...this.breadcrumb],
        selected: true
      });
      setTimeout(() => {
        if (menu.offsetWidth + 58 + 60 + 76 >= this.headerWidth) {
          this.showTabButton = true;
          this.renderer2.setStyle(menu, 'width', `${this.headerWidth - 58 - 60 - 76}px`);
          this.renderer2.setStyle(this.tab.nativeElement, 'width', `${this.headerWidth - 58 - 60 - 76}px`);
          this.turnTab(menu);
        }
      });
    }
    // }
    // });
  }

  /**
   * 关闭路由页面
   */
  closeItem(menu, value: { url: string, selected: boolean }, index: number): void {
    this.tabs.splice(index, 1);
    if (value.selected) {
      this.tabs[this.tabs.length - 1]['selected'] = true;
    }
    this.tabs.forEach((item: { menuName: string, selected: boolean, url: string }) => {
      if (item.selected) {
        this.openItem(menu, item);
      }
    });
    CommonRouteReuse.deleteRouteSnapshot(value.url); // 删除路由快照
  }

  /**
   * 左右移动tab栏
   */
  turnTab(menu: HTMLElement, left?: boolean): void {
    let currentWidth = 0;
    Array.from(menu.children).forEach((item: HTMLElement) => {
      currentWidth += item.offsetWidth;
    });
    const maxMoveInstance = currentWidth - menu.offsetWidth;
    this.mouseDownTabMove = setInterval(() => {
      if (left) {
        if (this.tabMoveInstance < 0) {
          this.tabMoveInstance += 2;
        }
      } else {
        if (this.tabMoveInstance > -maxMoveInstance) {
          this.tabMoveInstance -= 2;
        }
      }
      this.renderer2.setStyle(menu, 'transform', `translate(${this.tabMoveInstance}px,0)`);
      if (-this.tabMoveInstance >= maxMoveInstance || this.tabMoveInstance > 0) {
        this.clearTurnTab();
      }
    }, 1);
  }

  /**
   * 清除定时器
   */
  clearTurnTab(): void {
    clearInterval(this.mouseDownTabMove);
  }

  /**
   * 登出
   */
  logOut(): void {
    this.contentService.logOut().subscribe((result: { success: boolean, result: boolean }) => {
      if (result.success) {
        if (result.result) {
          this.notification.success('登出', '成功！');
          CookieService.delete('WSP_JSESSIONID');
          CommonRouteReuse.deleteRouteSnapshot(this.router.url);
          this.router.navigateByUrl('/pages/login');
        }
      }
    });
  }

  /**
   * 修改密码
   */
  changePassword(): void {
  }
}
