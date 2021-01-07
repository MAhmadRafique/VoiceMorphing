import { Component } from '@angular/core';
import { NavbarItemsService } from '../Services/navbar-items.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  public navItems: NavbarItemsService;

  constructor(navItems: NavbarItemsService) {
    this.navItems = navItems;
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
