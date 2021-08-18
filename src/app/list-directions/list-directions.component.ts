import { Component, OnInit } from '@angular/core';
import {SdirectionsService} from '../Services/sdirections.service';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-directions',
  templateUrl: './list-directions.component.html',
  styleUrls: ['./list-directions.component.css']
})
export class ListDirectionsComponent implements OnInit {

  mod:any;
  motcle:any;
  Directions:any;
  pages:any;
  size:number=5;
  currenPage:number = 0;
  id:any;
  fonction:any;
  description:any;
  intitled:any;
  nom:any;
  bol:any;
  constructor(private serv:SdirectionsService,private  ss:SgestionnaireService,private route:Router) { }

  ngOnInit(): void {
    this.mod = 1
    this.motcle = '';
    this.serv.getDirections(this.motcle,this.size,this.currenPage).subscribe(
      (resp) =>{
        this.Directions = resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
      }, (error) => {
        this.ss.showError('Server Error Contact the admin','Error 404')
      },
      ()=>{
        // tslint:disable-next-line:no-console
        console.log('completed')
      }
    )
  }

  doSearch(){
    this.serv.getDirections(this.motcle,this.size,this.currenPage).subscribe(
      (resp) =>{
        this.Directions = resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
        this.bol =true;
      }, (error) => {
        this.ss.showError('Server Error Contact the admin','Error 404')
      },
      ()=>{
        // tslint:disable-next-line:no-console
        console.log('completed')
        this.bol =false;
      }
    )
  }

  chercher(){
    this.doSearch();
  }
  setClickedRow(i:any){
    this.id=i.id;
    this.fonction =i.fonction;
    this.description = i.description;
    this.intitled = i.intitled;
    this.nom = i.nom;
    this.mod = 2;
  }
  gotoPage(p:any){
    this.currenPage=p;
    this.doSearch();
  }
  BackToList(){
    this.mod = 1;
  }
  Change(fonction:any,description:any,intitled:any,nom:any){

    this.serv.modifyADirection(this.id,{fonction,description,intitled,nom}).subscribe(
      (resp) => {
        this.ss.showSuccess('Updated Successfully','Message de Confiramtion');
        // tslint:disable-next-line:no-console
        console.log(resp)
        this.bol =true;
      },
      (error) => {
        this.ss.showError('Server Error Please Contact Admin','Error 404');
      },
      () => {
        this.bol =false;
      }

    )
  }
  Update(){
    this.Change(this.fonction,this.description,this.intitled,this.nom);
    this.ngOnInit();
    this.chercher()
    this.ngOnInit();

  }
  Return(){
    this.route.navigate(['Admin']);
  }

}
