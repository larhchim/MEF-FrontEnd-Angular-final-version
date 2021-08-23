import { Component, OnInit } from '@angular/core';
import {SAuthentificationService} from "../Services/sauthentification.service";
import {SgestionnaireService} from "../Services/sgestionnaire.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  username:any;
  password:any;
  mod:any;

  constructor(private servAuth:SAuthentificationService,private ss:SgestionnaireService,private route:Router) { }

  ngOnInit(): void {
    if (this.servAuth.leToken()!=null){
      this.route.navigateByUrl('/Admin')
    }
  }

  SeConnecter(data:any){
    this.servAuth.login(data).subscribe(
      (resp) => {
        let jwt = resp.headers.get('Authorization');
        this.servAuth.saveToken(jwt);
        this.route.navigateByUrl('/Admin');
      },
      (error) => {
        this.mod=1;
       this.ss.showError('Server Internal Error Error Login',"Username / Password are incorrect ");
      },
      () => {
       this.ss.showSuccess(''+this.servAuth.leUsername()+'',"logged successfully");
      }
    )
  }

}
