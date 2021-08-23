import { Component, OnInit } from '@angular/core';
import {SAuthentificationService} from "../Services/sauthentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-centrale-home',
  templateUrl: './centrale-home.component.html',
  styleUrls: ['./centrale-home.component.css']
})
export class CentraleHomeComponent implements OnInit {

  constructor(private srv:SAuthentificationService,private route:Router) { }

  ngOnInit(): void {
    this.srv.getDirectionTest().subscribe(
      (resp) => {

      },
      (error) => {
        this.srv.logout();
        this.route.navigateByUrl('/LoginPage')
      }
    )
  }

  LogOut(){
    this.srv.logout();
    this.route.navigateByUrl('/LoginPage')
  }

}
