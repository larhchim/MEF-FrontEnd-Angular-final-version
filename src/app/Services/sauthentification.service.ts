import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SAuthentificationService {

  private jwtToken:any=null;
  private host :string = "http://localhost:8083";
  constructor(private http:HttpClient) { }

  login(user:any){
    return this.http.post(this.host+'/login',user,{observe:'response'}).pipe()
  }

  saveToken(jwt: any){
    localStorage.setItem('token',jwt);
  }

  loadToken(){
    this.jwtToken = localStorage.getItem('token');
  }

  getDirectionTest(){
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+"/ListDirs",{headers:new HttpHeaders({'Authorization':this.jwtToken})}).pipe()
  }

  logout(){
    this.jwtToken = null;
    localStorage.removeItem('token');
  }

  leToken(){
    if (this.jwtToken == null) return localStorage.getItem('token');
    return this.jwtToken;
  }

}
