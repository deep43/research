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
  selector: 'app-published-reports',
  templateUrl: './published-reports.component.html',
  styleUrls: ['./published-reports.component.scss']
})

export class PublishedReportsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('modal') modal: ModalDirective;

  sectorOrIndustry = '1';
  searchPlaceholder = 'Enter Ticker or Security ID';

  selectedClause: clause = {};

  modalTitle = 'HedgeClause Details';

  appliedThemeClassOnTable = 'ag-theme-balham';

  columnDefs = [
    {
      headerName: 'View', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<a href="" class="client-link edit"> View </a>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.edit')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedClause = params.data;
          that.editClause();
        });
        return eDiv;
      }, pivot: true, width: 100,
    },
    {headerName: 'Pub ID', field: 'pubId', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Ticker', field: 'ticker', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Company Name', field: 'companyName', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Date', field: 'date', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Price Target', field: 'priceTarget', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Rating', field: 'rating', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Sector Rating', field: 'sectorRating', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Primary Author', field: 'primaryAuthor', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Headline', field: 'headling', width: 180, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Type', field: 'type', width: 80, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'State', field: 'state', width: 100, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {
      headerName: 'Re Publish', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<a href="" class="client-link edit"> Re Publish </a>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.edit')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedClause = params.data;
          that.editClause();
        });
        return eDiv;
      }, pivot: true, width: 100,
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
      view: '',
      pubId: '-60174',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '05/07/2019 03:59 PM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'MultiCompany-Enegry',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '2',
      view: '',
      pubId: '-60172',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '05/07/2019 03:56 PM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'MultiCompany-Banks',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '3',
      view: '',
      pubId: '158800',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '05/01/2019 11:51 AM',
      priceTarget: '-$1.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Makesh Krishnasamy',
      headling: 'MBO - Company Intraday',
      type: 'US INTRADAY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '4',
      view: '',
      pubId: '158795',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '',
      priceTarget: '-$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Makesh Krishnasamy',
      headling: 'Portfolio - Apr18',
      type: 'CA COMPANY',
      state: 'Pending',
      republish: 'RePublish'
    },
    {
      id: '5',
      view: '',
      pubId: '-59947',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '03/03/2019 07:18 PM',
      priceTarget: '-$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert sedran, CFA',
      headling: 'Not A Good Start - Q1/F19 Postview',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '6',
      view: '',
      pubId: '158457',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '02/26/2019 08:02 PM',
      priceTarget: '-$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert sedran, CFA',
      headling: 'Soild performance in Key Areas - Q1/F19...',
      type: 'CA COMPANY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '7',
      view: '',
      pubId: '158439',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '02/26/2019 08:16 AM',
      priceTarget: '-$1.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert sedran, CFA',
      headling: 'What Volatility?_Q1/F19 First Look',
      type: 'US INTRADAY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '8',
      view: '',
      pubId: '-59606',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '02/06/2019 10:34 PM',
      priceTarget: '-$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert sedran, CFA',
      headling: 'Seasonal Strength Muted By Volatility - ...',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '9',
      view: '',
      pubId: '157787',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '',
      priceTarget: '-$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Gayatri Madugula',
      headling: 'Test - UAT',
      type: 'CA COMPANY',
      state: 'Created',
      republish: 'RePublish'
    },
    {
      id: '10',
      view: '',
      pubId: '-58696',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '12/09/2018 06:30 PM',
      priceTarget: '-$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Getting What You Need - Q4/F18 Postview',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '11',
      view: '',
      pubId: '157191',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '12/04/2018 03:54 PM',
      priceTarget: '-$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Noisy Close To A Good Year - Q4/F18 Earn...',
      type: 'CA COMPANY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '12',
      view: '',
      pubId: '157183',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '12/04/2018 07:54 AM',
      priceTarget: '-$1.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'An In - Line Querter - Q4/F18 First Look',
      type: 'US INTRADAY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '13',
      view: '',
      pubId: '-58317',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '11/18/2018 05:46 PM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Banks - Q4/F18 Preview - Part #2 Of 2',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '14',
      view: '',
      pubId: '-58196',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '11/11/2018 07:22 PM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: '2020 Vision? Introducing New Estmates W...',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '15',
      view: '',
      pubId: '-58015',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '11/01/2018 11:31 PM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Refreshing Downside Scenarios',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '16',
      view: '',
      pubId: '156322',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '10/24/2018 05:38 PM',
      priceTarget: '-$1.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Extending The Growth Runway Investor D...',
      type: 'US INTRADAY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '17',
      view: '',
      pubId: '-56855',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '09/03/2018 07:08 PM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'A Trendless Earnings Season - Q3/F18 Pos...',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '18',
      view: '',
      pubId: '155549',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '08/28/2018 07:46 PM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Premium Valuation Brings Premium Expecta...',
      type: 'CA COMPANY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '19',
      view: '',
      pubId: '155540',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '08/28/2018 08:27 AM',
      priceTarget: '-$1.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Strong U.S Performance; Market - Sensitiv...',
      type: 'US INTRADAY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '20',
      view: '',
      pubId: '-56542',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '08/13/2018 10:29 PM',
      priceTarget: '$109.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Setting Up For A Good F2019 - Q3/F18 Pre...',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '21',
      view: '',
      pubId: '-55256',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '06/08/2018 11:39 AM',
      priceTarget: '$109.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'More Or Less As Advertised - Banks Q2/F1...',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '22',
      view: '',
      pubId: '154125',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '05/30/2018 07:21 PM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'U.S. Performance Pushes Estimates Higher...',
      type: 'CA COMPANY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '23',
      view: '',
      pubId: '154115',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '05/30/2018 08:44 AM',
      priceTarget: '-$1.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'U.S. Earnings Surge; Another Restructuri...',
      type: 'US INTRADAY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '24',
      view: '',
      pubId: '-54888',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '05/15/2018 12:55 AM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Banks Set For A Treadmill Quarter - Q2/F',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '25',
      view: '',
      pubId: '-53458',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '03/04/2018 07:23 PM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Strong Start To The year Q1/F18 Postvi...',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '26',
      view: '',
      pubId: '152429',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '02/27/2018 06:40 PM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Notionally In-Line Quarter - Q1/F18 Earn... ',
      type: 'CA COMPANY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '27',
      view: '',
      pubId: '152419',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '02/27/2018 08:18 AM',
      priceTarget: '-$1.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Ahead On Strong Credit Quality - Q1/F18...',
      type: 'US INTRADAY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '28',
      view: '',
      pubId: '-52928',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '01/31/2018 09:15 PM',
      priceTarget: '$111.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Banks - Notable Increase in Annual Esti...',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '29',
      view: '',
      pubId: '-52007',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '12/08/2017 03:12 PM',
      priceTarget: '$101.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'First, Do No Harm - Q4/F17 Postview',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '30',
      view: '',
      pubId: '-52000',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '',
      priceTarget: '$101.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'First, Do No Harm - Q4/F17 Postview',
      type: 'CA ERN CHILD',
      state: 'Deleted',
      republish: 'RePublish'
    },
    {
      id: '31',
      view: '',
      pubId: '151244',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '12/05/2017 07:59 PM',
      priceTarget: '$101.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Some Good Trends, Some Less Good Trends...',
      type: 'CA COMPANY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '32',
      view: '',
      pubId: '151225',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '12/05/2017 08:27 AM',
      priceTarget: '-$1.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Noisy Quarter, Notionally In Line - Q4/F...',
      type: 'US INTRADAY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '33',
      view: '',
      pubId: '-51665',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '11/19/2017 04:06 PM',
      priceTarget: '$107.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Banks Q4/F17 Preview, Part #2 of 2',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '34',
      view: '',
      pubId: '-51495',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '11/12/2017 08:17 PM',
      priceTarget: '$107.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Banks - Introducing F2019 Estimates',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '35',
      view: '',
      pubId: '-50256',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '09/04/2017 07:37 PM',
      priceTarget: '$100.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'When Good Is Great - Q3/F17 Postview',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '36',
      view: '',
      pubId: '149607',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '08/29/2017 08:21 PM',
      priceTarget: '$100.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'The Path To In Line Matters - Q3/F17 E...',
      type: 'CA COMPANY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '37',
      view: '',
      pubId: '149596',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '08/29/2017 08:27 AM',
      priceTarget: '-$1.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'In Line As Canada Improves While U.S.Gr...',
      type: 'US INTRADAY',
      state: 'End',
      republish: 'RePublish'
    },
    {
      id: '38',
      view: '',
      pubId: '-49969',
      ticker: 'BMO',
      companyName: 'Bank of Montreal',
      date: '08/13/2017 06:36 PM',
      priceTarget: '$101.00',
      rating: 'Neutral',
      sectorRating: '',
      primaryAuthor: 'Robert Sedran,CFA',
      headling: 'Good Quarter To Follow Strong H1 - Q3/F1...',
      type: 'CA ERN CHILD',
      state: 'End',
      republish: 'RePublish'
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
}
