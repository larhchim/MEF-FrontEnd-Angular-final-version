import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { CentraleHomeComponent } from './centrale-home/centrale-home.component';
import { ListeGestionnaireComponent } from './liste-gestionnaire/liste-gestionnaire.component';
import {HttpClientModule} from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import {ROUTING} from './appRouting';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddGestionnaireComponent } from './add-gestionnaire/add-gestionnaire.component';
import { AlertComponent } from './alert/alert.component';


import {MDBBootstrapModulesPro, MDBSpinningPreloader, ToastModule} from 'ng-uikit-pro-standard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ListDirectionsComponent } from './list-directions/list-directions.component';
import { GradesProfilsComponent } from './grades-profils/grades-profils.component';
import { ProfilsComponent } from './profils/profils.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ConcoursComponent } from './concours/concours.component';
import { AriaChartComponent } from './aria-chart/aria-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { HomeGestionnaireComponent } from './home-gestionnaire/home-gestionnaire.component';
import { AjouterConcoursComponent } from './ajouter-concours/ajouter-concours.component';
import { AjouterCentreComponent } from './ajouter-centre/ajouter-centre.component';
import { ListCentresComponent } from './list-centres/list-centres.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { SouscriptionComponent } from './souscription/souscription.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { AuthentificationComponent } from './authentification/authentification.component';
import { ConsulterHistoriqueComponent } from './consulter-historique/consulter-historique.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CentraleHomeComponent,
    ListeGestionnaireComponent,
    ErrorComponent,
    HomeComponent,
    AddGestionnaireComponent,
    AlertComponent,
    ListDirectionsComponent,
    GradesProfilsComponent,
    ProfilsComponent,
    SideNavComponent,
    ConcoursComponent,
    AriaChartComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    HomeGestionnaireComponent,
    AjouterConcoursComponent,
    AjouterCentreComponent,
    ListCentresComponent,
    CandidatureComponent,
    SouscriptionComponent,
    AuthentificationComponent,
    ConsulterHistoriqueComponent
  ],
  imports: [
    BrowserModule,
    NgApexchartsModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    ROUTING,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent]
})
export class AppModule {
}
