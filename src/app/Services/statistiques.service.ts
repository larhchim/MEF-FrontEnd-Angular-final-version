import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SAuthentificationService} from "./sauthentification.service";

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  constructor(private http:HttpClient,private serv:SAuthentificationService) { }

  getInscriptions(){
    return this.http.get('http://localhost:8083/InscriptionsStats',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  getInscriptionsParConcours(idc:any){
    return this.http.get('http://localhost:8083/InscriptionsStatsConcours/'+idc,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  getGestionnairesGlob(){
    return this.http.get('http://localhost:8083/GestGlobalStats',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  getGestionnairesDir(id:any){
    return this.http.get('http://localhost:8083/GestDirectionStats/'+id,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  getConcoursFromDirection(id:any){
    return this.http.get('http://localhost:8083/ConcoursStatsDirection/'+id,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  getConcoursFromProfile(id:any){
    return this.http.get('http://localhost:8083/ConcoursOfProfileStats/'+id,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  getCentresFromConcours(id:any){
    return this.http.get('http://localhost:8083/CentreStats/'+id,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  getGlobalStatsOfSubscription(){
    return this.http.get('http://localhost:8083/HistoryChangeStatusOfCandidates',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  getGlobalStatsOfSubscriptionByGest(id:any){
    return this.http.get('http://localhost:8083/HistoryChangeStatusOfCandidates/Username/'+id,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  getTrancheAgeGlobale(){
    return this.http.get('http://localhost:8083/InscriptionsStatsConcours/TrancheAge',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  getTrancheAgeParConcours(id:any){
    return this.http.get('http://localhost:8083/InscriptionsStatsConcours/TrancheAgeByConcours/'+id,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }


}
