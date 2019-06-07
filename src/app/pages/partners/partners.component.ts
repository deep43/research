import {Component, OnInit, ViewChild} from '@angular/core';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';

interface Partner {
  id?: number;
  partner?: string;
  country?: string;
  active?: any;
}

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})

export class PartnersComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('modal') modal: ModalDirective;

  selectedPartner: Partner = {};

  modalTitle = 'Create a New Partner';

  appliedThemeClassOnTable = 'ag-theme-balham';
  columnDefs = [
    {
      headerName: 'Action', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<a href="" class="client-link edit"> Edit </a>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.edit')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedPartner = params.data;
          that.editPartner();
        });
        return eDiv;
      }, pivot: true
    },
    {
      headerName: 'Partner', field: 'partner',
      width: 1000, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Country', field: 'country', width: 200,
      filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {headerName: 'Active', field: 'active', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  gridApi;
  gridColumnApi;
  rowData: Partner[] = [
    {id: 1, partner: 'NetBank Inc.', country: 'us', active: 'False'},
    {id: 2, partner: 'kepler Chuevreux', country: 'fr', active: 'True'},
    {id: 3, partner: 'CIBCEconomics', country: 'ca', active: 'True'},
    {id: 4, partner: 'CIBCMacro', country: 'ca', active: 'False'},
  ];
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

  addNewPartner() {
    this.selectedPartner = {};
    this.modalTitle = 'Create a New Partner';
    this.openModal();
  }

  editPartner() {
    this.modalTitle = 'Edit Partner';
    this.openModal();
  }

  savePartner() {
    if (!this.selectedPartner.id) {
      this.selectedPartner.id = this.rowData.length;
      this.rowData = [this.selectedPartner, ...this.rowData];
      this.closeModal();

      return;
    }

    this.rowData = this.rowData.map((row) => {
      if (row.id === this.selectedPartner.id) {
        row = this.selectedPartner;
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

