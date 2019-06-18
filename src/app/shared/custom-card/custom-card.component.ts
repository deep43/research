import {Component, OnInit, Input, Output, ViewEncapsulation, ViewChild, TemplateRef, EventEmitter} from '@angular/core';
// import * as moment from 'moment';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {BsModalService, BsModalRef, ModalDirective} from 'ngx-bootstrap/modal';
import {FunctionDefinition} from '@angular/compiler-cli/src/ngtsc/host';
// import {RefreshService} from '../service/refresh.service';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

// import ObjectContaining = jasmine.ObjectContaining;

@Component({
  selector: 'app-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '100%',
      })),
      state('closed', style({
        overflow: 'hidden',
        height: '0',
      })),
      transition('open => closed', [
        animate('0s')
      ]),
      transition('closed => open', [
        animate('0s')
      ]),
    ]),
    trigger('openCloseEffect', [
      // ...
      state('openEffect', style({
        height: '100%',
      })),
      state('closedEffect', style({
        height: 'auto',
      })),
      transition('open => closed', [
        animate('0s')
      ]),
      transition('closed => open', [
        animate('0s')
      ]),
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class CustomCardComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('modal') modal: ModalDirective;

  @Input() noActions: boolean;
  @Input() headerContent: string;
  @Input() title: string;
  @Input() openModalCallback: any;
  @Output() public onModalOpen: EventEmitter<any> = new EventEmitter();

  fullCard = '';
  fullCardIcon = '';
  appliedThemeClassOnTable = 'ag-theme-balham-dark';

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    animateRows: true
  };
  gridApis = [];
  gridApi;
  gridColumnApi;

  columnDefs = [
    {
      headerName: 'Trade Date', width: 220, field: 'tradeDate', filter: true, suppressMovable: true
    }, {
      headerName: 'Trade Reference', width: 220, field: 'tradeRef', filter: true, suppressMovable: true
    },
    {
      headerName: 'Client', width: 220, field: 'client', filter: true, suppressMovable: true,
      cellRenderer: (params) => {
        return '<a href="#/client"><span class="client-link">'
          + params.getValue() + '</span></a>';
      }
    },
    {
      headerName: 'Symbol', width: 220, field: 'symbol', filter: true, suppressMovable: true,
      cellRenderer: (params) => {
        return '<a href="#/client"><span class="client-link">'
          + params.getValue() + '</span></a>';
      }
    },
    {
      headerName: 'BuySell', width: 220, field: 'buySell', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Shares', width: 220, field: 'shares', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Price', width: 220, field: 'price', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Notional', width: 220, field: 'notional', filter: true, resizable: true, suppressMovable: true
    },
    {
      headerName: 'Commission', width: 220, field: 'commission', filter: true, resizable: true, suppressMovable: true
    }
  ];

  rowData = [
    {
      tradeDate: '01/01/2019',
      tradeRef: 'ADP34232',
      client: 'EY',
      symbol: 'EY',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/01/2019',
      tradeRef: 'ADP34232',
      client: 'EY',
      symbol: 'EY',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/01/2019',
      tradeRef: 'ADP34232',
      client: 'EY',
      symbol: 'EY',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/01/2019',
      tradeRef: 'ADP34232',
      client: 'Goldman Sachs',
      symbol: 'Goldman Sachs',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/02/2019',
      tradeRef: 'CDP34232',
      client: 'Goldman Sachs',
      symbol: 'Goldman Sachs',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/02/2019',
      tradeRef: 'CDP34732',
      client: 'Goldman Sachs',
      symbol: 'Goldman Sachs',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/02/2019',
      tradeRef: 'CDP33732',
      client: 'Goldman Sachs',
      symbol: 'Goldman Sachs',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/02/2019',
      tradeRef: 'CDP33732',
      client: 'Goldman Sachs',
      symbol: 'Goldman Sachs',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/02/2019',
      tradeRef: 'CDP33732',
      client: 'PWC',
      symbol: 'PWC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/02/2019',
      tradeRef: 'DDP33732',
      client: 'PWC',
      symbol: 'PWC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/03/2019',
      tradeRef: 'DDP44732',
      client: 'PWC',
      symbol: 'PWC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/03/2019',
      tradeRef: 'DDP44732',
      client: 'PWC',
      symbol: 'PWC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/03/2019',
      tradeRef: 'DDP44232',
      client: 'PWC',
      symbol: 'PWC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/03/2019',
      tradeRef: 'DDP44232',
      client: 'PWC',
      symbol: 'PWC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/03/2019',
      tradeRef: 'DDP44232',
      client: 'PWC',
      symbol: 'PWC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/03/2019',
      tradeRef: 'EDP44232',
      client: 'BSE',
      symbol: 'BSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/04/2019',
      tradeRef: 'EDP44232',
      client: 'BSE',
      symbol: 'BSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/04/2019',
      tradeRef: 'EDP44232',
      client: 'BSE',
      symbol: 'BSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/04/2019',
      tradeRef: 'EDP44232',
      client: 'BSE',
      symbol: 'BSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/04/2019',
      tradeRef: 'EDP55232',
      client: 'BSE',
      symbol: 'BSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/04/2019',
      tradeRef: 'EDP55232',
      client: 'NSE',
      symbol: 'NSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/04/2019',
      tradeRef: 'RDP55232',
      client: 'NSE',
      symbol: 'NSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/05/2019',
      tradeRef: 'RDP52132',
      client: 'NSE',
      symbol: 'NSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/05/2019',
      tradeRef: 'RDP52132',
      client: 'NSE',
      symbol: 'NSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/05/2019',
      tradeRef: 'RDP32132',
      client: 'NSE',
      symbol: 'NSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/05/2019',
      tradeRef: 'RDP32132',
      client: 'NSE',
      symbol: 'NSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/05/2019',
      tradeRef: 'RDP32132',
      client: 'NSE',
      symbol: 'NSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/06/2019',
      tradeRef: 'WDP32144',
      client: 'NSE',
      symbol: 'NSE',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/06/2019',
      tradeRef: 'WDP32144',
      client: 'CMC',
      symbol: 'CMC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/06/2019',
      tradeRef: 'WDP33244',
      client: 'CMC',
      symbol: 'CMC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/06/2019',
      tradeRef: 'WDP33244',
      client: 'CMC',
      symbol: 'CMC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/06/2019',
      tradeRef: 'WDP33244',
      client: 'CMC',
      symbol: 'CMC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
    {
      tradeDate: '01/06/2019',
      tradeRef: 'WDP33244',
      client: 'CMC',
      symbol: 'CMC',
      buySell: 'B',
      shares: '50,000',
      price: '$2.00',
      notional: '$200,000',
      commission: ' $2,500'
    },
  ];

  selectedRowsPerPage = 8;
  subscription: Subscription;
  minimise = false;

  constructor(private modalService: BsModalService, /* private refreshService: RefreshService*/) {

  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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

    return array.map(x => Object.assign({}, x));
  }

  openModal() {
    this.modal.show();
    /*this.subscription = this.refreshService.getRefreshedData().subscribe(() => {
      this.rowData = this.shuffle(this.rowData);
    });*/
  }

  toggleMinimise() {
    this.minimise = !this.minimise;
  }

  handler(type: string, $event: ModalDirective) {
    this.onModalOpen.emit();
  }

  ngOnInit() {

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApis.push(params.api);
    this.gridColumnApi = params.columnApi;
  }

  onPageSizeChanged(newPageSize) {
    const value = this.selectedRowsPerPage; // document.getElementById('page-size').value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  fullScreen(event) {
    this.fullCard = this.fullCard === 'full-card' ? '' : 'full-card';
    this.fullCardIcon = this.fullCardIcon === 'icon-maximize' ? 'icon-minimize' : 'icon-maximize';
  }

}
