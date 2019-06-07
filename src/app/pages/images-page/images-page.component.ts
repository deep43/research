import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

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
  imgUrl = '/assets/dashboard_images/photo_gallery.jpg';

  analystImageToUpload: File = null;
  analystImgUrl = '/assets/dashboard_images/photo_gallery.jpg';

  user: any = {
    firstName: 'John',
    lastName: 'Morrison',
    phone: '1 (403) 216-3400',
    email: 'john.morrison@cibc.com',
  };

  constructor() {
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

}
