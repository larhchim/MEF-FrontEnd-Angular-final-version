import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SgestionnaireService} from './sgestionnaire.service';
import {SAuthentificationService} from "./sauthentification.service";

@Injectable({
  providedIn: 'root'
})
export class SinscriptionService {

  constructor(private http:HttpClient ,private serv:SAuthentificationService){ }

  AddInscription(G:any,id:any){
    return this.http.post('http://localhost:8083/AddInscription/'+id+'',G).pipe()
  }

  RecuInscription(G:any,id:number){
    return this.http.post("http://localhost:8083/users/export/pdf/"+id,G).pipe()
  }

  SearchInscription(motcle:any,size:any,page:any,id:any){
    return this.http.get('http://localhost:8083/SearchInscriptions/'+id+'?mc='+motcle+'&size='+size+'&page='+page+'',{headers: new HttpHeaders({'Authorization':this.serv.leToken()})}).pipe()
  }

}
