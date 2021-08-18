import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {saveAs} from 'file-saver';
import {FileServiceService} from '../file-service.service';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import {SinscriptionService} from '../Services/sinscription.service';
import {formatDate} from '@angular/common';
import {Fichiers} from '../Model/Fichiers';
@Component({
  selector: 'app-souscription',
  templateUrl: './souscription.component.html',
  styleUrls: ['./souscription.component.css']
})
export class SouscriptionComponent implements OnInit {

  id: any;
  nomComplet:any;
  adresse:any;
  cin:any;
  telephone:any;
  codePostal:any;
  adresseEmail:any;
  ville:any;
  specialite:any;
  anneeObtentionDiplome:any;
  diplomeObtenue:any;
  etablissement:any;
  status:any;
  motDePasse:any;
  remotDePasse:any;
  fileStatus = { status: '', requestType: '', percent: 0 };
  // @ts-ignore
  filenames: string[] = [];
  currentTime:any;
  formData:any;
  MYFILES:Map<any, any> = new Map<any, any>();
  c1=false;
  c2=false;
  c3=false;
  // @ts-ignore
  TabFichiers:Fichiers[] = [] ;
  constructor(private activatedRoute: ActivatedRoute,private fileService:FileServiceService ,private ss:SgestionnaireService,private isncr:SinscriptionService) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.currentTime = new Date()
    this.formData = new FormData();
  }
  AddNewIsncription(){
    const idConcours = this.id;
    const nomComplet = this.nomComplet;
    const adresse = this.adresse;
    const cin = this.cin;
    const telephone = this.telephone;
    const codePostal = this.codePostal;
    const adresseEmail = this.adresseEmail;
    const ville = this.ville;
    const specialite = this.specialite;
    const anneeObtentionDiplome = this.anneeObtentionDiplome;
    const diplomeObtenue = this.diplomeObtenue;
    const etablissement = this.etablissement;
    const motDePasse = this.motDePasse
    const idcnc = this.id;
    const Arr = ["CIN","DIPLOME","CV"];
    for (const a of Arr) {
      this.TabFichiers.push(new Fichiers(a,this.nomComplet+ "_"+this.cin +"_"+a+"_"+(this.currentTime.getMonth()+1)+"_"+(this.currentTime.getDate())+"_"+(this.currentTime.getFullYear())+".pdf"));
    }
    const FileTable = this.TabFichiers;
    this.isncr.AddInscription({concours:idConcours,fichiers:FileTable,motDePasse,nomComplet,adresse,cin,telephone,codePostal,adresseEmail,ville,specialite,anneeObtentionDiplome,diplomeObtenue,etablissement},idcnc).subscribe(
      (resp) => {
        // tslint:disable-next-line:no-console
        console.log(resp);
      },
      (error) => {
        this.ss.showError('Error cannot add data to server','Error 500 Internal')
      },
      () => {
        // tslint:disable-next-line:forin
        for (const [key, value] of this.MYFILES){
          this.formData.append('files',value, this.nomComplet+ "_"+this.cin +"_"+key+"_"+(this.currentTime.getMonth()+1)+"_"+(this.currentTime.getDate())+"_"+(this.currentTime.getFullYear())+".pdf");
        }
        this.fileService.upload(this.formData).subscribe(
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
        this.ss.showSuccess('You registred successfully an Email sent to your mail account','verification 200')
      }

    )
  }

  onUploadFiles(files: File[],name:any): void {
    for (const file of files) {
      this.MYFILES.set(name,file)
      // this.formData.append('files', file, this.nomComplet+ "_"+this.cin +"_"+name+"_"+(this.currentTime.getMonth()+1)+"_"+(this.currentTime.getDate())+"_"+(this.currentTime.getFullYear())+".pdf");
    }
    for (const [key, value] of this.MYFILES){
      console.log(key,value)
    }
  }


  // define a function to download files
  fileInput: any;
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
