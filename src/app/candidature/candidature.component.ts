import { Component, OnInit } from '@angular/core';
import {ProfilService} from '../Services/profil.service';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {saveAs} from 'file-saver';
import {FileServiceService} from '../file-service.service';
import {SconcoursService} from '../Services/sconcours.service';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import {Router} from '@angular/router';
import {GlobalConstants} from "../GlobalConstants";

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {

  mod = 1;
  pod = 1;
  intitled= '';
  objProfils:any;
  filenames: string[] = [];
  Cocnours:any;
  fileStatus = { status: '', requestType: '', percent: 0 };

  // @ts-ignore
  TabProfils:any[];
  constructor(private profil:ProfilService,private route:Router,private fileService:FileServiceService,private cnc:SconcoursService,private ss:SgestionnaireService) { }

  ngOnInit(): void {
    this.profil.getListProfils().subscribe(
      (resp) => {
        this.objProfils = resp;
      }
    )
  }
  Clicked(){
    this.mod =2;
  }
  changeSelection(option:any){
    this.cnc.SpecificConcours(option).subscribe(
      (resp) => {
        this.Cocnours =resp;
        console.log(this.Cocnours)
      },
      (error) => {
        this.ss.showError('Error Cannot retrieve data from server','Server Issue');
      },
      () => {
        this.pod = 2;
        this.mod = 1;

        GlobalConstants.ConcoursName = option;

      }
    )
  }

  onDownloadFile(filename: string): void {
    this.fileService.download(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
      },
      () => {
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
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  setClickedRow(cnc:any){
    this.mod =1;
    this.pod =1;
    this.route.navigate(['Inscription/'+cnc.idConcours+'/'+GlobalConstants.ConcoursName+''])
  }
}


