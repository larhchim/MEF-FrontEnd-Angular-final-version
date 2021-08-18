export class Gestionnaire {
  // @ts-ignore
  idGestionnaire: number ;
  // @ts-ignore
  etatcCompte: boolean;
  // @ts-ignore
  habilitation: number;
  // @ts-ignore
  login: string;
  // @ts-ignore
  administrator: boolean;

  constructor(idGestionnaire:any = null,etatCompte = false,habilitation = 0,login ="",administrator =false) {
  }
}
