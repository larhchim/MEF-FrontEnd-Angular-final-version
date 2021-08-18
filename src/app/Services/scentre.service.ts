import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScentreService {

  constructor(private http:HttpClient) { }
  AddCentre(G:any){
    return this.http.post('http://localhost:8083/addCentre',G).pipe()
  }
  getCentres(motcle:any,size:any,page:any){
    return this.http.get('http://localhost:8083/SearchCentres?mc='+motcle+'&size='+size+'&page='+page+'').pipe()
  }
  getAllCentres(){
    return this.http.get('http://localhost:8083/listCentres').pipe()
  }
}
