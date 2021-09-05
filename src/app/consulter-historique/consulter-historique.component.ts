import { Component, OnInit } from '@angular/core';
import {SAuthentificationService} from "../Services/sauthentification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HistoriqueCandidatureService} from "../Services/historique-candidature.service";
import {GlobalConstants} from "../GlobalConstants";

@Component({
  selector: 'app-consulter-historique',
  templateUrl: './consulter-historique.component.html',
  styleUrls: ['./consulter-historique.component.css']
})
export class ConsulterHistoriqueComponent implements OnInit {

  constructor(private srv:SAuthentificationService,private route:Router,
              private activatedRoute:ActivatedRoute,
              private history:HistoriqueCandidatureService) { }
  idh:any;
  pagesh:any;
  currenPageh:any=0;
  sizeh = 5;
  HistoryCandidateh:any;
  darkEnabled:any;
  ngOnInit(): void {
    this.darkEnabled =GlobalConstants.darkEnabled;
    this.srv.loadToken();
    this.srv.getDirectionTest().subscribe(
      (resp) => {

      },
      (error) => {
        this.srv.logout();
        this.route.navigateByUrl('/LoginPage');
      }
    )
    this.idh = this.activatedRoute.snapshot.paramMap.get('id')

    this.history.SearchHistoryCandidate(this.sizeh,this.currenPageh,this.idh).subscribe(
      (resp) => {
        this.HistoryCandidateh =resp;
        // @ts-ignore
        this.pagesh = new Array(resp.totalPages);
      },
      () => {

      },
      () => {

      }
    )

  }

  gotoPageh(p:any){
    this.currenPageh=p;

    this.history.SearchHistoryCandidate(this.sizeh,this.currenPageh,this.idh).subscribe(
      (resp) => {
        this.HistoryCandidateh =resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
      },
      () => {

      },
      () => {

      }
    )
  }



}
