import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatToolbarModule, MatButtonModule, MatSidenavModule,
  MatIconModule, MatListModule, MatCardModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

import {CustomCardComponent} from './custom-card/custom-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ClickOutsideModule} from 'ng-click-outside';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    FormsModule,
    ModalModule.forRoot(),
    AgGridModule.withComponents([]),
    ClickOutsideModule,
  ],
  exports: [
    CustomCardComponent,
  ],
  declarations: [
    CustomCardComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {
}
