import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SAuthentificationService} from "./sauthentification.service";

@Injectable({
  providedIn: 'root'
})
export class SgradesService {

  constructor(private http:HttpClient,private serv:SAuthentificationService) { }

  getAllGrades(mc:any,size:any,page:any){
    return this.http.get('http://localhost:8083/SearchGrade?mc='+mc+'&size='+size+'&page='+page+'',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  getListProfils(){
    return this.http.get('http://localhost:8083/AllProfiles',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  AddNewGrade(G:any){
    return this.http.post('http://localhost:8083/AddGrade',G,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  getProfilManqueGrade(id:number){
    return this.http.get('http://localhost:8083/ProfilsManqueGrade/'+id+'',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  ModifyGrade(id:number,G:any){
    return this.http.put('http://localhost:8083/UpdateGrade/'+id+'',G,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  TousLesGrades(){
    return this.http.get('http://localhost:8083/ALLGrades',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe();
  }
}
