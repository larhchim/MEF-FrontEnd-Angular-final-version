import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SAuthentificationService} from "./sauthentification.service";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http:HttpClient,private serv:SAuthentificationService) { }

  getAllProfils(motcle:any,page:any,size:any){
    return this.http.get('http://localhost:8083/SearchProfils?mc='+motcle+'&page='+page+'&size='+size+'',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  UpdateOneProfil(id:number,G:any){
    return this.http.put('http://localhost:8083/UpdateProfile/'+id+'',G,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  AddOneProfil(G:any){
    return this.http.post('http://localhost:8083/addProfile',G,{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  getListProfils(){
    return this.http.get('http://localhost:8083/AllProfiles').pipe()
  }
}
