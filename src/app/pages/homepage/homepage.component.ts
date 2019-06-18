import {Component, HostListener, Input, NgZone, OnInit, ViewChild} from '@angular/core';

import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import {BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {FormControl} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {Moment} from 'moment';
import {MessageService} from '../../shared/shared-service';
import {Subscription} from 'rxjs';

const moment = _moment;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class HomepageComponent implements OnInit {
  chart: any;
  chart2: any;
  appliedThemeClassOnTable = 'ag-theme-balham';
  @Input() height = '85vh';
  @ViewChild('modal') modal: ModalDirective;
  params: any = {};
  columnDefs = [
    {headerName: 'Analysis', field: 'analysis', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Title', field: 'title', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Sectors', field: 'sectors', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'No of Pages', field: 'noOfPages', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {
      headerName: 'Publication Category',
      field: 'publicationCategory',
      width: 200,
      filter: 'agTextColumnFilter',
      pivot: true,
      suppressMovable: true
    },
    {headerName: 'Report Type', field: 'reportType', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
  ];
  date = new FormControl(moment());
  date1 = new FormControl(moment());
  date2 = new FormControl(moment());
  date3 = new FormControl(new Date());
  maxDate = new Date();
  columnDefsMonth = [
    {headerName: 'Day', field: 'day', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Analyst', field: 'analysis', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Title', field: 'title', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'Sectors', field: 'sectors', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {headerName: 'No of Pages', field: 'noOfPages', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
    {
      headerName: 'Publication Category',
      field: 'publicationCategory',
      width: 200,
      filter: 'agTextColumnFilter',
      pivot: true,
      suppressMovable: true
    },
    {headerName: 'Report Type', field: 'reportType', width: 200, filter: 'agTextColumnFilter', pivot: true, suppressMovable: true},
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  gridApis = [];
  gridApi;
  gridColumnApi;
  rowData = [
    {
      day: '14',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '15',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '17',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '18',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '19',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '20',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '21',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '22',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '23',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
    {
      day: '24',
      analysis: 'Done',
      title: 'Bank of Montreal',
      sectors: 'Banking',
      noOfPages: '10',
      publicationCategory: 'Neutral',
      reportType: 'CA ERN CHILD'
    },
  ];
  selectedRowsPerPage = 5;
  data1Quarter = [
    {
      'year': 'Health Care',
      'comapany': '', 'income': 35,
      'expenses': 23
    },
    {
      'year': 'Real Estate',
      'comapany': '', 'income': 35,
      'expenses': 45
    },
    {
      'year': 'Infotech',
      'comapany': '', 'income': 16,
      'expenses': 28
    },
    {
      'year': 'Utilities',
      'comapany': '', 'income': 57,
      'expenses': 45
    },
    {
      'year': 'Consumer',
      'comapany': '', 'income': 115,
      'expenses': 105
    },
    {
      'year': 'Customer',
      'comapany': '', 'income': 23,
      'expenses': 13
    },
    {
      'year': 'Communications',
      'comapany': '', 'income': 8,
      'expenses': 23
    },
    {
      'year': 'Materials',
      'comapany': '', 'income': 50,
      'expenses': 35,
    },
    {
      'year': 'Industrials',
      'comapany': '', 'income': 9,
      'expenses': 22
    },
    {
      'year': 'Energy',
      'comapany': '', 'income': 80,
      'expenses': 80
    },
    {
      'year': 'Financials',
      'comapany': '', 'income': 28,
      'expenses': 20
    }
  ];

  data1Month = [
    {
      'year': 'Health Care',
      'comapany': '', 'income': 15,
      'expenses': 55
    },
    {
      'year': 'Real Estate',
      'comapany': '', 'income': 45,
      'expenses': 25
    },
    {
      'year': 'Infotech',
      'comapany': '', 'income': 56,
      'expenses': 48
    },
    {
      'year': 'Utilities',
      'comapany': '', 'income': 33,
      'expenses': 19
    },
    {
      'year': 'Consumer',
      'comapany': '', 'income': 95,
      'expenses': 115
    },
    {
      'year': 'Customer',
      'comapany': '', 'income': 43,
      'expenses': 23
    },
    {
      'year': 'Communications',
      'comapany': '', 'income': 20,
      'expenses': 33
    },
    {
      'year': 'Materials',
      'comapany': '', 'income': 20,
      'expenses': 65,
    },
    {
      'year': 'Industrials',
      'comapany': '', 'income': 19,
      'expenses': 9
    },
    {
      'year': 'Energy',
      'comapany': '', 'income': 60,
      'expenses': 70
    },
    {
      'year': 'Financials',
      'comapany': '', 'income': 38,
      'expenses': 40
    }
  ];

  data2Quarter = [
    {
      'year': 'Health Care',
      'comapany': 45, 'income': 18,
      'expenses': 65
    },
    {
      'year': 'Real Estate',
      'comapany': 55, 'income': 30,
      'expenses': 35
    },
    {
      'year': 'Infotech',
      'comapany': 50, 'income': 60,
      'expenses': 30
    },
    {
      'year': 'Utilities',
      'comapany': 35, 'income': 55,
      'expenses': 85
    },
    {
      'year': 'Consumer',
      'comapany': 35, 'income': 50,
      'expenses': 35
    },
    {
      'year': 'Customer',
      'comapany': 60, 'income': 50,
      'expenses': 89
    },
    {
      'year': 'Communications',
      'comapany': 33, 'income': 68,
      'expenses': 85
    },
    {
      'year': 'Materials',
      'comapany': 25, 'income': 35,
      'expenses': 24,
    },
    {
      'year': 'Industrials',
      'comapany': 65, 'income': 36,
      'expenses': 25
    },
    {
      'year': 'Energy',
      'comapany': 25, 'income': 35,
      'expenses': 30
    },
    {
      'year': 'Financials',
      'comapany': 93, 'income': 60,
      'expenses': 50
    }
  ];

  quarterOrMonth1 = '1';
  quarterOrMonth2 = '1';
  quarterOrMonth3 = '1';
  subscription: Subscription;

  constructor(private modalService: BsModalService,
              private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      setTimeout(() => {
        this.gridApis.map((api) => {
          api.sizeColumnsToFit();
        });
      }, 500);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.params.api.sizeColumnsToFit();
  }

  ngOnInit() {
    ///// Char 4
    am4core.options.autoSetClassName = true;

    // Create chart instance
    let chart = am4core.create('activity-comission', am4charts.XYChart);

    // Add data
    chart.data = this.data1Quarter;

// Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.numberFormatter.numberFormat = '#';
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;
    const that = this;
    categoryAxis.events.on('hit', function (ev) {
      that.modal.show();
      // console.log(ev.target.value);
    });
    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

// Create series
    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = 'year';
      series.name = name;
      series.columns.template.tooltipText = '{name}: [bold]{valueX}[/]';
      series.columns.template.height = am4core.percent(55);
      series.sequencedInterpolation = true;
      switch (field) {
        case 'income':
          series.fill = am4core.color('#B7485F');
          series.stroke = am4core.color('#B7485F');
          break;
        case 'expenses':
          series.fill = am4core.color('#4F4E84');
          series.stroke = am4core.color('#4F4E84');
          break;
      }
      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = '{valueX}';
      valueLabel.label.horizontalCenter = 'left';
      valueLabel.label.dx = 10;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;

      let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      // categoryLabel.label.text = '{name}';
      categoryLabel.label.horizontalCenter = 'right';
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color('#fff');
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false;
    }

    createSeries('income', 'This Quarter');
    createSeries('expenses', 'Last Quarter');

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';
    chart.fontSize = 12;
    chart.cursor = new am4charts.XYCursor();
    this.chart = chart;

    let chart2 = am4core.create('chart2', am4charts.XYChart);

    // Add data
    chart2.data = this.data2Quarter;

// Create axes
    let categoryAxis2 = chart2.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis2.dataFields.category = 'year';
    //categoryAxis2.dataFields.
    categoryAxis2.numberFormatter.numberFormat = '#';
    categoryAxis2.renderer.inversed = true;
    categoryAxis2.renderer.grid.template.location = 0;
    categoryAxis2.renderer.cellStartLocation = 0.1;
    categoryAxis2.renderer.cellEndLocation = 0.9;

    let valueAxis2 = chart2.xAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.opposite = true;
    categoryAxis2.events.on('hit', function (ev) {
      that.modal.show();
      // console.log(ev.target.value);
    });

// Create series
    function createSeries2(field, name) {
      let series2 = chart2.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueX = field;
      series2.dataFields.categoryY = 'year';
      series2.name = name;
      series2.columns.template.tooltipText = '{name}: [bold]{valueX}[/]';
      series2.tooltip.autoTextColor = false;
      series2.tooltip.label.fill = am4core.color('#FFFFFF');
      series2.columns.template.height = am4core.percent(60);
      series2.sequencedInterpolation = true;
      switch (field) {
        case 'comapany':
          series2.fill = am4core.color('#B7485F');
          series2.stroke = am4core.color('#B7485F');
          break;
        case 'income':
          series2.fill = am4core.color('#4F4E84');
          series2.stroke = am4core.color('#4F4E84');
          break;
        case 'expenses':
          series2.fill = am4core.color('#86888A');
          series2.stroke = am4core.color('#86888A');
          break;
      }


      let valueLabel2 = series2.bullets.push(new am4charts.LabelBullet());
      valueLabel2.label.text = '{valueX}';
      valueLabel2.label.horizontalCenter = 'left';
      valueLabel2.label.dx = 10;
      valueLabel2.label.hideOversized = false;
      valueLabel2.label.truncate = false;

      let categoryLabel2 = series2.bullets.push(new am4charts.LabelBullet());
      // categoryLabel.label.text = '{name}';
      categoryLabel2.label.horizontalCenter = 'right';
      categoryLabel2.label.dx = -10;
      categoryLabel2.label.fill = am4core.color('#fff');
      categoryLabel2.label.hideOversized = false;
      categoryLabel2.label.truncate = false;
    }

    createSeries2('comapany', 'Company Reports');
    createSeries2('income', 'Industry Stand Alone Reports');
    createSeries2('expenses', 'Industry Weeklies and Monthlies');

    chart2.legend = new am4charts.Legend();
    chart2.legend.position = 'top';
    chart2.fontSize = 12;

    this.chart2 = chart2;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApis.push(params.api);
    this.gridColumnApi = params.columnApi;

    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
  }

  onFirstDataRendered(params) {
    this.params = params;
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 500);
  }

  changeSectorComparison(event) {
    if (event.target['value'] === 'Month') {
      this.chart.data = [...this.data1Month];
    }
    if (event.target['value'] === 'Quarter') {
      this.chart.data = [...this.data1Quarter];
    }
    // console.log(event.target.value);
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>, date, close) {
    const ctrlValue = date['value'];
    ctrlValue.year(normalizedYear.year());
    date.setValue(ctrlValue);
    if (close) {
      this.changeDPFormat(datepicker, 'YYYY');

      datepicker.close();
    }
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, date, dataName, data) {
    const ctrlValue = date['value'];
    ctrlValue.month(normalizedMonth.month());
    date.setValue(ctrlValue);

    /*const d = JSON.parse(JSON.stringify(datepicker._datepickerInput._dateFormats));
    d.display.dateInput = 'MM/YYYY';
    datepicker._datepickerInput._dateFormats = d;*/
    this.changeDPFormat(datepicker, 'MM/YYYY');

    datepicker.close();

    if (dataName.indexOf('chart') < 0) {
      this[dataName] = [...this.shuffle(data)];
    } else {
      this[dataName]['data'] = [...this.shuffle(data)];
    }
  }

  changeDPFormat(datepicker, format) {
    const d = JSON.parse(JSON.stringify(datepicker._datepickerInput['_dateFormats']));
    d.display.dateInput = format;
    datepicker._datepickerInput._dateFormats = d;
  }

  changeQuarterSelection(dataName, data) {
    if (dataName.indexOf('chart') < 0) {
      this[dataName] = [...this.shuffle(data)];
    } else {
      this[dataName]['data'] = [...this.shuffle(data)];
    }
  }

  changeQuarterOrMonth(datepicker: MatDatepicker<Moment>, quarter) {
    this.changeDPFormat(datepicker, quarter ? 'YYYY' : 'MM/YYYY');
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
