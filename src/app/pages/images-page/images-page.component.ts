import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-images-page',
  templateUrl: './images-page.component.html',
  styleUrls: ['./images-page.component.scss']
})
export class ImagesPageComponent implements OnInit {
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('analystModal') analystModal: ModalDirective;
  sectorOrIndustry = '1';
  imageToUpload: File = null;
  imgUrl = '/assets/dashboard_images/image_preview.png';

  analystImageToUpload: File = null;
  analystImgUrl = '/assets/dashboard_images/image_preview.png';

  user: any = {
    firstName: 'John',
    lastName: 'Morrison',
    phone: '1 (403) 216-3400',
    email: 'john.morrison@cibc.com',
  };

  constructor(private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  openModal() {
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
  }

  handleUpload(files) {
    this.imageToUpload = files.item(0);

    const render = new FileReader();

    render.onload = (evt) => {
      this.imgUrl = evt.target['result'];
    };

    render.readAsDataURL(this.imageToUpload);
    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>' +
      ' Successfully uploaded the file' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );
  }

  openAnalystModal() {
    this.analystModal.show();
  }

  closeAnalystModal() {
    this.analystModal.hide();
  }

  handleAnalystUpload(files) {
    this.analystImageToUpload = files.item(0);

    const render = new FileReader();

    render.onload = (evt) => {
      this.analystImgUrl = evt.target['result'];
    };

    render.readAsDataURL(this.analystImageToUpload);
  }

  saveFootnote() {
    this.toastr.success('<span>' +
      '<i class="icofont icofont-check-circled pr-2"></i>' +
      'Images uploaded Successfully' +
      '</span>', '',
      {
        closeButton: true,
        enableHtml: true
      }
    );
  }

}
