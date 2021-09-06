import { Component, OnInit } from '@angular/core';
import {ProfilService} from '../Services/profil.service';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {saveAs} from 'file-saver';
import {FileServiceService} from '../file-service.service';
import {SconcoursService} from '../Services/sconcours.service';
import {SgestionnaireService} from '../Services/sgestionnaire.service';
import {Router} from '@angular/router';
import {GlobalConstants} from "../GlobalConstants";
import {Fichiers} from "../Model/Fichiers";
import {SinscriptionService} from "../Services/sinscription.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {

  mod = 0;
  pod = 1;
  CMI=1;
  intitled= '';
  objProfils:any;
  filenames: string[] = [];
  Cocnours:any;
  ficResults:any;
  // @ts-ignore
  TabProfils:any[];
  LONG:any;
  goid=0;
  leconcours:any;






  closeResult:any;
  bool=0;
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
  Errors:any;
  err=0;
  UserAlredayEx:any;
  ee=0;
  SavedSubscription:any;
  Prf:any;
  qsd=0;
  ct:any;
  ageCandidat:any;
  constructor(private profil:ProfilService,private route:Router,private fileService:FileServiceService,private cnc:SconcoursService,private ss:SgestionnaireService,
              private isncr:SinscriptionService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.profil.getListProfils().subscribe(
      (resp) => {
        this.objProfils = resp;
      }
    )



    this.currentTime = new Date()
    this.formData = new FormData();
    this.ee =0;
    this.err =0;
    this.bool=0;
    this.mod=1;

    this.nomComplet = "";
    this.adresse = "";
    this.cin ="";
    this.telephone = "";
    this.codePostal = "";
    this.adresseEmail ="";
    this.ville="";
    this.specialite="";
    this.anneeObtentionDiplome="";
    this.diplomeObtenue="";
    this.etablissement="";
    this.motDePasse=""
    this.remotDePasse="";
  }
  Clicked(){
    this.mod =2;
  }
  changeSelection(option:any){
    this.cnc.SpecificConcours(option).subscribe(
      (resp) => {
        this.Cocnours =resp;
      },
      (error) => {
        this.ss.showError('Error Cannot retrieve data from server','Server Issue');
      },
      () => {
        this.pod = 2;
        this.mod = 1;
        this.LONG=this.Cocnours.length;
        this.goid=1;

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
    //this.route.navigate(['Inscription/'+cnc.idConcours+'/'+GlobalConstants.ConcoursName+''])
    this.CMI=3;
    this.leconcours=cnc;






  }

  TOSearch(){
    this.CMI=2;
  }

  OnDownloadResult(cnc:any){
    console.log('hello')

    this.cnc.getResultsOfCnc(cnc.idConcours).subscribe(
      (response) =>{
        this.ficResults = response;
        console.log(this.ficResults)
      },
      (err) => {

      },
      () => {
        this.onDownloadFile(this.ficResults.candidatsConvoques);
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





  AddNewIsncription(){
    this.bool = 1;
    const idConcours = this.leconcours.idConcours;
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
    const remotDePasse = this.remotDePasse;
    const idcnc = this.id;
    const ageCandidat = this.ageCandidat;
    const Arr = ["CIN","DIPLOME","CV"];for (const a of Arr) {
      this.TabFichiers.push(new Fichiers(a,this.nomComplet+ "_"+this.cin +"_"+a+"_"+(this.currentTime.getMonth()+1)+"_"+(this.currentTime.getDate())+"_"+(this.currentTime.getFullYear())+".pdf"));
    }
    let FileTable = this.TabFichiers;
    if (this.MYFILES.size<3){
      FileTable = [];
    }

    this.isncr.AddInscription({concours:idConcours,fichiers:FileTable,motDePasse,nomComplet,adresse,cin,telephone,remotDePasse,codePostal,adresseEmail,ville,specialite,anneeObtentionDiplome,diplomeObtenue,etablissement,ageCandidat},idConcours).subscribe(
      (resp) => {
        // tslint:disable-next-line:no-console
        console.log(resp)
        console.log(resp);
        this.SavedSubscription =resp;


      },
      (error) => {
        this.TabFichiers = [];
        this.ss.showError('Les donnees ne sont pas correctes veuillez reverifier les données saisies','Incoherence de données')
        if (error.status == 406){
          this.Errors = error.error;
          this.err=1;
        }
        if (error.status == 409){
          this.UserAlredayEx = "User Already Exists";
          this.ee = 1;
          this.ss.showError("Utilisateur existe deja veuillez postuler pour un autre concours","Erreur")
        }
      },
      () => {
        console.log(this.SavedSubscription)
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
            if (error.status == 406)
              alert(error);
          },
          ()=> {
            this.Errors = null;
            this.ee =0;
            this.err=0;
            this.ss.showSuccess("You registred successfully","Confirm message")

          }
        );

        const numeroInscription = this.SavedSubscription.idInscription + 10000;
        const nomComplet =this.SavedSubscription.nomComplet;
        const email = this.SavedSubscription.adresseEmail;
        const cin = this.SavedSubscription.cin;
        const concours = this.leconcours.intitled;
        this.isncr.RecuInscription({numeroInscription,nomComplet,email,cin,concours},idConcours).subscribe(
          (resp) => {

            console.log(resp)

          },
          (err) => {
            console.log(err)
          },
          ()=> {
            GlobalConstants.ConcoursName ="";

          }
        )
        this.ss.showSuccess('You registred successfully an Email sent to your mail account','verification 200')
        this.nomComplet = "";
        this.adresse = "";
        this.cin ="";
        this.telephone = "";
        this.codePostal = "";
        this.adresseEmail ="";
        this.ville="";
        this.specialite="";
        this.anneeObtentionDiplome="";
        this.diplomeObtenue="";
        this.etablissement="";
        this.motDePasse=""
        this.remotDePasse="";
        this.ee=0;
        this.err=0;
        this.DownloadRecu();
        this.bool =0;
        this.mod=2;
      }

    )
    this.bool =0;
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  DownloadRecu(){
    const nm =this.SavedSubscription.idInscription + 10000;
    const nom = this.SavedSubscription.nomComplet;
    const cin = this.SavedSubscription.cin
    this.onDownloadFile(nom+"_"+nm+"_"+cin+"-"+this.leconcours.idConcours+".pdf");
    this.qsd = 0;
  }

}


