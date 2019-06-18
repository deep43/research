import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import {MessageService} from '../../shared/shared-service';
import {Subscription} from 'rxjs';
// tslint:disable-next-line:no-duplicate-imports

const moment = _moment;

@Component({
  selector: 'app-first-table',
  templateUrl: './first-table.component.html',
  styleUrls: ['./first-table.component.scss'],
  providers: [
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class FirstTableComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  minDate = new Date(2019, 6, 1);
  maxDate = new Date(2019, 6, 30);
  appliedThemeClassOnTable = 'ag-theme-balham';
  columnDefs = [
    {headerName: 'Analyst', field: 'analysis', width: 150, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Title', field: 'title', width: 150, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Sectors', field: 'sectors', width: 150, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'No of Pages', field: 'noOfPages', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {
      headerName: 'Publication Category',
      field: 'publicationCategory',
      width: 150,
      filter: 'agTextColumnFilter',
      pivot: true,
      suppressMovable: true
    },
    {headerName: 'Report Type', field: 'reportType', width: 150, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
  ];
  date3 = new FormControl(new Date());

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  gridApis = [];
  gridApi;
  gridColumnApi;
  rowData = [
    {
      day: '14',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '15',
      analysis: 'Pending',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '17',
      analysis: 'Phase 2',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '18',
      analysis: 'Pending',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '19',
      analysis: 'Phase 3',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
  {
      day: '20',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '21',
      analysis: 'Pending',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '22',
      analysis: 'Phase 2',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '23',
      analysis: 'Pending',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '24',
      analysis: 'Phase 3',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
  ];
  selectedRowsPerPage = 5;
  subscription: Subscription;

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      setTimeout(() => {
        this.gridApis.map((api) => {
          api.sizeColumnsToFit();
        });
      }, 500);
    });
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApis.push(params.api);
    this.gridColumnApi = params.columnApi;

    /*window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });*/
  }

  onFirstDataRendered(params) {
    // this.params = params;
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    });
  }

  dateSelected($event) {
    this.rowData = [...this.shuffle(this.rowData)];
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
