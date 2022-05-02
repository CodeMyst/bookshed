import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/api/global.constants';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  goToPage = GlobalConstants.goToPage;

  constructor() { }

  ngOnInit(): void {
  }

}
