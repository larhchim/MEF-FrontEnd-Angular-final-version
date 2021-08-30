import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SAuthentificationService} from "./sauthentification.service";

@Injectable({
  providedIn: 'root'
})
export class HistoriqueCandidatureService {

  constructor(private http:HttpClient,private serv:SAuthentificationService) { }

  UpdateInscription(InscriptionId:any,level:any){
    return this.http.get('http://localhost:8083/UpdateInscription/'+InscriptionId+'/'+level,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  AddHistoryCandidate(G:any,id:any){
    return this.http.post('http://localhost:8083/AddHistoryCandidate/'+id,G,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

  SearchHistoryCandidate(size:any,page:any,id:any){
    return this.http.get('http://localhost:8083/SearchHistoryCandidate/'+id+'?size='+size+'&page='+page+'',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
}
