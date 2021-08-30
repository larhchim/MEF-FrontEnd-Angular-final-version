import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  LinearScale, LineController, LineElement, PointElement,
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

    Chart.register(BarElement,LinearScale, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip,LineElement,LineController,PointElement);


  }



}
