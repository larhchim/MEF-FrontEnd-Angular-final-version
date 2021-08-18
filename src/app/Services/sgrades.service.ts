import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SgradesService {

  constructor(private http:HttpClient) { }

  getAllGrades(mc:any,size:any,page:any){
    return this.http.get('http://localhost:8083/SearchGrade?mc='+mc+'&size='+size+'&page='+page+'').pipe()
  }
  getListProfils(){
    return this.http.get('http://localhost:8083/AllProfiles').pipe()
  }
  AddNewGrade(G:any){
    return this.http.post('http://localhost:8083/AddGrade',G).pipe()
  }
  getProfilManqueGrade(id:number){
    return this.http.get('http://localhost:8083/ProfilsManqueGrade/'+id+'').pipe()
  }
  ModifyGrade(id:number,G:any){
    return this.http.put('http://localhost:8083/UpdateGrade/'+id+'',G).pipe()
  }
}
