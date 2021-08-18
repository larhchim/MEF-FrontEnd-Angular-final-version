import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SgestionnaireService} from './sgestionnaire.service';

@Injectable({
  providedIn: 'root'
})
export class SinscriptionService {

  constructor(private http:HttpClient ){ }

  AddInscription(G:any,id:any){
    return this.http.post('http://localhost:8083/AddInscription/'+id+'',G).pipe()
  }
}
