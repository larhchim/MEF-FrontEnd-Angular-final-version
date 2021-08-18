import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SconcoursService {

  constructor(private http:HttpClient) { }
  getConcours(motcle:any,size:any,page:any){
    return this.http.get('http://localhost:8083/SearchConcours?mc='+motcle+'&size='+size+'&page='+page+'').pipe()
  }
  AddConcours(G:any){
    return this.http.post('http://localhost:8083/addConcours',G).pipe()
  }
  SpecificConcours(name:any){
    return this.http.get('http://localhost:8083/SearchBYProf/'+name+'').pipe()
  }
}
