import {Component, OnInit, Renderer2} from '@angular/core';
import {ContentService} from './content.service';
import {Router} from '@angular/router';
import {CommonRouteReuse} from '../../core/common-route-reuse';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  isCollapsed = false; // 侧边栏缩放
  menuData: Array<{
    menuName: string,
    icon: string,
    children: Array<{
      menuName: string,
      url: string,
      breadcrumb?: Array<object>
    }>
  }> = []; // 菜单栏
  tabs: Array<{
    menuName: string,
    url: string,
    breadcrumb?: Array<string>,
    selected: boolean
  }> = []; // tab栏
  breadcrumb = []; // 面包屑
  headerWidth = document.body.offsetWidth - 200; // 头部长度
  showTabButton = false; // 左右移动按钮显示
  tabMoveInstance = 0; // 左右移动距离
  mouseDownTabMove: Timer; // 重复调用方法计时器


  constructor(
    private contentService: ContentService,
    private router: Router,
    private renderer2: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.initMenu();
  }

  /**
   * 初始化菜单
   */
  initMenu(): void {
    this.contentService.getMenu().subscribe((result: { success: boolean, result: Array<object> }) => {
      if (result.success) {
        const option = {};
        result.result.forEach((item: { id: string, parentId: string }) => {
          if (!Number(item.parentId)) {
            option[item.id] = item;
          }
        });
        const menu = [];
        for (const i in option) {
          if (option.hasOwnProperty(i)) {
            menu.push(option[i]);
          }
        }
        menu.forEach((item: { id: string, children: Array<object> }) => {
          result.result.forEach((value: { parentId: string }) => {
            if (item.id === value.parentId) {
              item.children.push(value);
            }
          });
        });
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
  }

  /**
   * 打开路由页面
   */
  openItem(menu: HTMLElement, value: { url: string, menuName: string, breadcrumb?: Array<string> }, parentName?: string): void {
    this.breadcrumb = parentName ? [parentName, value.menuName] : value.breadcrumb;
    // this.router.navigateByUrl(value.url).then((success: boolean) => {
    //   if (success) {
    if (this.tabs.some((item: { menuName: string }) => item.menuName === value.menuName)) {
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
    } else {
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
        if (menu.offsetWidth + 58 + 60 >= this.headerWidth) {
          this.showTabButton = true;
          this.renderer2.setStyle(menu, 'width', `${this.headerWidth - 58 - 60}px`);
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
      this.tabs[this.tabs.length - 1].selected = true;
    }
    this.tabs.forEach((item: { menuName: string, selected: boolean, url: string }) => {
      if (item.selected) {
        this.openItem(menu, item);
      }
    });
    CommonRouteReuse.deleteRouteSnapshot(value.url);
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
      left ? this.tabMoveInstance = this.tabMoveInstance + 2 : this.tabMoveInstance = this.tabMoveInstance - 2;
      if (this.tabMoveInstance < -maxMoveInstance || this.tabMoveInstance > 0) {
        this.clearTurnTab();
      }
      this.renderer2.setStyle(menu, 'transform', `translate(${this.tabMoveInstance}px,0)`);
    }, 1);
  }

  /**
   * 清除定时器
   */
  clearTurnTab(): void {
    clearInterval(this.mouseDownTabMove);
  }
}
