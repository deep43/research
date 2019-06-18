import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ComplianceComponent} from './pages/compliance/compliance.component';
import {ImagesPageComponent} from './pages/images-page/images-page.component';
import {PartnersComponent} from './pages/partners/partners.component';
import {PodcastComponent} from './pages/podcast/podcast.component';
import {ReplacePDFComponent} from './pages/replace-pdf/replace-pdf.component';
import {ReportsComponent} from './pages/reports/reports.component';
import {RestrictedFlagComponent} from './pages/restricted-flag/restricted-flag.component';
import {SectorRatingsComponent} from './pages/sector-ratings/sector-ratings.component';
import {PodcastListingComponent} from './pages/podcast-listing/podcast-listing.component';
import {ComingSoonComponent} from './pages/coming-soon/coming-soon.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {PublishedReportsComponent} from './pages/published-reports/published-reports.component';
import {ReportsDistributionComponent} from './pages/reports-distribution/reports-distribution.component';
import {ReportsComapanyHedgeComponent} from './pages/reports-comapany-hedge/reports-comapany-hedge.component';
import {UsersComponent} from './pages/users/users.component';
import {CompanyComponent} from './pages/company/company.component';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        data: {
          title: 'Home',
          status: true
        },
        component: HomepageComponent,
      },
      {
        path: 'podcast',
        data: {
          title: 'Podcast',
          status: true,
          page: 'one'
        },
        children: [
          {
            path: 'new',
            data: {
              title: 'New Podcast',
              status: true,
              page: 'one'
            },
            component: PodcastComponent,
          },
          {
            path: 'listing',
            data: {
              title: 'Podcast Listing',
              status: true,
              page: 'two'
            },
            component: PodcastListingComponent,
          }
        ]
      },
      {
        path: 'administration',
        data: {
          title: 'Administration',
          status: true
        },
        children: [
          {
            path: 'users',
            data: {
              title: 'Users',
              status: true
            },
            component: UsersComponent,
          },
          {
            path: 'company',
            data: {
              title: 'Company',
              status: true
            },
            component: CompanyComponent,
          },
          {
            path: 'images',
            data: {
              title: 'Industry Images',
              status: true
            },
            component: ImagesPageComponent,
          },
          {
            path: 'partners',
            data: {
              title: 'Partners',
              status: true
            },
            component: PartnersComponent,
          }
        ]
      },
      {
        path: 'reports',
        data: {
          title: 'Reports',
          status: true
        },
        children: [
          {
            path: 'monthlystock',
            data: {
              title: 'Canadian Monthly Stock',
              status: true
            },
            component: ComingSoonComponent,
          },
          {
            path: 'companyhedge',
            data: {
              title: 'Company Hedge',
              status: true
            },
            component: ReportsComapanyHedgeComponent,
          },
          {
            path: 'distribution',
            data: {
              title: 'Distribution',
              status: true
            },
            component: ReportsDistributionComponent
          },
          {
            path: 'published',
            data: {
              title: 'Published',
              status: true
            },
            component: PublishedReportsComponent,
          },
          {
            path: 'ratingdistribution',
            data: {
              title: 'Rating Distribution',
              status: true
            },
            component: ReportsComponent,
          }
        ]
      },
      {
        path: 'compliance',
        data: {
          title: 'Clauses',
          status: true
        },
        component: ComplianceComponent,
      },
      {
        path: 'replacepdf',
        data: {
          title: 'Replace PDF on Research',
          status: true
        },
        component: ReplacePDFComponent,
      },
      {
        path: 'restricted',
        data: {
          title: 'Restricted Flag Override',
          status: true
        },
        component: RestrictedFlagComponent,
      },
      {
        path: 'sectorratings',
        data: {
          title: 'Sector Ratings',
          status: true
        },
        component: SectorRatingsComponent,
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
