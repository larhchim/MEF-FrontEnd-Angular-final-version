import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelper} from "angular2-jwt";

@Injectable({
  providedIn: 'root'
})
export class SAuthentificationService {

  private jwtToken:any=null;
  private host :string = "http://localhost:8083";
  // @ts-ignore
  private roles:Array<any>;
  constructor(private http:HttpClient) { }

  login(user:any){
    return this.http.post(this.host+'/login',user,{observe:'response'}).pipe()
  }

  saveToken(jwt: any){
    this.jwtToken = jwt;
    localStorage.setItem('token',jwt);
    let jwtHelper = new JwtHelper();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
  }

  loadToken(){
    this.jwtToken = localStorage.getItem('token');
    let jwtHelper = new JwtHelper();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
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

  isAdmin(){
    for (let  au of this.roles) {

      if (au.authority == "ADMIN") return true

    }
    return false
  }

}
