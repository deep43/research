import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {AgGridNg2} from 'ag-grid-angular';
import {ToastrService} from 'ngx-toastr';
import {MessageService} from '../../shared/shared-service';
import {Subscription} from 'rxjs';

interface Ratings {
  id?: any;
  headline?: string;
  sector?: any;
  newSectorRating?: any;
  publishedBy?: any;
  published?: any;
  deletedBy?: string;
  deleted?: any;
  savedBy?: string;
  saved?: any;
}

@Component({
  selector: 'app-sector-ratings',
  templateUrl: './sector-ratings.component.html',
  styleUrls: ['./sector-ratings.component.scss']
})

export class SectorRatingsComponent implements OnInit, AfterViewChecked {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('newPodcastModal') newPodcastModal: ModalDirective;

  selectedRatings: Ratings = {};

  modalTitle = 'Create a New Partner';

  appliedThemeClassOnTable = 'ag-theme-balham';
  columnDefsChange = [
    {
      headerName: '',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      width: 40,
      filter: false
    },
    {
      headerName: 'Sector Name', field: 'name',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Current Rating', field: 'currentRating',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Select Rating', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'}, width: 100,
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<select>'
          + '<option>Marketweight</option>'
          + '<option>Overweight</option>'
          + '<option>Underweight</option>'
          + '</select>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.publish')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedRatings = params.data;
          that.openPublishModal();
        });
        return eDiv;
      }, pivot: true
    },
    {
      headerName: 'Headline for Related Report', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<input class="form-control ag-table-input" type="text"/>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.delete')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedRatings = params.data;
          that.openDeleteModal();
        });
        return eDiv;
      }, pivot: true
    },
  ];
  columnDefsMain = [
    {
      headerName: 'Headline for Related Report', field: 'headline',
      width: 800, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Saved By', field: 'savedBy',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Sector', field: 'sector',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'New Sector Rating', field: 'newSectorRating', width: 200, filter: 'agTextColumnFilter',
      pivot: true, suppressMovable: true
    },
    {headerName: 'Saved', field: 'saved', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {
      headerName: '', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<button class="btn btn-sm publish ag-table-btn"> Publish </button>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.publish')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedRatings = params.data;
          that.openPublishModal();
        });
        return eDiv;
      }, pivot: true
    },
    {
      headerName: '', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<button class="btn btn-sm delete ag-table-btn"> Delete </button>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.delete')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedRatings = params.data;
          that.openDeleteModal();
        });
        return eDiv;
      }, pivot: true
    },
  ];
  columnDefsPublished = [
    {
      headerName: 'Headline for Related Report', field: 'headline',
      width: 800, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Published By', field: 'publishedBy',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Sector', field: 'sector',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'New Sector Rating', field: 'newSectorRating', width: 200, filter: 'agTextColumnFilter',
      pivot: true, suppressMovable: true
    },
    {headerName: 'Published', field: 'published', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
  ];
  columnDefsDeleted = [
    {
      headerName: 'Headline for Related Report', field: 'headline',
      width: 800, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Deleted By', field: 'deletedBy',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Sector', field: 'sector',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'New Sector Rating', field: 'newSectorRating', width: 200, filter: 'agTextColumnFilter',
      pivot: true, suppressMovable: true
    },
    {headerName: 'Deleted', field: 'deleted', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
  ];

  rowDataChange: any[] = [
    {id: '1', name: 'Consumer Discretionary', currentRating: 'Marketweight'},
    {id: '2', name: 'Consumer Staples', currentRating: 'Overweight'},
    {id: '3', name: 'Enegry', currentRating: 'Overweight'},
    {id: '4', name: 'Financials', currentRating: 'Overweight'},
    {id: '5', name: 'Health Care', currentRating: 'Underweight'},
    {id: '6', name: 'Industrials', currentRating: 'Marketweight'},
    {id: '7', name: 'Information Technology', currentRating: 'Underweight'},
    {id: '8', name: 'Materials', currentRating: 'Marketweight'},
    {id: '9', name: 'Real Estate', currentRating: 'Underweight'},
    {id: '10', name: 'Telecommunication Services', currentRating: 'Marketweight'},
    {id: '11', name: 'Utilities', currentRating: 'Underweight'},
  ];
  rowData: Ratings[] = [
    {
      id: '1', headline: 'Q1 2019 Strategy Update', savedBy: 'Merwet',
      sector: 'Utilities', newSectorRating: 'Overweight', saved: '2:35 PM'
    }
  ];
  rowDataPublished: Ratings[] = [
    {
      id: '1',
      headline: 'Q1 2019 Strategy Update',
      publishedBy: 'Rodger',
      sector: 'Financials',
      newSectorRating: 'Overweight',
      published: 'Oct 15,2018'
    }
  ]
  rowDataDeleted: Ratings[] = [
    {
      id: '1',
      headline: 'Q1 2019 Strategy Update',
      deletedBy: 'Rodger',
      sector: 'Financials',
      newSectorRating: 'Overweight',
      deleted: 'Oct 6,2018'
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
  selectedRowsPerPage = 13;
  customFlag = true;
  active = true;
  showUploadWarning = false;
  subscription: Subscription;

  constructor(private modalService: BsModalService, private toastr: ToastrService,
              private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      setTimeout(() => {
        this.gridApis.map((api) => {
          api.sizeColumnsToFit();
        });
      }, 500, true);
    });
  }

  ngAfterViewChecked() {
    /*this.gridApis.map((api) => {
      api.sizeColumnsToFit();
    });*/
    /*setTimeout(() => {

    }, 500);*/
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApis.push(params.api);
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
    setTimeout(() => {
      this.gridApis.map((api) => {
        api.sizeColumnsToFit();
      });
    }, 500, true);
  }

  openPublishModal() {
    this.modal.show();
  }

  closePublishModal() {
    this.modal.hide();
  }

  publishPodcast() {
    const nowTime = new Date().toLocaleTimeString();
    this.rowDataPublished = [...this.rowDataPublished, {
      ...this.selectedRatings,
      published: nowTime, publishedBy: this.selectedRatings.savedBy
    }];
    this.selectedRatings = {};
    this.closePublishModal();

    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>'
      + 'Published sector rating changes successfully' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );
  }

  openDeleteModal() {
    this.deleteModal.show();
  }

  closeDeleteModal() {
    this.deleteModal.hide();
  }

  deletePodcast() {
    const nowTime = new Date().toLocaleTimeString();
    this.rowData = this.rowData.filter((row) => {
      return row.id !== this.selectedRatings.id;
    });
    this.rowDataDeleted = [...this.rowDataDeleted, {
      ...this.selectedRatings, deleted: nowTime,
      deletedBy: this.selectedRatings.savedBy
    }];

    this.selectedRatings = {};
    this.closeDeleteModal();

    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>'
      + 'Deleted sector rating changes successfully' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );
  }

  openNewPodcastModal() {
    // this.newPodcastModal.show();
    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>'
      + 'Saved sector rating changes successfully' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );
  }

  closeNewPodcastModal() {
    this.newPodcastModal.hide();
  }

  uploadDocument() {
    this.showUploadWarning = true;
    setTimeout((item) => {
      this.showUploadWarning = false;
    }, 1000);
  }

  savePodCast() {
    const nowTime = new Date().toLocaleTimeString();
    this.rowData = [...this.rowData, {...this.selectedRatings, published: nowTime, id: this.rowData.length + 1}];
    this.selectedRatings = {};
    this.closeNewPodcastModal();
  }

  ngOnInit() {
  }

}
