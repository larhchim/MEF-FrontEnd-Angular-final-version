import {Component, Input, OnInit} from '@angular/core';
import {GlobalConstants} from "../GlobalConstants";
import {Router} from "@angular/router";
import {SAuthentificationService} from "../Services/sauthentification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // tslint:disable-next-line:no-empty
  constructor(private route:Router,private srev:SAuthentificationService) { }

  // tslint:disable-next-line:no-empty
  ngOnInit(): void {
    this.srev.loadToken();
    this.srev.getDirectionTest().subscribe(
      (resp) => {

      },
      (error) => {
        this.srev.logout();
        this.route.navigateByUrl('/LoginPage');
      }
    )
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
  LogOut(){
    this.route.navigateByUrl('/LoginPage')
    this.srev.logout();
  }

}
