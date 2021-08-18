import { Component, OnInit } from '@angular/core';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import {Router} from '@angular/router';
import {SdirectionsService} from '../Services/sdirections.service';

@Component({
  selector: 'app-add-gestionnaire',
  templateUrl: './add-gestionnaire.component.html',
  styleUrls: ['./add-gestionnaire.component.css']
})
export class AddGestionnaireComponent implements OnInit {

  objvalue:any;
  // @ts-ignore
  etatcCompte;
  // @ts-ignore
  habilitation;
  // @ts-ignore
  login;
  // @ts-ignore
  administrator;
  // @ts-ignore
  id;
  Gestio:any;
  bol= false;
  mod=0;
  table:any;
  text:any;
  // @ts-ignore
  stl1:string;
  // @ts-ignore
  stl2:string;
  // @ts-ignore
  anim:boolean = false;
  // @ts-ignore
  show:string;
  newid:any;

  // @ts-ignore
  constructor(private serv:SgestionnaireService,private route:Router,private se:SdirectionsService) { }

  ngOnInit(): void {
    this.serv.getDirections().subscribe(
      (resp) => {
        this.objvalue = resp;
        console.log(resp);
      }
    )
    this.mod = 1;
    this.text ='Gestionnaire Ajouté avec succes'

    setInterval(
      () => {
        // @ts-ignore
        this.show = 'show';
      }
      , 2500);
  }

  Ajouter(etatcCompte:boolean,habilitation:number,login:string,administrator:boolean){
    /* etatcCompte = this.etatcCompte
     habilitation = this.habilitation
     login=this.login
     administrator = this.administrator
     id=this.id*/

    this.se.getOneDir(this.id).subscribe(
      (re) => {
        // @ts-ignore
        const id = this.newid = re.id;
        this.bol =true;
        this.serv.addGestionnaire({etatcCompte,habilitation,login,administrator,directions : [{id}]}).subscribe(
          (resp) => {
            this.Gestio = resp;
            this.bol = true;
            // tslint:disable-next-line:no-console
            console.log(resp);
            this.table =this.Gestio.directions;
            console.log(etatcCompte,habilitation,login,administrator,id);
          },(error) =>{
            // tslint:disable-next-line:no-console
            this.showError(error,"Server Error")
            this.bol = false;
            console.log(etatcCompte,habilitation,login,administrator,id);
          }, () =>{
            this.bol =false;
            this.mod = 2;
            this.showSuccess("Gestionnaire Ajouté avec succes","Message de Confirmation")

          }

        )
      }
    )

    // tslint:disable-next-line:no-console
  }

  Ajout(){

    this.Ajouter(this.etatcCompte,this.habilitation,this.login,this.administrator);
  }

  AjoutGest(){

    this.etatcCompte = '';
    this.administrator = '';
    this.login = '';
    this.habilitation = '';
    this.id = '';
    this.mod = 1;
  }

  showSuccess(message:string,title:string){
    this.serv.showSuccess(message,title);
  }
  showError(message:string,title:string){
    this.serv.showError(message,title);
  }
  Return(){
    this.route.navigate(['Admin']);
  }
  ReturnList(){
    this.route.navigate(['Admin/gest'])
  }

}
