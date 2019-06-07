import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from './material.module';
import {MatNativeDateModule} from '@angular/material';
import { ComplianceComponent } from './pages/compliance/compliance.component';
import {AgGridModule} from 'ag-grid-angular';
import {SharedModule} from './shared/shared.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {MainNavComponent} from './component/main-nav/main-nav.component';
import {BreadcrumbsComponent} from './component/breadcrumbs/breadcrumbs.component';
import { ImagesPageComponent } from './pages/images-page/images-page.component';
import {PhoneMaskDirective} from './component/helpers/phone-mask-directive';
import { PartnersComponent } from './pages/partners/partners.component';
import { PodcastComponent } from './pages/podcast/podcast.component';
import { ReplacePDFComponent } from './pages/replace-pdf/replace-pdf.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { RestrictedFlagComponent } from './pages/restricted-flag/restricted-flag.component';
import { SectorRatingsComponent } from './pages/sector-ratings/sector-ratings.component';
import {PodcastListingComponent} from './pages/podcast-listing/podcast-listing.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import {ComingSoonComponent} from './pages/coming-soon/coming-soon.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    MainNavComponent,
    BreadcrumbsComponent,
    ComplianceComponent,
    ImagesPageComponent,
    PhoneMaskDirective,
    PartnersComponent,
    PodcastComponent,
    PodcastListingComponent,
    ReplacePDFComponent,
    ReportsComponent,
    RestrictedFlagComponent,
    SectorRatingsComponent,
    ComingSoonComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AgGridModule,
    ModalModule.forRoot(),
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
