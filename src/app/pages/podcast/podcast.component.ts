import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {AgGridNg2} from 'ag-grid-angular';


interface Podcast {
  id?: number;
  headline?: string;
  analyst?: string;
  sectors?: any;
  published?: any;
  deleted?: any;
}


@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss']
})


export class PodcastComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @ViewChild('newPodcastModal') newPodcastModal: ModalDirective;

  selectedPodcast: Podcast = {};

  modalTitle = 'Create a New Partner';

  appliedThemeClassOnTable = 'ag-theme-balham';
  columnDefsMain = [
    {
      headerName: 'Headline', field: 'headline',
      width: 800, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Analyst', field: 'analyst',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Sectors', field: 'sectors',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {headerName: 'Saved', field: 'published', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {
      headerName: 'Action', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<button class="btn btn-sm preview ag-table-btn"> Preview </button>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.preview')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedPodcast = params.data;
          // that.editPartner();
        });
        return eDiv;
      }, pivot: true
    },
    {
      headerName: 'Action', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<button class="btn btn-sm publish ag-table-btn"> Publish </button>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.publish')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedPodcast = params.data;
          that.openPublishModal();
        });
        return eDiv;
      }, pivot: true
    },
    {
      headerName: 'Action', filter: false, resizable: true, suppressMovable: true,
      cellStyle: {'text-align': 'center'},
      cellRenderer: (params) => {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = '<button class="btn btn-sm delete ag-table-btn"> Delete </button>';
        const that = this;
        const eButton = eDiv.querySelectorAll('.delete')[0];
        eButton && eButton.addEventListener('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();

          that.selectedPodcast = params.data;
          that.openDeleteModal();
        });
        return eDiv;
      }, pivot: true
    },
  ];
  columnDefsPublished = [
    {
      headerName: 'Headline', field: 'headline',
      width: 800, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Analyst', field: 'analyst',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Sectors', field: 'sectors',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {headerName: 'Published', field: 'published', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
  ];
  columnDefsDeleted = [
    {
      headerName: 'Headline', field: 'headline',
      width: 800, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Analyst', field: 'analyst',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {
      headerName: 'Sectors', field: 'sectors',
      width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true
    },
    {headerName: 'Deleted', field: 'deleted', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
  ];

  rowData: Podcast[] = [
    {id: 1, headline: 'North American Holler: A Perspetive...', analyst: 'Bout', sectors: 'Chemicals', published: '2:35 PM'},
    {id: 2, headline: 'Whistler Conference Takeaways', analyst: 'Soni', sectors: 'Metals & Mining', published: 'May 10, 2019'},
  ];
  rowDataPublished: Podcast[] = [
    {id: 1, headline: 'North American Holler: A Perspetive...', analyst: 'Bout', sectors: 'Chemicals', published: '2:35 PM'},
    {id: 2, headline: 'Whistler Conference Takeaways', analyst: 'Soni', sectors: 'Metals & Mining', published: 'May 10, 2019'},
    {id: 3, headline: 'Whistler Conference Takeaways', analyst: 'Soni', sectors: 'Metals & Mining', published: 'May 10, 2019'},
  ];
  rowDataDeleted: Podcast[] = [
    {id: 1, headline: 'North American Holler: A Perspetive...', analyst: 'Bout', sectors: 'Chemicals', deleted: '2:35 PM'},
    {id: 2, headline: 'Whistler Conference Takeaways', analyst: 'Soni', sectors: 'Metals & Mining', deleted: 'May 10, 2019'},
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
  showUploadWarning = false;

  constructor(private modalService: BsModalService) {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  openPublishModal() {
    this.modal.show();
  }

  closePublishModal() {
    this.modal.hide();
  }

  publishPodcast() {
    const nowTime = new Date().toLocaleTimeString();
    this.rowDataPublished = [...this.rowDataPublished, {...this.selectedPodcast, published: nowTime}];
    this.selectedPodcast = {};
    this.closePublishModal();
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
      return row.id !== this.selectedPodcast.id;
    });
    this.rowDataDeleted = [...this.rowDataDeleted, {...this.selectedPodcast, deleted: nowTime}];

    this.selectedPodcast = {};
    this.closeDeleteModal();
  }

  openNewPodcastModal() {
    this.newPodcastModal.show();
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
    this.rowData = [...this.rowData, {...this.selectedPodcast, published: nowTime, id: this.rowData.length + 1}];
    this.selectedPodcast = {};
    this.closeNewPodcastModal();
  }

  ngOnInit() {
  }

}
