import { Component, OnInit } from '@angular/core';
import {
  Chart,
  BarElement,
  LinearScale,
  BarController,
  CategoryScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  PieController, ArcElement
} from 'chart.js';
import {SAuthentificationService} from "../Services/sauthentification.service";
import {Router} from "@angular/router";
import {Utils} from "ng-uikit-pro-standard/lib/free/utils";
import {StatistiquesService} from "../Services/statistiques.service";
import {ProfilService} from "../Services/profil.service";



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit  {
  Directions:any;
  id:any=1;
  id2:any=1;
  myChart1:any;
  myChart2:any;
  Stats1:any;
  Stats2:any;
  Profiles:any;

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

    this.prfl.getListProfils().subscribe(
      (resp) => {
         this.Profiles =resp;
      }
    )



    this.Chart();
    this.Chart2();


  }

  Chart2(){

    if (this.myChart2!=null){
      this.myChart2.destroy();
    }

    this.stats.getConcoursFromProfile(this.id2).subscribe(
      (response) => {
         this.Stats2 =response;
      },
      (error) => {

      },
      () => {
        this.myChart2 = new Chart("MYCHART2", {
          type: 'pie',
          data: {
            labels: ['Actifs du Système', 'Actifs du Profil', 'Terminé du Profil'],
            datasets: [{
              label: 'Concours du Profil',
              data: [this.Stats2['Concours Actifs'],this.Stats2['Actifs du Profil'],this.Stats2['Términé du Profil']],
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          }, options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Statistiques sur les concours par Profil'
              }
            }
          }
        });
      }
    )


  }

  Chart(){


    if (this.myChart1!=null){
      this.myChart1.destroy();
    }

    this.stats.getConcoursFromDirection(this.id).subscribe(
      (resp) => {
         this.Stats1 =resp;
      },
      (error) => {

      },
      () => {

        this.myChart1 = new Chart("MYCHART1", {
          type: 'pie',
          data: {
            labels: ['Total', 'Actifs', 'Terminé'],
            datasets: [{
              label: 'Concours de la direction',
              data: [this.Stats1['Tous Les Concours'], this.Stats1['Actifs'], this.Stats1['Términé']],
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          }, options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Statistiques sur les concours par Direction'
              }
            }
          }
        });

      }
    )

  }


    constructor(private srv:SAuthentificationService,private route:Router,private stats:StatistiquesService,private prfl:ProfilService) {

    Chart.register(BarElement,LinearScale, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip,PieController,ArcElement);


  }
}
