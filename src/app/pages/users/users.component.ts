import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  analystImageToUpload: File = null;
  analystImgUrl = '/assets/dashboard_images/image_preview.png';
  phone = '';

  constructor(private toastr: ToastrService) {
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

  addNewClause(){
    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>' +
      ' Successfully Saved User Information' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );
  }
}
