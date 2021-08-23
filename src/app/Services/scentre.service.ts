import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SAuthentificationService} from "./sauthentification.service";

@Injectable({
  providedIn: 'root'
})
export class ScentreService {

  constructor(private http:HttpClient,private serv:SAuthentificationService) { }
  AddCentre(G:any){
    return this.http.post('http://localhost:8083/addCentre',G,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  getCentres(motcle:any,size:any,page:any){
    return this.http.get('http://localhost:8083/SearchCentres?mc='+motcle+'&size='+size+'&page='+page+'',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  getAllCentres(){
    return this.http.get('http://localhost:8083/listCentres',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
}
