import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SconcoursService} from '../Services/sconcours.service';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import { saveAs } from 'file-saver';

import {FileServiceService} from '../file-service.service';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {GlobalConstants} from "../GlobalConstants";
import {SAuthentificationService} from "../Services/sauthentification.service";

@Component({
  selector: 'app-home-gestionnaire',
  templateUrl: './home-gestionnaire.component.html',
  styleUrls: ['./home-gestionnaire.component.css']
})
export class HomeGestionnaireComponent implements OnInit {
  mod = 1;
  motcle:any='';
  Cocnours:any;
  pages:any;
  currenPage:any=0;
  size = 5;
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  Headline ='';
  darkEnabled:any;
  constructor(private route:Router,private cnc:SconcoursService,private ss:SgestionnaireService,
              private fileService: FileServiceService,private srv:SAuthentificationService) {
  }



  ngOnInit(): void {
    this.srv.loadToken();
    this.srv.getDirectionTest().subscribe(
      (resp) => {

      },
      (error) => {
        this.srv.logout();
        this.route.navigateByUrl('/LoginPage');
      }
    )
    this.darkEnabled =GlobalConstants.darkEnabled;
    this.cnc.getConcours(this.motcle,this.size,this.currenPage).subscribe(
      (resp) => {
        this.Cocnours =resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
      },
      (error) => {
        this.ss.showError('Internal Server Error Contact The Admin','Error 500 Failed to load data')
      },
      () => {
        this.ss.showSuccess('Data Loaded Successfully','Message de Confirmation 200')
      }
    )

  }
  chercher(){
    this.cnc.getConcours(this.motcle,this.size,this.currenPage).subscribe(
      (resp) => {
        this.Cocnours =resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
      },
      (error) => {
        // tslint:disable-next-line:no-console
        console.log(error);
      },
      () => {
        // tslint:disable-next-line:no-console
        console.log('completed');
      }
    )
  }
  setClickedRow(obj:any){}
  gotoPage(p:any){
    this.currenPage = p;
    this.chercher();
  }
  ToNewConcours(){
    this.route.navigate(['Admin/AddConcours']);
  }
  ToNewCentre(){
    this.route.navigate(['Admin/AddCentre']);
  }
  ToListCentre(){
    this.route.navigate(['Admin/listCentres']);
  }
  // define a function to download files
  onDownloadFile(filename: string): void {
    this.fileService.download(filename).subscribe(
      event => {
        // tslint:disable-next-line:no-console
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        // tslint:disable-next-line:no-console
        console.log(error);
      },
      () => {
        window.open("C:\\Users\\LARHCHIM ISMAIL/Downloads/null (11).pdf" + '#page=' + 1, '_blank', '', true);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        // tslint:disable-next-line:no-console
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!],
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        // tslint:disable-next-line:no-console
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }
  GOHOME(){
    this.route.navigate(['Admin'])
  }

  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }



}
