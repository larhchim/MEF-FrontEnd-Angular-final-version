import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http:HttpClient) { }

  getAllProfils(motcle:any,page:any,size:any){
    return this.http.get('http://localhost:8083/SearchProfils?mc='+motcle+'&page='+page+'&size='+size+'').pipe()
  }
  UpdateOneProfil(id:number,G:any){
    return this.http.put('http://localhost:8083/UpdateProfile/'+id+'',G).pipe()
  }
  AddOneProfil(G:any){
    return this.http.post('http://localhost:8083/addProfile',G).pipe()
  }
  getListProfils(){
    return this.http.get('http://localhost:8083/AllProfiles').pipe()
  }
}
