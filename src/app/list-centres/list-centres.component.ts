import { Component, OnInit } from '@angular/core';
import {ScentreService} from '../Services/scentre.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {SgestionnaireService} from '../Services/sgestionnaire.service';

@Component({
  selector: 'app-list-centres',
  templateUrl: './list-centres.component.html',
  styleUrls: ['./list-centres.component.css']
})
export class ListCentresComponent implements OnInit {
  mod = 1;
  motcle:any = '';
  pages:any;
  currenPage:any = 0;
  Centres:any;
  size:any = 5;
  constructor(private centre:ScentreService,private route:Router,private ss:SgestionnaireService) { }

  ngOnInit(): void {
    this.centre.getCentres(this.motcle,this.size,this.currenPage).subscribe(
      (resp) => {
        this.Centres = resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
      },
      (error) => {
        this.ss.showError('Internal Server Error Contact the Admin','Error 500 data not fetched');
      },
      () => {
        this.ss.showSuccess('Data Loaded Successfully','Message de confirmation 200');
      }
    )
  }
  BackToCocnours(){
    this.route.navigate(['Admin/HomeGest']);
  }
  chercher(){
    this.centre.getCentres(this.motcle,this.size,this.currenPage).subscribe(
      (resp) => {
        this.Centres = resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
      },
      (error) => {
        // tslint:disable-next-line:no-console
        console.log(error);
      },
      () => {
        // tslint:disable-next-line:no-console
        console.log('completed')
      }
    )
  }
  setClickedRow(centre:any){

  }
  gotoPage(i:number){
    this.currenPage = i;
    this.chercher();
  }
}
