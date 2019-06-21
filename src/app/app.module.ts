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
import {PublishedReportsComponent} from './pages/published-reports/published-reports.component';
import {ReportsDistributionComponent} from './pages/reports-distribution/reports-distribution.component';
import {ReportsComapanyHedgeComponent} from './pages/reports-comapany-hedge/reports-comapany-hedge.component';
import { UsersComponent } from './pages/users/users.component';
import { CompanyComponent } from './pages/company/company.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import {SelectAndMoveComponent} from './component/select-and-move/select-and-move.component';
import {LoginComponent} from './pages/login/login.component';
import {ToastrModule} from 'ngx-toastr';
import { FirstTableComponent } from './component/first-table/first-table.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';

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
    HomepageComponent,
    PublishedReportsComponent,
    ReportsComapanyHedgeComponent,
    ReportsDistributionComponent,
    UsersComponent,
    SelectAndMoveComponent,
    CompanyComponent,
    LoginComponent,
    MainLayoutComponent,
    FirstTableComponent
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
    AppRoutingModule,
    NgxUiLoaderModule.forRoot({
      fgsSize: 0,
      fgsColor: 'rgba(203, 203, 203, 0.6)',
      pbThickness: 5,
      pbColor: '#8b1d41',
      overlayColor: 'rgba(203, 203, 203, 0.6)',
    }),
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
