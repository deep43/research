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

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'HomePage',
      status: true
    },
    component: HomepageComponent,
  },
  {
    path: 'podcast',
    data: {
      title: 'Podcast',
      status: true
    },
    children: [
      {
        path: 'new',
        data: {
          title: 'New Podcast',
          status: true
        },
        component: PodcastComponent,
      },
      {
        path: 'listing',
        data: {
          title: 'Podcast Listing',
          status: true
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
        component: ComingSoonComponent,
      },
      {
        path: 'company',
        data: {
          title: 'Company',
          status: true
        },
        component: ComingSoonComponent,
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
        component: ComingSoonComponent,
      },
      {
        path: 'distribution',
        data: {
          title: 'Distribution',
          status: true
        },
        component: ComingSoonComponent
      },
      {
        path: 'published',
        data: {
          title: 'Published',
          status: true
        },
        component: ComingSoonComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
