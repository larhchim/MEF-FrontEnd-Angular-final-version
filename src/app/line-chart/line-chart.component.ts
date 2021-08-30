import { Component, OnInit } from '@angular/core';
import {SAuthentificationService} from "../Services/sauthentification.service";
import {Router} from "@angular/router";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Decimation,
  Filler,
  Legend,
  LinearScale, LineController, LineElement, PieController, PointElement,
  Title, Tooltip
} from "chart.js";
import {StatistiquesService} from "../Services/statistiques.service";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  Reponse:any;
  ReponseS1:any;

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

    this.stat.getInscriptions().subscribe(
      (resp) => {
        this.Reponse =resp;

      },
      (error) => {

      },
      () => {



        var myChart1 = new Chart("MYCHART88", {
          type: 'line',
          data: {
            labels: ["Les Inscriptions","Inscriptions Accepté","Inscriptions Refusé"],
            datasets: [{
              label: 'Liste des Inscriptions',
              data: [this.Reponse['Les Inscriptions'], this.Reponse['Inscription Accepté'], this.Reponse['Inscription Refusé']],
              fill: false,
              backgroundColor:
                'rgba(153, 102, 255,1)',
              borderColor:
                'rgba(255, 159, 64, 1)'
              ,
              borderWidth: 1
            }]
          },  options: {
            indexAxis: 'y',
            scales: {
              x: {
                beginAtZero: true
              }
            }
          }
        });
      }
    )



    this.stat.getGestionnairesGlob().subscribe(
      (resp) =>{
        this.ReponseS1 = resp;
      },
      (error) => {

      },
      () => {
        const sansRole = this.ReponseS1['Gestionnaires'] - (this.ReponseS1['Admins'] + this.ReponseS1['GestionnairesLV1'] +this.ReponseS1['GestionnairesLV2'] + this.ReponseS1['Desactivated']);





        var myChart2 = new Chart("MYCHART888", {
          type: 'line',
          data: {
            labels: ['Total', 'Super Admins', 'Admins', 'Moderateurs', 'banned','Sans Role'],
            datasets: [{
              label: "Statistiques des Gerants de l'application E-Concours",
              data: [this.ReponseS1['Gestionnaires'], this.ReponseS1['Admins'], this.ReponseS1['GestionnairesLV1'], this.ReponseS1['GestionnairesLV2'], this.ReponseS1['Desactivated'],sansRole],
              fill: false,
              backgroundColor:
                'rgba(54, 162, 235, 1)',
              borderColor:
                'rgba(255, 45, 64, 1)'
              ,
              borderWidth: 1
            }]
          },  options: {
            indexAxis: 'y',
            scales: {
              x: {
                beginAtZero: true
              }
            }
          }
        });
      }
    )









  }


  constructor(private srv:SAuthentificationService,private route:Router,private stat:StatistiquesService) {

    Chart.register(BarElement,LinearScale, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip,PieController,ArcElement,LineController,PointElement,LineElement);


  }

}
