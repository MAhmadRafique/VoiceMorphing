import { Component, OnInit } from '@angular/core';
import { NavbarItemsService } from '../Services/navbar-items.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  public navItems: NavbarItemsService;

  constructor(navItems: NavbarItemsService) {
    this.navItems = navItems;
  }

  ngOnInit() {
    this.navItems.show();
  }

}
