import { Component, OnInit } from '@angular/core';
import {ProfilService} from '../Services/profil.service';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import {Router} from '@angular/router';
import {GlobalConstants} from "../GlobalConstants";
import {SgradesService} from "../Services/sgrades.service";

@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.css']
})
export class ProfilsComponent implements OnInit {
  motcle:any = '';
  page:any=0;
  size:any=5;
  profils:any;
  mod:any=1;
  currentpage =0;
  pages:any;
  intitled:any;
  type:any;
  idProfil:any;
  UpdatedProfil:any;
  AddedProfil:any;
  darkEnabled:any;
  objGrades:any;
  // @ts-ignore
  TabGrades:any[] = [];
  constructor(private pserv:ProfilService,private ss:SgestionnaireService,private route:Router,private grade:SgradesService) { }

  ngOnInit(): void {
    this.darkEnabled =GlobalConstants.darkEnabled;
    this.pserv.getAllProfils(this.motcle,this.currentpage,this.size).subscribe(
      (resp) => {
        // @ts-ignore
        this.profils = resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
        // tslint:disable-next-line:no-console
        console.log(resp);
      },
      (error) => {
        this.ss.showError('Server Error Contact the Admin','Error 404')
      },
      () => {
        this.ss.showSuccess('Loaded Successfully','Message de Confirmation 200')
      }
    )
    this.grade.TousLesGrades().subscribe(
      (resp) => {
        this.objGrades =resp;
      },
      (error) => {
        console.log(error)
      },
      () => {

      }
    )
  }
  NewProfil(){
    this.type ='';
    this.intitled ='';
    this.idProfil = null;
    this.mod = 4;
  }
  AddNewProfil(intitled:any,type:any){
    const TabGrades = this.TabGrades;
    this.pserv.AddOneProfil({intitled,type,grades:TabGrades}).subscribe(
      (resp) => {
        this.AddedProfil =resp;
      },
      (error) => {
        this.ss.showError('Internal Server Error','Message Erreur 500');
      },
      () => {
        // tslint:disable-next-line:no-console
        console.log('Completed');
        this.mod = 5;
        this.ss.showSuccess('Profile Added Successfully','Message de Confirmation 200');
        this.TabGrades = [];
        this.ngOnInit();
      }
    )
  }
  chercher(){
    this.pserv.getAllProfils(this.motcle,this.currentpage,this.size).subscribe(
      (resp) => {
        // @ts-ignore
        this.profils = resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
        // tslint:disable-next-line:no-console
        console.log(resp);
      },
      (error) => {
        this.ss.showError('Server Error Contact the Admin','Error 404')
      },
      () => {
        // tslint:disable-next-line:no-console
        console.log('completed')
      }
    )
  }
  setClickedRow(profile:any){
    this.idProfil = profile.idProfil;
    this.intitled = profile.intitled;
    this.type = profile.type;
    this.mod = 2;
  }
  gotoPage(i:any){
    this.currentpage = i;
    this.chercher();
  }
  BackToList(){
    this.chercher();
    this.mod = 1;
  }
  change(intitled:any,type:any){
    this.pserv.UpdateOneProfil(this.idProfil,{type,intitled}).subscribe(
      (resp) => {
        this.UpdatedProfil =resp;
      },
      (error) => {
        this.ss.showError('Internal Server Error Please Contact The Admin','Error 500');
      },
      () => {
        // tslint:disable-next-line:no-console
        console.log('completed');
        this.ss.showSuccess('Profile Updated Successfully','Message de Confirmation 200');
        this.mod =3;
      }
    )
  }
  Update(){
    this.change(this.intitled,this.type);
  }
  Return(){
    this.route.navigate(['Admin']);
  }
  changeSelection(option:any){
    this.TabGrades.push(option);
    this.objGrades.splice(option,1);
    // tslint:disable-next-line:no-console
  }
}
