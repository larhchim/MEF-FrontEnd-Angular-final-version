import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SAuthentificationService} from "./sauthentification.service";

@Injectable({
  providedIn: 'root'
})
export class SvillesService {

  constructor(private http:HttpClient,private serv:SAuthentificationService) { }
  getVilles(){
    return this.http.get('http://localhost:8083/ListVilles',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }
}
