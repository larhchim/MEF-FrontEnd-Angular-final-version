import { Component, OnInit } from '@angular/core';
import {SgestionnaireService} from '../Services/sgestionnaire.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private srv:SgestionnaireService) { }

  ngOnInit(): void {
    this.srv.showError('  This source doesn\'t exist\n','ERROR 404 ')
  }

}
