import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SvillesService {

  constructor(private http:HttpClient) { }
  getVilles(){
    return this.http.get('http://localhost:8083/ListVilles').pipe()
  }
}
