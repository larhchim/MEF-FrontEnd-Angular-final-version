import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SAuthentificationService} from "./sauthentification.service";

@Injectable({
  providedIn: 'root'
})
export class SconcoursService {

  constructor(private http:HttpClient,private serv:SAuthentificationService) { }

  getConcours(motcle:any,size:any,page:any){
    return this.http.get('http://localhost:8083/SearchConcours?mc='+motcle+'&size='+size+'&page='+page+'',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  AddConcours(G:any){
    return this.http.post('http://localhost:8083/addConcours',G,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  SpecificConcours(name:any){
    return this.http.get('http://localhost:8083/SearchBYProf/'+name+'').pipe()
  }
  getAllConcours(){
    return this.http.get('http://localhost:8083/listcnc',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  getResultsOfCnc(id:any){
    return this.http.get('http://localhost:8083/download/Results/'+id).pipe()
  }

  getSendConvocations(id:any){
    return this.http.get('http://localhost:8083/exportResultats/'+id,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

}
