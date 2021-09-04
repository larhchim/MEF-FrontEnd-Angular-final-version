import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Gestionnaire} from '../Model/Gestionnaire';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import {Router} from '@angular/router';
import {GlobalConstants} from "../GlobalConstants";
import {SAuthentificationService} from "../Services/sauthentification.service";

@Component({
  selector: 'app-liste-gestionnaire',
  templateUrl: './liste-gestionnaire.component.html',
  styleUrls: ['./liste-gestionnaire.component.css']
})
export class ListeGestionnaireComponent implements OnInit {

  // @ts-ignore
  gestionnairedata :any;
  motcle:string ='';
  page:number=0;
  size:number=5;
  // @ts-ignore
  pages:number[];
  currenPage:number=0;
  // @ts-ignore
  rd:any;
  objvalue:any;
  etatcCompte:any;
  habilitation:any;
  administrator:any;
  // @ts-ignore
  fests:any;
  idG:any;
  newd:any;
  id:any;
  login:any;
  motDePasse:any;
  mod:any;
  bol:any;
  darkEnabled:any;
  Errors:any
  err=0;
  status:any;
  // tslint:disable-next-line:no-empty
  constructor(private http:HttpClient,
              private gservice:SgestionnaireService,private route:Router,public srv:SAuthentificationService) { }

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
    // @ts-ignore
    this.mod =1;
    this.darkEnabled =GlobalConstants.darkEnabled;

    // tslint:disable-next-line:no-empty
    this.gservice.getGestionnaire(this.motcle,this.currenPage,this.size).subscribe(result => {
        // @ts-ignore
        this.gestionnairedata = result
        // @ts-ignore
        this.pages = new Array(result.totalPages);
        // tslint:disable-next-line:no-console
        console.log(result);
      },
      (error) => {
        // tslint:disable-next-line:no-console
        console.log(error);
      },
      () => {});

    this.gservice.getDirections().subscribe(
      (resp) => {
        this.objvalue = resp;
      }
    )
  }

  doSearch(){
    this.gservice.getGestionnaire(this.motcle,this.currenPage,this.size).subscribe(result => {
        // @ts-ignore
        this.gestionnairedata = result
        // @ts-ignore
        this.pages = new Array(result.totalPages);
        // tslint:disable-next-line:no-console
        console.log(result);
        this.bol =true;
      },
      (error) => {
        // tslint:disable-next-line:no-console
        console.log(error);
      }, () =>{
        this.bol = false;
      });
  }
  chercher(){
    this.doSearch();
    this.err = 0;
  }

  gotoPage(i:number){
    this.currenPage=i;
    this.doSearch();
  }

  setClickedRow(i:any){
    this.rd = i.directions;
    this.login = i.login;
    this.motDePasse = i.motDePasse;
    console.log(this.rd)
    console.log(i)
    this.etatcCompte = i.etatcCompte;
    this.habilitation = i.habilitation;
    this.administrator = i.administrator;
    this.idG = i.idGestionnaire;
    this.mod = 2;
    this.err=0;
  }
  UpdateGest(etatcCompte:any,habilitation:any,administrator:any,login:any,motDePasse:any){

    if (this.id!=null)
    this.rd.push(JSON.parse('{"id": '+this.id+'}'));
    this.gservice.updateGestionnaire(this.idG,{etatcCompte,habilitation,login,administrator,motDePasse,directions:this.rd}).subscribe(
      (resp) =>{
        console.log(resp)
        this.bol =true;
      },
      (error) =>{
        console.log(error);
        this.status =error.status;
        this.gservice.showError('Cannot Update Users with Admin Roles or Server has taken down','Error from Server')
        if (error.status == 406 || error.status == 409){
          this.Errors = error.error;
          this.err=1;

        }
      },
      () =>{
        this.rd = null;
        this.gservice.showSuccess('Gestionnaire Modifié avec succes','Message 200')
        this.bol =false;
        this.ngOnInit();
        this.err =0;
        this.Errors=null;
      }
    )
  }


  Ajout(){
    // this.serv.addGestionnaire({etatcCompte,habilitation,login,administrator,directions : [{id}]}).subscribe(
    /*this.fests = new Array(this.rd);
    console.log('hiiiiii')
    console.log(this.fests)
    this.fests.push(this.newd.toString())
  console.log(this.fests)
  console.log(this.newd)
  console.log('hiiiiii')*/
    this.UpdateGest(this.etatcCompte,this.habilitation,this.administrator,this.login,this.motDePasse);
  }
  BackToList(){
    this.mod = 1;
  }
  Return(){
    this.route.navigate(['Admin']);
  }
  GoToNewGest(){
    this.route.navigate(['Admin/newGest']);
  }
}
