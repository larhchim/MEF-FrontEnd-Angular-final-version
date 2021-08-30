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
  id:any;
  pages:any;
  currenPage:any=0;
  size = 5;
  HistoryCandidate:any;
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
    this.id = this.activatedRoute.snapshot.paramMap.get('id')

    this.history.SearchHistoryCandidate(this.size,this.currenPage,this.id).subscribe(
      (resp) => {
        this.HistoryCandidate =resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
      },
      () => {

      },
      () => {

      }
    )

  }

  gotoPage(p:any){
    this.currenPage=p;

    this.history.SearchHistoryCandidate(this.size,this.currenPage,this.id).subscribe(
      (resp) => {
        this.HistoryCandidate =resp;
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
