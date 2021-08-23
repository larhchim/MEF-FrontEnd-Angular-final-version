import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SAuthentificationService} from "../Services/sauthentification.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  toogle = '';
  @Input() @Output()darkMode:any;
  constructor(private route:Router,private srv:SAuthentificationService) { }

  // tslint:disable-next-line:no-empty
  ngOnInit(): void {
    this.srv.loadToken();
    this.srv.getDirectionTest().subscribe(
      (resp) => {

      },
      (error) => {
        this.srv.logout();
        this.route.navigateByUrl('/LoginPage');
      }
    )
  }
  OpenOrClose(){
    if (this.toogle == ''){
      this.toogle = 'active';
    }else {
      this.toogle ='';
    }
  }
  ReturnToHome(){
    this.route.navigate(['Admin']);
  }

}
