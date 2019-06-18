import {Component, OnInit, ViewChild} from '@angular/core';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {MessageService} from '../../shared/shared-service';
import {Subscription} from 'rxjs';

interface Replacements {
  id?: any;
  dateReplaced?: any;
  comments?: any;
  replacedBy?: any;
}

@Component({
  selector: 'app-replace-pdf',
  templateUrl: './replace-pdf.component.html',
  styleUrls: ['./replace-pdf.component.scss']
})

export class ReplacePDFComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('modal') modal: ModalDirective;

  selectedReplacement: Replacements = {};

  modalTitle = 'HedgeClause Details';

  appliedThemeClassOnTable = 'ag-theme-balham';
  columnDefs = [
    {
      headerName: 'PublicationID', field: 'id',
      width: 120, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Current Files', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'}, width: 120,
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<a href="" class="client-link current-files"> View </a>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.current-files')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedReplacement = params.data;
          // that.editClause();
        });
        return eDiv;
      }, pivot: true
    },
    {
      headerName: 'Previous Files', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'}, suppressSizeToFit: true, width: 120,
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<a href="" class="client-link previous-files"> View </a>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.previous-files')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedReplacement = params.data;
          // that.editClause();
        });
        return eDiv;
      }, pivot: true
    },
    {
      headerName: 'Date Replaced', field: 'dateReplaced', suppressSizeToFit: true,
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'comments', field: 'comments', width: 700,
      filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Replaced By', field: 'replacedBy', width: 120, suppressSizeToFit: true,
      filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
  ];


  rowData: Replacements[] = [
    {
      id: '159597',
      dateReplaced: '5/10/2019 2:25:35 PM',
      comments: 'TO replace Element Al sub-title form "Leading Organizations Towards An A1-First World" ' +
      'to "Helping Paople Work Smarter." Approved Today by Rob Sedran at 1:21 p.m.',
      replacedBy: 'rodger'
    },
    {
      id: '159672',
      dateReplaced: '5/7/2019 2:35:56 PM',
      comments: ' Changed "tailwinds" to "headwinds" in first line on first page.',
      replacedBy: 'Faucher'
    },
    {
      id: '159639',
      dateReplaced: '5/6/2019 10:29:31 PM',
      comments: ' Corrected spelling of "deceleration" in penultimate paragraph, ' +
      'and "reflecting" in last paragraph of bullets on cover page ',
      replacedBy: 'Faucher'
    },
    {
      id: '159412',
      dateReplaced: '4/28/2019 6:05:48 PM',
      comments: ' Changed "compelted unaffected" to "completely unaffected" on firs lion of second paragraph on first page.',
      replacedBy: 'Faucher'
    },
    {
      id: '159280',
      dateReplaced: '4/22/2019 10:30:54 AM',
      comments: ' replaced tear sheet as it listed analyst name twice instead of associate name.',
      replacedBy: 'LaRoseK'
    },
    {
      id: '159281',
      dateReplaced: '4/18/2019 8:13:14 AM',
      comments: ' Date in page header updated via format header (date on note was correct)',
      replacedBy: 'Faucher'
    },
    {
      id: '159159',
      dateReplaced: '4/16/2019 6:34:31 PM',
      comments: ' Replaced PDF as requested by Analyst due to rendering issues',
      replacedBy: 'WongKarH'
    },
    {
      id: '159159',
      dateReplaced: '4/16/2019 6:32:31 PM',
      comments: ' Replaced PDF as requested by Analyst due to rendering issues',
      replacedBy: 'WongKarH'
    },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  gridApis = [];
  gridApi;
  gridColumnApi;
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
    this.gridApis.push(params.api);
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();

    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 500);
  }

  ngOnInit() {
  }

  go() {
    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>'
      + 'File replaced successfully' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );
  }

}
