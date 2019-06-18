import {Component, OnInit, ViewChild} from '@angular/core';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {MessageService} from '../../shared/shared-service';
import {Subscription} from 'rxjs';

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


  leftTitle = 'All Sectors';
  rightTitle = 'Selected Sectors';
  leftItems = [
    {name: 'Mapping Tree', id: 1, selected: false},
    {name: 'Canadian Monthly Reports', id: 2, selected: false},
    {name: 'Consumer Discretionary', id: 3, selected: false},
    {name: 'Consumer Stapes', id: 4, selected: false},
    {name: 'Enegry', id: 5, selected: false},
    {name: 'Financials', id: 6, selected: false},
    {name: 'Health Care', id: 7, selected: false},
    {name: 'Industrials', id: 8, selected: false},
    {name: 'Information', id: 9, selected: false},
  ];
  rightItems = [];

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
  gridApis = [];
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
  subscription: Subscription;

  constructor(private modalService: BsModalService, private toastr: ToastrService,
              private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      setTimeout(() => {
        this.gridApis.map((api) => {
          api.sizeColumnsToFit();
        });
      }, 500);
    });
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

    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>' +
      'Partner information created Successfully' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );

    if (!this.selectedPartner.id) {
      this.selectedPartner.id = this.rowData.length;
      this.rowData = [this.selectedPartner, ...this.rowData];
      this.closeModal();

      return;
    }

  }


  upload() {

    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>' + 'uploaded documents Successfully' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApis.push(params.api);
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit() {
  }

  go() {
    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>'
      + 'Documents uploaded Successfully' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );
  }
}

