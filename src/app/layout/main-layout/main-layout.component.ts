import { Component, OnInit } from '@angular/core';
import {fadeAnimation} from '../../component/helpers/animations/fade-router-animation';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [ fadeAnimation ]
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
