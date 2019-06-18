
import {Component, OnInit, ViewChild} from '@angular/core';

import {AgGridNg2} from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {MessageService} from '../../shared/shared-service';

interface clause {
  id?: number;
  footnote?: string;
  shortDesc?: string;
  ibFlag?: any;
  isCustom?: string;
}
@Component({
  selector: 'app-distributed-reports',
  templateUrl: './reports-distribution.component.html',
  styleUrls: ['./reports-distribution.component.scss']
})

export class ReportsDistributionComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('modal') modal: ModalDirective;

  selectedClause: clause = {};

  modalTitle = 'HedgeClause Details';

  appliedThemeClassOnTable = 'ag-theme-balham';
  b = {
    id: '1',
    ticker: 'AAL',
    Company: 'Anglo American Plc',
    fromABBR: '',
    fromRatingDesc: '',
    toABBR: 'So',
    toRatingDesc: 'Sector Outperformer',
    direction: '',
    effectiveDate: '01/07/2015',
    analystLastName: 'McEwen',
    analystFirstName: 'Ben',
    ric: 'AALL',
    universe: 'US',
    status: 'I',
    pubID: '133452',
    comment: 'To do: Admin Link for update',
    pdfLink: 'docbase/133452-PDF-1.pdf'
  };

  columnDefs = [
    {headerName: 'Ticker', field: 'ticker', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    { headerName: 'Company', field: 'Company', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'From ABBR', field: 'fromABBR', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'From Rating Desc', field: 'fromRatingDesc', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'To ABBR', field: 'toABBR', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'To Rating Desc', field: 'toRatingDesc', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'Direction', field: 'direction', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'Effective Date', field: 'effectiveDate', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'Analyst Last Name', field: 'analystLastName', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'Analyst First Name', field: 'analystFirstName', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'RIC', field: 'ric', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'Universe', field: 'universe', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'status', field: 'status', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'Pub ID', field: 'pubID', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    { headerName: 'Comment', field: 'comment', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true },
    {
      headerName: 'Pdf Link', field: 'pdfLink', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<a href="" class="client-link edit">' + params.data.pdfLink + '</a>';
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
    }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  gridApis = [];
  gridApi;
  gridColumnApi;
  rowData: any[] = [

      {
        id: '1',
        ticker: 'AAL',
        Company: 'Anglo American Plc',
        fromABBR: '',
        fromRatingDesc: '',
        toABBR: 'So',
        toRatingDesc: 'Sector Outperformer',
        direction: '',
        effectiveDate: '01/07/2015',
        analystLastName: 'McEwen',
        analystFirstName: 'Ben',
        ric: 'AALL',
        universe: 'US',
        status: 'I',
        pubID: '133452',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/133452-PDF-1.pdf'
      },
      {
        id: '2',
        ticker: 'AAL',
        Company: 'Anglo American Plc',
        fromABBR: 'So',
        fromRatingDesc: 'Sector Outperformer',
        toABBR: 'SP',
        toRatingDesc: 'Sector Performer',
        direction: 'Down',
        effectiveDate: '03/16/2015',
        analystLastName: 'McEwen',
        analystFirstName: 'Ben',
        ric: 'AALL',
        universe: 'US',
        status: 'I',
        pubID: '134859',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/134859-PDF-2.pdf'
      },
      {
        id: '3',
        ticker: 'AAL',
        Company: 'Anglo American Plc',
        fromABBR: 'SP',
        fromRatingDesc: 'Sector Performer',
        toABBR: 'SU',
        toRatingDesc: 'Sector Underperformer',
        direction: 'Down',
        effectiveDate: '10/01/2015',
        analystLastName: 'McEwen',
        analystFirstName: 'Ben',
        ric: 'AALL',
        universe: 'US',
        status: 'I',
        pubID: '138249',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/138249-PDF-2.pdf'
      },
      {
        id: '4',
        ticker: 'AAL',
        Company: 'Anglo American Plc',
        fromABBR: 'SU',
        fromRatingDesc: 'Sector Underperformer',
        toABBR: 'SP',
        toRatingDesc: 'Sector performer',
        direction: 'UP',
        effectiveDate: '09/28/2016',
        analystLastName: 'Kodatsky',
        analystFirstName: 'Alec',
        ric: 'AALL',
        universe: 'US',
        status: 'I',
        pubID: '144334',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/144334-PDF-2.pdf'
      },
      {
        id: '5',
        ticker: 'AAL',
        Company: 'Anglo American Plc',
        fromABBR: 'SP',
        fromRatingDesc: 'Sector Performer',
        toABBR: 'NT',
        toRatingDesc: 'Neutral',
        direction: '',
        effectiveDate: '12/09/2016',
        analystLastName: 'Haughton',
        analystFirstName: 'David',
        ric: 'AALL',
        universe: 'US',
        status: 'I',
        pubID: '145620',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/145620-PDF-2.pdf'
      },
      {
        id: '6',
        ticker: 'AAR.UN',
        Company: 'Pure Industrial Real Estate Trust ',
        fromABBR: '',
        fromRatingDesc: '',
        toABBR: 'SO',
        toRatingDesc: 'Sector Outperformer',
        direction: '',
        effectiveDate: '02/09/2015',
        analystLastName: 'Sturges',
        analystFirstName: 'Brad',
        ric: 'AAR_u.TO',
        universe: 'US',
        status: 'I',
        pubID: '134249',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/134249-PDF-1.pdf'
      },
      {
        id: '7',
        ticker: 'AAR.UN',
        Company: 'Pure Industrial Real Estate Trust ',
        fromABBR: 'SO',
        fromRatingDesc: 'Sector Outperformer',
        toABBR: 'OP',
        toRatingDesc: 'Outperformer',
        direction: '',
        effectiveDate: '11/14/2016',
        analystLastName: 'Wilkinson',
        analystFirstName: 'Dean',
        ric: 'AAR_u.TO',
        universe: 'US',
        status: 'I',
        pubID: '145243',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/145243-PDF-1.pdf'
      },
      {
        id: '8',
        ticker: 'AAR.UN',
        Company: 'Pure Industrial Real Estate Trust ',
        fromABBR: 'OP',
        fromRatingDesc: 'Outperformer',
        toABBR: 'NT',
        toRatingDesc: 'Neutral',
        direction: 'Down',
        effectiveDate: '01/09/2018',
        analystLastName: 'Couprie',
        analystFirstName: 'Chris',
        ric: 'AAR_u.TO',
        universe: 'US',
        status: 'I',
        pubID: '151601',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/151601-PDF-1.pdf'
      },
      {
        id: '9',
        ticker: 'AAV',
        Company: 'Advantage Oil & Gas Ltd.',
        fromABBR: '',
        fromRatingDesc: '',
        toABBR: 'SO',
        toRatingDesc: 'Sector Outperformer',
        direction: '',
        effectiveDate: '09/04/2015',
        analystLastName: 'Popowich',
        analystFirstName: 'Dava',
        ric: 'AAV.TO',
        universe: 'US',
        status: 'A',
        pubID: '-41325',
        comment: 'To do: Admin Link for update',
        pdfLink: ''
      },
      {
        id: '10',
        ticker: 'AAV',
        Company: 'Advantage Oil & Gas Ltd.',
        fromABBR: 'SO',
        fromRatingDesc: 'Sector Outperformer',
        toABBR: 'OP',
        toRatingDesc: 'Outperformer',
        direction: '',
        effectiveDate: '12/05/2016',
        analystLastName: 'Morrison',
        analystFirstName: 'Jon',
        ric: 'AAV.TO',
        universe: 'US',
        status: 'A',
        pubID: '145540',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/145540-PDF-3.pdf'
      },
      {
        id: '11',
        ticker: 'AAV',
        Company: 'Advantage Oil & Gas Ltd.',
        fromABBR: 'OP',
        fromRatingDesc: 'Outperformer',
        toABBR: 'NT',
        toRatingDesc: 'Nautral',
        direction: 'Down',
        effectiveDate: '01/31/2019',
        analystLastName: 'Kubik',
        analystFirstName: 'Jamie',
        ric: 'AAV.TO',
        universe: 'US',
        status: 'A',
        pubID: '157895',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/157895-PDF-3.pdf'
      },
      {
        id: '12',
        ticker: 'AC',
        Company: 'Air Canada',
        fromABBR: '',
        fromRatingDesc: '',
        toABBR: 'SO',
        toRatingDesc: 'Sector Outperformer',
        direction: '',
        effectiveDate: '01/11/2015',
        analystLastName: 'Chiang',
        analystFirstName: 'Kevin',
        ric: 'Ac.TO',
        universe: 'US',
        status: 'A',
        pubID: '133671',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/133671-PDF-1.pdf'
      },
      {
        id: '13',
        ticker: 'AC',
        Company: 'Air Canada',
        fromABBR: 'SO',
        fromRatingDesc: 'Sector Outperformer',
        toABBR: 'OP',
        toRatingDesc: 'Outperformer',
        direction: '',
        effectiveDate: '11/07/2016',
        analystLastName: 'Chiang',
        analystFirstName: 'Kevin',
        ric: 'Ac.TO',
        universe: 'US',
        status: 'A',
        pubID: '145035',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/145035-PDF-2.pdf'
      },
      {
        id: '14',
        ticker: 'ACA',
        Company: 'Acacia Mining PLC',
        fromABBR: '',
        fromRatingDesc: '',
        toABBR: 'SP',
        toRatingDesc: 'Sector Performer',
        direction: '',
        effectiveDate: '01/19/2015',
        analystLastName: 'Esterhuizen',
        analystFirstName: 'Leon',
        ric: 'ACAA.L',
        universe: 'US',
        status: 'A',
        pubID: '133817',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/133817-PDF-2.pdf'
      },
      {
        id: '15',
        ticker: 'ACA',
        Company: 'Acacia Mining PLC',
        fromABBR: 'SP',
        fromRatingDesc: 'Sector Performer',
        toABBR: 'SU',
        toRatingDesc: 'Sector Underperformer',
        direction: 'Down',
        effectiveDate: '03/25/2015',
        analystLastName: 'Esterhuizen',
        analystFirstName: 'Leon',
        ric: 'ACAA.L',
        universe: 'US',
        status: 'A',
        pubID: '134913',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/134913-PDF-1.pdf'
      },
      {
        id: '16',
        ticker: 'ACA',
        Company: 'Acacia Mining PLC',
        fromABBR: 'SU',
        fromRatingDesc: 'Sector Underperformer',
        toABBR: 'SP',
        toRatingDesc: 'Sector Performer',
        direction: 'UP',
        effectiveDate: '07/27/2015',
        analystLastName: 'Esterhuizen',
        analystFirstName: 'Leon',
        ric: 'ACAA.L',
        universe: 'US',
        status: 'A',
        pubID: '137077',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/137077-PDF-1.pdf'
      },
      {
        id: '17',
        ticker: 'ACA',
        Company: 'Acacia Mining PLC',
        fromABBR: 'SP',
        fromRatingDesc: 'Sector Performer',
        toABBR: 'NT',
        toRatingDesc: 'Neutral',
        direction: '',
        effectiveDate: '12/09/2016',
        analystLastName: 'Haughton',
        analystFirstName: 'David',
        ric: 'ACAA.L',
        universe: 'US',
        status: 'A',
        pubID: '145620',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/145620-PDF-2.pdf'
      },
      {
        id: '18',
        ticker: 'ACC',
        Company: 'Amica Mature Lifestyles Inc.',
        fromABBR: '',
        fromRatingDesc: '',
        toABBR: 'SO',
        toRatingDesc: 'Sector Outperformer',
        direction: '',
        effectiveDate: '01/15/2015',
        analystLastName: 'Sturges',
        analystFirstName: 'Brad',
        ric: 'ACC.TO',
        universe: 'US',
        status: 'D',
        pubID: '133758',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/133758-PDF-2.pdf'
      },
      {
        id: '19',
        ticker: 'ACI',
        Company: 'AltaGas Canada Inc.',
        fromABBR: '',
        fromRatingDesc: '',
        toABBR: 'OP',
        toRatingDesc: 'Outperformer',
        direction: '',
        effectiveDate: '11/13/2018',
        analystLastName: 'Catellier',
        analystFirstName: 'Robert',
        ric: 'ACI.TO',
        universe: 'US',
        status: 'D',
        pubID: '156738',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/156738-PDF-1.pdf'
      },
      {
        id: '20',
        ticker: 'ACI',
        Company: 'AltaGas Canada Inc.',
        fromABBR: 'OP',
        fromRatingDesc: 'Outperformer',
        toABBR: 'NT',
        toRatingDesc: 'Neutral',
        direction: 'Down',
        effectiveDate: '01/14/2019',
        analystLastName: 'Catellier',
        analystFirstName: 'Robert',
        ric: 'ACI.TO',
        universe: 'US',
        status: 'D',
        pubID: '157555',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/157555-PDF-2.pdf'
      },
      {
        id: '21',
        ticker: 'ACO.X',
        Company: 'ATCO Ltd.',
        fromABBR: '',
        fromRatingDesc: '',
        toABBR: 'SP',
        toRatingDesc: 'Sector Performer',
        direction: '',
        effectiveDate: '01/09/2015',
        analystLastName: 'Noseworthy',
        analystFirstName: 'David',
        ric: 'ACOx.TO',
        universe: 'US',
        status: 'A',
        pubID: '133654',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/133654-PDF-1.pdf'
      },
      {
        id: '22',
        ticker: 'ACO.X',
        Company: 'ATCO Ltd.',
        fromABBR: 'SP',
        fromRatingDesc: 'Sector Performer',
        toABBR: 'NT',
        toRatingDesc: 'Neutral',
        direction: '',
        effectiveDate: '06/27/2018',
        analystLastName: 'Jarvi',
        analystFirstName: 'Mark',
        ric: 'ACOx.TO',
        universe: 'US',
        status: 'A',
        pubID: '154369',
        comment: 'To do: Admin Link for update',
        pdfLink: 'docbase/154369-PDF-2.pdf'
      },
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
          // api.sizeColumnsToFit();
        });
      }, 500);
    });
  }
  go() {
    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>'
      + 'Fetched data Successfully' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );
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
    this.gridApis.push(params.api);
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params) {
    // params.api.sizeColumnsToFit();
  }

  ngOnInit() {
  }

}
