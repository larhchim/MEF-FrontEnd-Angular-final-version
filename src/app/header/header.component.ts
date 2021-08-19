import {Component, Input, OnInit} from '@angular/core';
import {GlobalConstants} from "../GlobalConstants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // tslint:disable-next-line:no-empty
  constructor(private route:Router) { }

  // tslint:disable-next-line:no-empty
  ngOnInit(): void {
  }
  isCollapsed = true;
  @Input()dark =true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  DarkSwitch(){
    this.dark = !this.dark;
    GlobalConstants.darkEnabled = !GlobalConstants.darkEnabled;
    this.route.navigate(['Admin'])
  }

}
