import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  analystImageToUpload: File = null;
  analystImgUrl = '/assets/dashboard_images/image_preview.png';

  constructor(private toastr: ToastrService, ) {
  }

  ngOnInit() {
  }

  handleAnalystUpload(files) {
    this.analystImageToUpload = files.item(0);

    const render = new FileReader();

    render.onload = (evt) => {
      this.analystImgUrl = evt.target['result'];
    };

    render.readAsDataURL(this.analystImageToUpload);
  }

  addNewClause() {
    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>' +
      ' Successfully Saved Organization Information' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );
  }
}
