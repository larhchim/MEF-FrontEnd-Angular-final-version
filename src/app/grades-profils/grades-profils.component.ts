import { Component, OnInit } from '@angular/core';
import {SgradesService} from '../Services/sgrades.service';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import {element} from 'protractor';
import {Router} from '@angular/router';
import {GlobalConstants} from "../GlobalConstants";

@Component({
  selector: 'app-grades-profils',
  templateUrl: './grades-profils.component.html',
  styleUrls: ['./grades-profils.component.css']
})
export class GradesProfilsComponent implements OnInit {
  motcle:string ='';
  size:number = 5;
  currentpage:number =0;
  pages:any;
  Grades:any;
// @ts-ignore
  mod:number;
  p = false;
  intitledGrade:any;
  profils:any=null;
  idProfil:any;
  bol:any=false;
  id:any;
  AllProfiles:any;
// @ts-ignore
  SpecialProfiles:any;
  AddedGrade:any;
  idGardeSelected:any;
  darkEnabled:any;
  constructor(private serv:SgradesService,private ss:SgestionnaireService,private route:Router) { }

  ngOnInit(): void {
    this.mod = 1;
    this.darkEnabled =GlobalConstants.darkEnabled;
    this.serv.getAllGrades(this.motcle,this.size,this.currentpage).subscribe(
      (resp) => {
        this.Grades = resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
      },
      (error) => {
        this.ss.showError('Server Error Please Contact the Admin','Error 500')
      },
      () => {
        // tslint:disable-next-line:no-console
        console.log('completed');
        this.ss.showSuccess('Loaded Successfully','Message de Confirmation 200')
      }
    )
    this.serv.getListProfils().subscribe(
      (resp) => {
        this.AllProfiles =resp;
      }
    )
  }
  chercher(){
    this.serv.getAllGrades(this.motcle,this.size,this.currentpage).subscribe(
      (resp) => {
        this.Grades = resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
      },
      (error) => {
        this.ss.showError('Server Error Please Contact the Admin','Error 500')
      },
      () => {
        // tslint:disable-next-line:no-console
        console.log('completed');
      }
    )
  }
  setClickedRow(obj:any){
    // tslint:disable-next-line:no-console
    this.intitledGrade = obj.intitledGrade;
    this.profils = obj.profils;
    this.idGardeSelected = obj.id;
    if (this.profils.length <= 0){
      this.p = false;
    }else{
      this.p = true;
    }
    this.serv.getProfilManqueGrade(obj.id).subscribe(
      (resp) => {
        this.SpecialProfiles =resp;
      },
      (error) => {
        console.log('error');
      },
      () => {
        this.mod = 2;
      }
    )
  }
  gotoPage(i:number){
    this.currentpage = i;
    this.chercher();
  }
  Update(){
    //p = true; if p updated
    this.profils.push(JSON.parse('{"idProfil": '+this.id+'}'));
    const intitledGrade = this.intitledGrade;
    this.serv.ModifyGrade(this.idGardeSelected,{intitledGrade,profils:this.profils}).subscribe(
      (resp) => {
        console.log(resp);
      },
      (error) => {
        this.ss.showError('Server Error Contact Admin','Error'+error.status+'')
      },
      () => {
        this.profils = null;
        this.ss.showSuccess('Grade Modifié avec succes','Message 200')
        this.intitledGrade ='';
        this.ngOnInit();
      }
    )
  }
  BackToList(){
    this.mod = 1;
  }
  NewGrade(){
    this.intitledGrade ='';
    this.idProfil = null;
    this.mod = 3;
  }

  AddNewGrade(intitledGrade:any,idProfil:any){
    this.serv.AddNewGrade({intitledGrade,profils:[{idProfil}]}).subscribe(
      (resp) => {
        this.AddedGrade = resp;
      },
      (error) => {
        this.ss.showError('Server Error Please Contact the Admin','Error 500');
      },
      () => {
        this.ss.showSuccess('Grade Added Successfully','Message de Confirmation 200');
        this.mod = 4;
      }
    )
  }
  Return(){
    this.route.navigate(['Admin']);
  }
}
