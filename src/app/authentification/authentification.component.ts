import { Component, OnInit } from '@angular/core';
import {SAuthentificationService} from "../Services/sauthentification.service";
import {SgestionnaireService} from "../Services/sgestionnaire.service";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  username:any;
  password:any;

  constructor(private servAuth:SAuthentificationService,private ss:SgestionnaireService) { }

  ngOnInit(): void {
  }

  SeConnecter(data:any){
    this.servAuth.login(data).subscribe(
      (resp) => {
        let jwt = resp.headers.get('Authorization');
        console.log(jwt);
      },
      (error) => {
       this.ss.showError('Error Login',"Server Internal Error Contact the admin");
      },
      () => {
       this.ss.showSuccess('Message de Confirmation 200',"logged successfully");
      }
    )
  }

}
