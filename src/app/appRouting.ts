import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './error/error.component';
import {CentraleHomeComponent} from './centrale-home/centrale-home.component';
import {ListeGestionnaireComponent} from './liste-gestionnaire/liste-gestionnaire.component';
import {AddGestionnaireComponent} from './add-gestionnaire/add-gestionnaire.component';
import {ListDirectionsComponent} from './list-directions/list-directions.component';
import {GradesProfilsComponent} from './grades-profils/grades-profils.component';
import {ProfilsComponent} from './profils/profils.component';
import {ConcoursComponent} from './concours/concours.component';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {AriaChartComponent} from './aria-chart/aria-chart.component';
import {HomeGestionnaireComponent} from './home-gestionnaire/home-gestionnaire.component';
import {AjouterCentreComponent} from './ajouter-centre/ajouter-centre.component';
import {AjouterConcoursComponent} from './ajouter-concours/ajouter-concours.component';
import {ListCentresComponent} from './list-centres/list-centres.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {CandidatureComponent} from "./candidature/candidature.component";
import {SouscriptionComponent} from "./souscription/souscription.component";
import {AuthentificationComponent} from "./authentification/authentification.component";
import {ConsulterHistoriqueComponent} from "./consulter-historique/consulter-historique.component";

const APP_ROUTING: Routes = [
  {
    path: 'Admin', component: SideNavComponent, children: [
      {path: '', component: CentraleHomeComponent},
      {path: 'gest',component: ListeGestionnaireComponent},
      {path: 'newGest',component:AddGestionnaireComponent},
      {path: 'directions',component: ListDirectionsComponent},
      {path: 'profils',component: ProfilsComponent},
      {path: 'gradesProfils',component: GradesProfilsComponent},
      {path: 'concours',component:ConcoursComponent},
      {path: 'piechart',component:PieChartComponent},
      {path: 'linechart',component:LineChartComponent},
      {path: 'barchart',component:BarChartComponent},
      {path: 'ariachart',component:AriaChartComponent},
      {path: 'HomeGest',component:HomeGestionnaireComponent},
      {path: 'ConsultHistory/:id',component:ConsulterHistoriqueComponent},
      {path: 'AddCentre',component:AjouterCentreComponent},
      {path: 'AddConcours',component:AjouterConcoursComponent},
      {path: 'listCentres',component:ListCentresComponent},
      {path: '**', component: ErrorComponent}
    ]
  },
  {path: 'LoginPage', component:AuthentificationComponent},
  {path: '',component:CandidatureComponent},
  {path: 'Candidat',component:CandidatureComponent},
  {path: 'Inscription/:id/:profil',component:SouscriptionComponent},
  {path: '**', component: ErrorComponent}
];

export const ROUTING = RouterModule.forRoot(APP_ROUTING);
