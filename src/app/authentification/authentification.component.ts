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
  choix=1;
  LoginMail:any;
  Error:any
  pinNumber:any;
  confirmpassword:any;
  bol=false;
  status=0;
  Erroremail:any;
  Errorpassword:any;
  Errorpin:any;
  constructor(private servAuth:SAuthentificationService,private ss:SgestionnaireService,private route:Router) { }

  ngOnInit(): void {
    if (this.servAuth.leToken()!=null){
      this.route.navigateByUrl('/Admin')
    }
   const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    // @ts-ignore
    sign_up_btn.addEventListener("click", () => {
      // @ts-ignore
      container.classList.add("sign-up-mode");
    });

    // @ts-ignore
    sign_in_btn.addEventListener("click", () => {
      // @ts-ignore
      container.classList.remove("sign-up-mode");
    });
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
       this.ss.showError('Server Internal Error Error Login',"Username / Password are incorrect or Account is suspended ");
      },
      () => {
       this.ss.showSuccess(''+this.servAuth.leUsername()+'',"logged successfully");
      }
    )
  }

  GoToRecoverForm(){
    this.choix=2;
  }

  RecoveryPass(data:any){
    this.bol =true;
     this.servAuth.RecoverPass(this.LoginMail).subscribe(
       (reponse) => {
          // @ts-ignore
         this.pinNumber = reponse.pin;
       },
       (error) => {
         this.Error =error.error;
         this.status=error.status;
         this.bol =false;
       },
       () => {
         this.choix = 3;
         this.bol =false;
       }
     )
  }

  GoToLoginForm(){
    this.choix=1;
  }

  UpdateRecover(data:any){

    this.bol =true;

    if (data.pinNumber!=this.pinNumber){
      this.ss.showError("Code Pin n'est pas valide essayer d'entrer le code pin envoyé a votre boite mail","Code Invalide");
      this.bol= false;
      return;
    }

      const login = this.LoginMail;
      const password = data.password;
      const confirmpassword = data.confirmpassword;
      const pin = data.pinNumber;

      this.servAuth.Updaterecover({login,password,confirmpassword,pin},data.pinNumber).subscribe(
        (reponse) => {

        },
        (error) => {
          console.log(error.error.password)
          console.log(error.password)

          this.Error =error;
          this.Erroremail = error.error.email;
          this.Errorpassword = error.error.password;
          this.Errorpin = error.error.pin;
          this.status=error.status;
          this.bol = false;
        },
        () => {
          const motDePasse = password;
          this.SeConnecter({motDePasse,login});
          this.bol=false;
        }
      )

  }
}
