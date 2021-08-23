import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SAuthentificationService {

  private host :string = "http://localhost:8083";
  constructor(private http:HttpClient) { }

  login(user:any){

    return this.http.post(this.host+'/login',user,{observe:'response'}).pipe()

  }
}
