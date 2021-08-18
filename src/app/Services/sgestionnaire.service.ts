import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { ToastService } from 'ng-uikit-pro-standard';

@Injectable({
  providedIn: 'root'
})
export class SgestionnaireService {

  // @ts-ignore
  constructor(private http:HttpClient,private toastrService: ToastService) { }

  getGestionnaire(mc:string,page:number,size:number){
    return this.http.get('http://localhost:8083/SearchGestionnaires?mc='+mc+'&size='+size+'&page='+page+'').pipe()
  }
  addGestionnaire(G:any){
    return this.http.post('http://localhost:8083/AddGest',G).pipe()
  }

  getDirections(){
    return this.http.get('http://localhost:8083/ListDirs').pipe()
  }

  updateGestionnaire(id:number,G:any){
    return this.http.put('http://localhost:8083/UpdateGest/'+id+'',G);
  }

  showSuccess(message:string,title:string) {
    const options = { closeButton: true, tapToDismiss: false, titleClass: 'yellow', opacity: 1 };
    this.toastrService.success(message, title, options);
  }
  showError(message:string,title:string) {
    const options = { enableHtml: false, positionClass: 'md-toast-bottom-right', opacity: 1 };
    this.toastrService.error(message, title, options);
  }

  getADirection(id:number){
    return this.http.get('http://localhost:8083/Directions/'+id+'').pipe()
  }

}
