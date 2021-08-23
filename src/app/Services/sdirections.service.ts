import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SAuthentificationService} from "./sauthentification.service";

@Injectable({
  providedIn: 'root'
})
export class SdirectionsService {

  constructor(private http:HttpClient,private serv:SAuthentificationService) { }

  getDirections(mc:any,size:any,page:any){
    return this.http.get('http://localhost:8083/SearchDirections?mc='+mc+'&size='+size+'&page='+page+'',{headers:new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
  getADirection(id:number){
    return this.http.get('http://localhost:8083/Directions/'+id+'').pipe()
  }
  modifyADirection(id:number,G:any){
    return this.http.put('http://localhost:8083/ModifyDir/'+id+'',G);
  }
  getAllDirections(){
    return this.http.get('http://localhost:8083/ListDirs').pipe()
  }

  getOneDir(mc:any){
    return this.http.get('http://localhost:8083/SearchOneDirection/'+mc+'').pipe()
  }
}
