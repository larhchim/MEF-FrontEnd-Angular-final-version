import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ScentreService} from '../Services/scentre.service';
import {ProfilService} from '../Services/profil.service';
import {SdirectionsService} from '../Services/sdirections.service';
import {SconcoursService} from '../Services/sconcours.service';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import { saveAs } from 'file-saver';
import {FileServiceService} from '../file-service.service';
import {Fichiers} from '../Model/Fichiers';

@Component({
  selector: 'app-ajouter-concours',
  templateUrl: './ajouter-concours.component.html',
  styleUrls: ['./ajouter-concours.component.css']
})
export class AjouterConcoursComponent implements OnInit {

  mod = 1;
  dateConcours:any;
  dateLimiteConcours:any;
  intitled:any;
  nombrePostes:any;
  etat:any;
  id:any;
  objdirections:any;
  idProfil:any;
  objProfils:any;
  AddedConcours:any;
  idCentre:any;
  objCentres:any;
  // @ts-ignore
  TabCentres:any[];
  // @ts-ignore
  TabProfils:any[];
  // @ts-ignore
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  datePassage:any;

  constructor(private route:Router,private centre:ScentreService,
              private profil:ProfilService,private direction:SdirectionsService,
              private concours:SconcoursService,
              private ss:SgestionnaireService,
              private fileService: FileServiceService) { }

  ngOnInit(): void {
    this.TabCentres = [];
    this.TabProfils = [];
    this.centre.getAllCentres().subscribe(
      (resp) => {
        this.objCentres =resp;
      }
    )
    this.profil.getListProfils().subscribe(
      (resp) => {
        this.objProfils = resp;
      }
    )
    this.direction.getAllDirections().subscribe(
      (resp) => {
        this.objdirections = resp;
      }
    )
  }
  BackToList(){
    this.route.navigate(['Admin/HomeGest']);
  }
  BackTo(){
    this.mod = 1;
  }
  AddNewConcours(){
    const dateConcours = this.dateConcours;
    const dateLimiteConcours = this.dateLimiteConcours;
    const intitled = this.intitled;
    const etat = this.etat;
    const nombrePostes = this.nombrePostes;
    const id = this.id;
    const idCentre = this.idCentre;
    const datePassage = this.datePassage;
    const TabCentres = this.TabCentres;
    const TabProfils = this.TabProfils;
    const exigences = this.filenames[0];
    this.concours.AddConcours({dateConcours,dateLimiteConcours,datePassage,exigences,intitled,etat,nombrePostes,direction:{id},centres:TabCentres,profils:TabProfils}).subscribe(
      (resp) => {
        this.AddedConcours =resp;
      },
      (error) => {
        this.ss.showError('Internal Server Error Contact the Admin','Error 500');
        // tslint:disable-next-line:no-console
        console.log(error);
      },
      () => {
        this.mod = 2;
        this.ss.showSuccess('Data Saved Successfully See the List','Message de Confirmation 200');
      }
    )
  }
  changeSelection(option:any){
    this.TabProfils.push(option);
    this.objProfils.splice(option,1);
    // tslint:disable-next-line:no-console
    console.log(this.TabProfils);
  }

  clickedOption(option:any){
    this.TabCentres.push(option);
    this.objCentres.splice(option,1);
    // tslint:disable-next-line:no-console
    console.log(this.TabCentres)
  }

  // define a function to upload files
  onUploadFiles(files: File[] ): void {
    const formData = new FormData();
    for (const file of files) { formData.append('files', file, file.name); }
    this.fileService.upload(formData).subscribe(
      event => {
        // tslint:disable-next-line:no-console
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        // tslint:disable-next-line:no-console
        console.log(error);
      }
    );
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
}
