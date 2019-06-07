import {Component, OnInit, ViewChild} from '@angular/core';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';

interface Sector {
  id?: any;
  rating?: any;
  ticker?: any;
  companyName?: any;
  analyst?: any;
  status?: any;
  expires?: any;
}

@Component({
  selector: 'app-restricted-flag',
  templateUrl: './restricted-flag.component.html',
  styleUrls: ['./restricted-flag.component.scss']
})

export class RestrictedFlagComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('modal') modal: ModalDirective;

  selectedReplacement: Sector = {};

  modalTitle = 'HedgeClause Details';

  appliedThemeClassOnTable = 'ag-theme-balham';
  columnDefs = [
    {
      headerName: 'Apply Override',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      width: 40,
      filter: false
    },
    {
      headerName: 'Rating', field: 'rating',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Ticker', field: 'ticker',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Company Name', field: 'companyName',
      width: 600, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Analyst', field: 'analyst',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Status', field: 'status',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    }
  ];
  rowData: Sector[] = [
    {id: '1', rating: 'R', ticker: 'CJR.B-TSX', companyName: 'Corus Entertainment Inc.', analyst: 'Bek', status: 'Active'},
    {id: '2', rating: 'R', ticker: 'EMA-TSX', companyName: 'Emera Inc.', analyst: 'Catellier', status: 'Active'},
    {id: '3', rating: 'R', ticker: 'GOLD-NYSE', companyName: 'Barrick Gold Corporation', analyst: 'Soni', status: 'Active'},
    {id: '4', rating: 'R', ticker: 'NEM-NYSE', companyName: 'Newmont goldcorp Corporation.', analyst: 'Soni', status: 'Active'},
    {id: '5', rating: 'R', ticker: 'ONEX-TSX', companyName: 'Onex Corporation.', analyst: 'Holden', status: 'Active'},
    {id: '6', rating: 'R', ticker: 'SNC-TSX', companyName: 'SNC-Lavalin Group Inc.', analyst: 'Bout', status: 'Active'},
    {id: '7', rating: 'R', ticker: 'TCN-TSX', companyName: 'Tricon Capital Group Inc.', analyst: 'Wilkinson', status: 'Active'},
    {id: '8', rating: 'R', ticker: 'WJA-TSX', companyName: 'WestJet Airlines Ltd.', analyst: 'Chiang', status: 'Active'},
  ];

  columnDefsRemoved = [
    {
      headerName: 'Remove Override',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      width: 40,
      filter: false
    },
    {
      headerName: 'Rating', field: 'rating',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Ticker', field: 'ticker',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Company Name', field: 'companyName',
      width: 600, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Analyst', field: 'analyst',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Expires', field: 'expires',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    }
  ];
  rowDataRemoved: Sector[] = [
    {id: '1', rating: 'OP', ticker: 'ATZ-TSX', companyName: 'Aritzia Inc.', analyst: 'Petrie', expires: '05/15/2019 16:39'}
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  gridApi;
  gridColumnApi;
  selectedRowsPerPage = 13;
  customFlag = true;
  active = true;

  constructor(private modalService: BsModalService) {
  }

  openModal() {
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
  }

  addNewClause() {
    this.selectedReplacement = {};
    this.modalTitle = 'New Custom Footnote';
    this.openModal();
  }

  editClause() {
    this.modalTitle = 'Edit Custom Footnote';
    this.openModal();
  }

  saveFootnote() {
    if (!this.selectedReplacement.id) {
      this.selectedReplacement.id = this.rowData.length;
      this.rowData = [this.selectedReplacement, ...this.rowData];
      this.closeModal();

      return;
    }

    this.rowData = this.rowData.map((row) => {
      if (row.id === this.selectedReplacement.id) {
        row = this.selectedReplacement;
      }

      return row;
    });

    this.closeModal();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit() {
  }

}

