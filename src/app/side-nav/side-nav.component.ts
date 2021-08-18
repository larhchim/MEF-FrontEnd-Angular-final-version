import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  toogle = '';
  constructor(private route:Router) { }

  // tslint:disable-next-line:no-empty
  ngOnInit(): void {
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
