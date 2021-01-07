import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarItemsService } from '../Services/navbar-items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private sourceFile: File;
  private targetFile: File;

  private isSourceSelected: boolean;
  private isTargetSelected: boolean;

  public navItems: NavbarItemsService;
  private router: Router;

  constructor(navItems: NavbarItemsService, router: Router) {
    this.navItems = navItems;
    this.router = router;

    this.isSourceSelected = false;
    this.isTargetSelected = false;
  }

  ngOnInit() {
    this.navItems.show();
  }

  public onSourceChange(event) {
    this.sourceFile = event.target.files[0];
    console.log(this.sourceFile.name);
    document.getElementById("btn_source").innerHTML = this.sourceFile.name;
    document.getElementById("btn_source").style.color = "#000000";
    this.isSourceSelected = true;
  }
  public onTargetChange(event) {
    this.targetFile = event.target.files[0];
    console.log(this.targetFile.name);
    document.getElementById("btn_target").innerHTML = this.targetFile.name;
    document.getElementById("btn_target").style.color = "#000000";
    this.isTargetSelected = true;
  }
  public sourceAndTargetSelected(): boolean {
    return (this.isSourceSelected && this.isTargetSelected)
  }

  convertVoice(args) {
    this.router.navigateByUrl('/output');
  }
}
