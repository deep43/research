import {Component, OnInit, ViewChild} from '@angular/core';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';

interface Sector {
  id?: any;
  name?: any;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('modal') modal: ModalDirective;

  selectedReplacement: Sector = {};

  modalTitle = 'HedgeClause Details';

  appliedThemeClassOnTable = 'ag-theme-balham';
  columnDefs = [
    {
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      width: 20,
      filter: false
    },
    {
      headerName: 'Sector Name', field: 'name',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    }
  ];


  rowData: Sector[] = [
    {id: '1', name: 'Consumer Discretionary'},
    {id: '2', name: 'Consumer Stapes'},
    {id: '3', name: 'Enegry'},
    {id: '4', name: 'Financials'},
    {id: '5', name: 'Health Care'},
    {id: '6', name: 'Industrials'},
    {id: '7', name: 'Information Technology'},
    {id: '8', name: 'Materials'},
    {id: '9', name: 'Real Estate'},
    {id: '10', name: 'Telecommunication Services'},
    {id: '11', name: 'Utilities'},
    {id: '12', name: 'Include CIBCWM Universe Distribution'},
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

