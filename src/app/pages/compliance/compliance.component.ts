import {Component, OnInit, ViewChild} from '@angular/core';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';


interface clause {
  id?: number;
  footnote?: string;
  shortDesc?: string;
  ibFlag?: any;
  isCustom?: string;
}

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.scss']
})
export class ComplianceComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('modal') modal: ModalDirective;

  selectedClause: clause = {};

  modalTitle = 'HedgeClause Details';

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

          that.selectedClause = params.data;
          that.editClause();
        });
        return eDiv;
      }, pivot: true
    },
    {
      headerName: 'Footnote', field: 'footnote',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Short Description', field: 'shortDesc', width: 1200,
      filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {headerName: 'IB Flag', field: 'ibFlag', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Is Custom', field: 'isCustom', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},

  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  gridApi;
  gridColumnApi;
  rowData: clause[] = [
    {id: 1, footnote: '1a', shortDesc: '1a - Corp. - Makes market', ibFlag: 'False', isCustom: 'False'},
    {id: 2, footnote: '1b', shortDesc: '1b - Inc. - Makes market', ibFlag: 'False', isCustom: 'False'},
    {id: 3, footnote: '1c', shortDesc: '1c - Plc. - Makes market', ibFlag: 'False', isCustom: 'False'},
    {id: 4, footnote: '2a', shortDesc: '2a - IB Client', ibFlag: 'True', isCustom: 'False'},
    {id: 5, footnote: '2b', shortDesc: '2b - Corp.- Public Offering Past 12 Months', ibFlag: 'True', isCustom: 'False'},
    {id: 6, footnote: '2c', shortDesc: '2c - Inc. - Public Offering Past 12 Months', ibFlag: 'True', isCustom: 'False'},
    {id: 7, footnote: '2d', shortDesc: '2d - Corp - IB Comp Past 12 Months', ibFlag: 'True', isCustom: 'False'},
    {id: 8, footnote: '2e', shortDesc: '2e - Inc. - IB Comp Past 12 Months', ibFlag: 'True', isCustom: 'False'},
    {id: 9, footnote: '2f', shortDesc: '2f - Corp - Seek Comp Next 3 Months', ibFlag: 'True', isCustom: 'False'},
    {id: 10, footnote: '2g', shortDesc: '2g - Inc. - Seek Comp Next 3 Months', ibFlag: 'True', isCustom: 'False'},
    {id: 11, footnote: '3a', shortDesc: '3a - Non - IB Client', ibFlag: 'False', isCustom: 'False'},
    {id: 12, footnote: '3b', shortDesc: '3b - Corp. - Non IB Comp Past 12 Months ', ibFlag: 'False', isCustom: 'False'},
    {id: 13, footnote: '3c', shortDesc: '3c - Inc. - Non IB Comp Past 12 Months ', ibFlag: 'False', isCustom: 'False'},
    {id: 14, footnote: '4a', shortDesc: '4a - Non - IB, Non - Securites Client ', ibFlag: 'False', isCustom: 'False'},
    {id: 15, footnote: '4b', shortDesc: '4b - Corp. - Non - IB, Non-Sec. Comp Past 12 Months', ibFlag: 'False', isCustom: 'False'},
    {id: 16, footnote: '4c', shortDesc: '4c - Inc - Non - IB, Non-Sec. Comp Past 12 Months', ibFlag: 'False', isCustom: 'False'},
    {id: 17, footnote: '5a', shortDesc: '5a - U.S. Analyst Has Position ', ibFlag: 'False', isCustom: 'False'},
    {id: 18, footnote: '5b', shortDesc: '5b - U.S. Household Has Position ', ibFlag: 'False', isCustom: 'False'},
    {id: 19, footnote: '6a', shortDesc: '6a - Canadian Analyst Has Position ', ibFlag: 'False', isCustom: 'False'},
    {id: 20, footnote: '6b', shortDesc: '6b - Canadian Household Has Position ', ibFlag: 'False', isCustom: 'False'},
    {id: 21, footnote: '7', shortDesc: '7 - 1% Beneficial ownership ', ibFlag: 'False', isCustom: 'False'},
    {id: 22, footnote: '8', shortDesc: '8 - PDO/Analyst - Remuneration Past 12 Months ', ibFlag: 'False', isCustom: 'False'},
    {id: 23, footnote: '9', shortDesc: '9 - CIBC Exec on board - ', ibFlag: 'False', isCustom: 'False'},
    {id: 24, footnote: '10', shortDesc: '10 - CIBC Significant Credit Relationship ', ibFlag: 'False', isCustom: 'False'},
    {id: 25, footnote: '11', shortDesc: '11 - RVS ', ibFlag: 'False', isCustom: 'False'},
    {id: 26, footnote: '12', shortDesc: '12 - SVS ', ibFlag: 'False', isCustom: 'False'},
    {id: 27, footnote: '13', shortDesc: '13 - NVS ', ibFlag: 'False', isCustom: 'False'},
    {id: 28, footnote: '14', shortDesc: '14 - LVS ', ibFlag: 'False', isCustom: 'False'},
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

  addNewClause() {
    this.selectedClause = {};
    this.modalTitle = 'New Custom Footnote';
    this.openModal();
  }

  editClause() {
    this.modalTitle = 'Edit Custom Footnote';
    this.openModal();
  }

  saveFootnote() {
    if (!this.selectedClause.id) {
      this.selectedClause.id = this.rowData.length;
      this.rowData = [this.selectedClause, ...this.rowData];
      this.closeModal();

      return;
    }

    this.rowData = this.rowData.map((row) => {
      if (row.id === this.selectedClause.id) {
        row = this.selectedClause;
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
