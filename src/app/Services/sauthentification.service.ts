import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelper} from "angular2-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SAuthentificationService {

  private jwtToken:any=null;
  private host :string = "http://localhost:8083";
  // @ts-ignore
  private roles:Array<any>;
  private username="";
  constructor(private http:HttpClient,private route:Router) { }

  login(user:any){
    return this.http.post(this.host+'/login',user,{observe:'response'}).pipe()
  }

  saveToken(jwt: any){
    this.jwtToken = jwt;
    localStorage.setItem('token',jwt);
    let jwtHelper = new JwtHelper();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
    this.username = jwtHelper.decodeToken(this.jwtToken).sub;
    localStorage.setItem('username',this.username);
  }

  loadToken(){
    this.jwtToken = localStorage.getItem('token');
    let jwtHelper = new JwtHelper();
    if(this.jwtToken!=null){
      this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
      this.username = jwtHelper.decodeToken(this.jwtToken).sub;
    }
  }

  getDirectionTest(){
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+"/ListDirs",{headers:new HttpHeaders({'Authorization':this.jwtToken})}).pipe()
  }

  logout(){
    this.jwtToken = null;
    this.username ="";
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  leToken(){
    if (this.jwtToken == null) return localStorage.getItem('token');
    return this.jwtToken;
  }

  leUsername(){
    if (this.username == "") return localStorage.getItem('username');
    return this.username;
  }

  isAdmin(){
    if (this.roles!=null)
    for (let  au of this.roles) {
      if (au.authority == "ADMIN") return true;
    }
    return false;
  }

  isGestLV1(){
    if (this.roles!=null)
      for (let au of this.roles) {
      if (au.authority == "GESTLV1") return true;
    }
    return false;
  }

  isGestLV2(){
    if (this.roles!=null)
      for (let au of this.roles){
      if (au.authority == "GESTLV2") return true;
    }
    return false;
  }

}
