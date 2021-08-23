import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SvillesService} from '../Services/svilles.service';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import {ScentreService} from '../Services/scentre.service';
import {SAuthentificationService} from "../Services/sauthentification.service";

@Component({
  selector: 'app-ajouter-centre',
  templateUrl: './ajouter-centre.component.html',
  styleUrls: ['./ajouter-centre.component.css']
})
export class AjouterCentreComponent implements OnInit {
  adresse:any;
  salle:any;
  id:any;
  objvilles:any;
  mod=1;
  AddedCentre:any;
  constructor(private route:Router,private ville:SvillesService,private ss:SgestionnaireService,
              private centre:ScentreService,private srv:SAuthentificationService) { }

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

    if (this.srv.isAdmin()==false && this.srv.isGestLV1()==false){
      this.route.navigateByUrl('/LoginPage');
      return;
    }
    this.ville.getVilles().subscribe(
      (resp) => {
        this.objvilles =resp;
      }
    )
  }
  BackToList(){
    this.route.navigate(['Admin/HomeGest']);
  }
  AddNewCentre(){
    const adresse = this.adresse;
    const salle =this.salle;
    const idVille = this.id;
    this.centre.AddCentre({adresse,salle,ville:{idVille}}).subscribe(
      (resp) => {
        // tslint:disable-next-line:no-console
        this.AddedCentre =resp;
        // tslint:disable-next-line:no-console
        console.log(resp);
      },
      (error) => {
        this.ss.showError('Internal Server Error Contact the Admin',"Message Error 500 Failed to Add");
        // tslint:disable-next-line:no-console
        console.log(error);
      },
      () => {
        this.ss.showSuccess('New Centre was added Successfully','Message de Confirmation');
        this.mod = 2;
      }
    )
  }
  BackTo(){
    this.mod =1;
  }
}
