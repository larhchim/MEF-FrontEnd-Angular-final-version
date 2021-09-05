import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SconcoursService} from '../Services/sconcours.service';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import { saveAs } from 'file-saver';

import {FileServiceService} from '../file-service.service';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {GlobalConstants} from "../GlobalConstants";
import {SAuthentificationService} from "../Services/sauthentification.service";
import {SinscriptionService} from "../Services/sinscription.service";
import {HistoriqueCandidatureService} from "../Services/historique-candidature.service";

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
  jbutton1=0;
  jbutton2=0;
  jbutton3=0;
  RefusedMotif:any;
  InstanceMotif:any;

  motcle2:any='';
  currenPage2:any=0;
  size2 = 5;
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  Headline ='';
  darkEnabled:any;
  AllInscriptions:any;
  pages2:any;
  idc:any;
  ObjInscription:any;

  idh:any;
  pagesh:any;
  currenPageh:any=0;
  sizeh = 5;
  HistoryCandidateh:any;
  constructor(private route:Router,private cnc:SconcoursService,private ss:SgestionnaireService,
              private fileService: FileServiceService,public srv:SAuthentificationService,
              private sinsc:SinscriptionService,private history:HistoriqueCandidatureService) {
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

  setClickedRow(obj:any){
    this.mod = 2;
    this.idc=obj.idConcours;
    this.sinsc.SearchInscription(this.motcle2,this.size2,this.currenPage2,obj.idConcours).subscribe(
      (resp) =>{
        this.AllInscriptions = resp;
        // @ts-ignore
        this.pages2 = new Array(resp.totalPages);

      },
      (error) => {

      },
      ()=> {

      }
    )

  }

  setClickedRowInscription(subs:any){

    this.ObjInscription =subs;
    this.mod =3

  }

  gotoPage2(p:any){
    this.currenPage2=p;
    this.sinsc.SearchInscription(this.motcle2,this.size2,this.currenPage2,this.idc).subscribe(
      (resp) =>{
        this.AllInscriptions = resp;
        // @ts-ignore
        this.pages2 = new Array(resp.totalPages);

      },
      (error) => {

      },
      ()=> {

      }
    )
  }

  chercher2(){
    this.sinsc.SearchInscription(this.motcle2,this.size2,this.currenPage2,this.idc).subscribe(
      (resp) =>{
        this.AllInscriptions = resp;
        // @ts-ignore
        this.pages2 = new Array(resp.totalPages);

      },
      (error) => {

      },
      ()=> {

      }
    )
  }

  GoBack(){
    this.mod=1;
  }

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


  AcceptQuery(){

    const described = "Accepté:Cette Inscription a été validé par "+this.srv.leUsername();

    const  refus = false;

    const acceptation = true;

    const instance = false;

    const examinateur = this.srv.leUsername();

     this.history.AddHistoryCandidate({description:described,refus,acceptation,instance,examinateur},this.ObjInscription.idInscription).subscribe(
       (resp) => {

       },
       (error) => {

       },
       () => {

                this.ss.showSuccess('Candidature validé avec succes',"Message de Confirmation")
                this.mod =2;
                this.ObjInscription = null;

       }
     )

  }

  OnRefused(){
    this.jbutton1=2;
    this.jbutton3=2;
    this.jbutton2=1

  }

  OnInstance(){
    this.jbutton1=2;
    this.jbutton2=2;
    this.jbutton3=1;

  }

  OnConfirmRefused(){
    console.log(this.RefusedMotif)

    const  refus = true;

    const acceptation = false;

    const instance = false;

    const examinateur = this.srv.leUsername();

    const described = "Refusé:Cette Inscription a été Refusé par "+this.srv.leUsername()+"Avec Motif:"+this.RefusedMotif;

    this.history.AddHistoryCandidate({description:described,refus,acceptation,instance,examinateur},this.ObjInscription.idInscription).subscribe(
      (resp) => {

      },
      (error) => {

      },
      () => {

        this.ss.showSuccess('Candidature Refusé',"Message de Confirmation")
        this.mod =2;
        this.ObjInscription = null;

      }
    )
  }

  OnConfirmInstance(){

    const described = "Instance:Cette Inscription a été marqué en Instance par "+this.srv.leUsername()+" Avec Motif"+this.InstanceMotif;

    const  refus = false;

    const acceptation = false;

    const instance = true;

    const examinateur = this.srv.leUsername();

    this.history.AddHistoryCandidate({description:described,refus,acceptation,instance,examinateur},this.ObjInscription.idInscription).subscribe(
      (resp) => {

      },
      (error) => {

      },
      () => {

        this.ss.showSuccess('Candidature est marqué en Instance avec succes',"Message de Confirmation")
        this.mod =2;
        this.ObjInscription = null;

      }
    )
  }
  Reinisialiser(){
    this.jbutton3=0;
    this.jbutton2=0;
    this.jbutton1=0;
  }

  GoToHistorique(){
    //this.route.navigate(["/Admin/ConsultHistory/"+this.ObjInscription.idInscription])
    //this.route.navigateByUrl("/Admin/ConsultHistory/"+this.ObjInscription.idInscription)
    this.idh = this.ObjInscription.idInscription;
    this.history.SearchHistoryCandidate(this.sizeh,this.currenPageh,this.idh).subscribe(
      (resp) => {
        this.HistoryCandidateh =resp;
        // @ts-ignore
        this.pagesh = new Array(resp.totalPages);
      },
      () => {

      },
      () => {

      }
    )
    this.mod = 4;
  }

  gotoPageh(p:any){
    this.currenPageh=p;

    this.history.SearchHistoryCandidate(this.sizeh,this.currenPageh,this.idh).subscribe(
      (resp) => {
        this.HistoryCandidateh =resp;
        // @ts-ignore
        this.pages = new Array(resp.totalPages);
      },
      () => {

      },
      () => {

      }
    )
  }

}
