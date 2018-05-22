import { Component } from '@angular/core';
import { navItems } from './../../_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  user : any;

  constructor(private router: Router) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
    
    this.user = JSON.parse(sessionStorage.getItem("User"));

  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }

}
