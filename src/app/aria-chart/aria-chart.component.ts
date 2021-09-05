import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
import {LineChartComponent} from "../line-chart/line-chart.component";
import {StatistiquesService} from "../Services/statistiques.service";
import {SconcoursService} from "../Services/sconcours.service";

@Component({
  selector: 'app-aria-chart',
  templateUrl: './aria-chart.component.html',
  styleUrls: ['./aria-chart.component.css']
})
export class AriaChartComponent implements OnInit{

  Reponse:any;
  nb:any=1;
  myChart2:any;
  Concours:any;
  CncResponse:any;
  GLB1:any;
  GLB2:any;
  MYCHART1779:any;
  MYCHART1778:any
  idconc:any;

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

    this.cnc.getAllConcours().subscribe(
      (resp) =>{
        this.Concours =resp;
      }
    )

    this.stat.getInscriptions().subscribe(
      (resp) => {
        this.Reponse =resp;

      },
      (error) => {

      },
      () => {
        var myChart = new Chart("MYCHART111", {
          type: 'line',
          data: {
            labels: ["Les Inscriptions","Inscriptions Accepté","Inscriptions Refusé"],
            datasets: [{
              label: 'Liste des Inscriptions',
              data: [this.Reponse['Les Inscriptions'], this.Reponse['Inscription Accepté'], this.Reponse['Inscription Refusé']],
              fill: false,
              backgroundColor:'rgba(250, 128, 114)',
              borderColor:'rgba(255, 45, 64, 1)',
              tension: 0.1
            }]
          }
        });
      }
    )


   this.nb = 1;
   this.Chart()


    this.stat.getTrancheAgeGlobale().subscribe(
      (resp)=>{
         this.GLB1 = resp;
      },
      (err)=>{

      },
      ()=>{
        this.MYCHART1778 = new Chart("MYCHART1778", {
          type: 'pie',
          data: {
            labels: ['40-50ans', '<20ans', '50-60ans','20-30ans','30-40ans','>60ans'],
            datasets: [{
              label: 'Statistiques des Tranches Ages',
              data: [this.GLB1.TrancheBetween40And50,this.GLB1.TrancheUnder20,this.GLB1.TrancheBetween50And60,this.GLB1.TrancheBetween20And30,this.GLB1.TrancheBetween30And40,this.GLB1.TrancheMoreThan60],
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(80, 80, 41, 1)',
                'rgba(60, 60, 235, 1)',
                'rgba(99, 206, 86, 1)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(80, 80, 41, 1)',
                'rgba(60, 60, 235, 1)',
                'rgba(99, 206, 86, 1)'
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
                text: 'Statistiques Totaux des Tranches Ages'
              }
            }
          }
        });
      }
    )


    this.idconc = 1;
    this.ChartTrancheAge();

  }

  ChartTrancheAge(){
    if (this.MYCHART1779!=null){
      this.MYCHART1779.destroy();
    }

    this.stat.getTrancheAgeParConcours(this.idconc).subscribe(
      (resp)=>{
        this.GLB2 = resp;
      },
      (err) => {

      },
      () => {
        this.MYCHART1779 = new Chart("MYCHART1779", {
          type: 'pie',
          data: {
            labels: ['40-50ans', '<20ans', '50-60ans','20-30ans','30-40ans','>60ans'],
            datasets: [{
              label: 'Statistiques des Tranches Ages',
              data: [this.GLB2.TrancheBetween40And50,this.GLB2.TrancheUnder20,this.GLB2.TrancheBetween50And60,this.GLB2.TrancheBetween20And30,this.GLB2.TrancheBetween30And40,this.GLB2.TrancheMoreThan60],
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(80, 80, 41, 1)',
                'rgba(60, 60, 235, 1)',
                'rgba(99, 206, 86, 1)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(80, 80, 41, 1)',
                'rgba(60, 60, 235, 1)',
                'rgba(99, 206, 86, 1)'
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
                text: 'Statistiques Totaux des Tranches Ages'
              }
            }
          }
        });
      }
    )
  }

  Chart(){

    console.log('clicked')

    if (this.myChart2!=null){
      this.myChart2.destroy();
    }

    this.stat.getInscriptionsParConcours(this.nb).subscribe(
      (resp) => {
        this.CncResponse =resp
      },
      () => {

      },
      () => {
        this.myChart2 = new Chart("MYCHART1112", {
          type: 'line',
          data: {
            labels: ["Les Inscriptions globales","Accepté","Refusé","Les Inscriptions du Concours"],
            datasets: [{
              label: 'Statistiques des Inscriptions',
              data: [this.CncResponse['Les Inscriptions'], this.CncResponse['Inscriptions Du Concours Accepté'], this.CncResponse['Inscriptions Du Concours Refusé'], this.CncResponse['Inscriptions Du Concours']],
              fill: false,
              backgroundColor:'rgb(250, 128, 114)',
              borderColor: 'rgb(250, 128, 114)',
              tension: 0.1
            }]
          }
        });
      }
    )

  }


  constructor(private srv:SAuthentificationService,private route:Router,private stat:StatistiquesService,private cnc:SconcoursService) {

    Chart.register(BarElement,LinearScale, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip,LineElement,LineController,PointElement,PieController,ArcElement);


  }



}
