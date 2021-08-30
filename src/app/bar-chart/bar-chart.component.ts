import { Component, OnInit } from '@angular/core';
import {SAuthentificationService} from "../Services/sauthentification.service";
import {Router} from "@angular/router";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Decimation,
  Filler,
  Legend,
  LinearScale,
  Title, Tooltip
} from "chart.js";
import {StatistiquesService} from "../Services/statistiques.service";
import {SdirectionsService} from "../Services/sdirections.service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  ReponseS1:any;
  myChart22:any;
  id:any;
  Directions:any;
  GestOfDirections:any;

  ngOnInit(): void {
    this.srv.loadToken();
    this.srv.getDirectionTest().subscribe(
      (resp) => {
        this.Directions =resp;
      },
      (error) => {
        this.srv.logout();
        this.route.navigateByUrl('/LoginPage');
      }
    )

    this.stats.getGestionnairesGlob().subscribe(
      (resp) =>{
        this.ReponseS1 = resp;
      },
      (error) => {

      },
      () => {
        const sansRole = this.ReponseS1['Gestionnaires'] - (this.ReponseS1['Admins'] + this.ReponseS1['GestionnairesLV1'] +this.ReponseS1['GestionnairesLV2'] + this.ReponseS1['Desactivated']);

        var myChart = new Chart("MYCHART11", {
          type: 'bar',
          data: {
            labels: ['Total', 'Super Admins', 'Admins', 'Moderateurs', 'banned','Sans Role'],
            datasets: [{
              label: "Statistiques des Gerants de l'application E-Concours",
              data: [this.ReponseS1['Gestionnaires'], this.ReponseS1['Admins'], this.ReponseS1['GestionnairesLV1'], this.ReponseS1['GestionnairesLV2'], this.ReponseS1['Desactivated'],sansRole],
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255,1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 45, 64, 1)',

              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.55)',
                'rgba(255, 45, 64, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    )

    this.id=1;

    this.Chart();


  }

  Chart(){


    if (this.myChart22!=null){
      this.myChart22.destroy();
    }

    this.stats.getGestionnairesDir(this.id).subscribe(
      (reponse) =>{
         this.GestOfDirections =reponse;
      },
      (error) => {

      },
      () => {

        this.myChart22 = new Chart("MYCHART12", {
          type: 'bar',
          data: {
            labels: ['Total', 'Super Admins', 'Admins', 'Moderateurs'],
            datasets: [{
              label: "Statistiques des Gerants de l'application E-Concours",
              data: [this.GestOfDirections['Gestionnaires'], this.GestOfDirections['Admins'], this.GestOfDirections['GestionnairesLV1'], this.GestOfDirections['GestionnairesLV2']],
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255,1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.55)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    )


  }


  constructor(private srv:SAuthentificationService,private route:Router,private stats:StatistiquesService,private dir:SdirectionsService) {

    Chart.register(BarElement,LinearScale, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);


  }

}
