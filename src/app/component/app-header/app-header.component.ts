import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) snav: MatSidenav;
  toggleAppSideNav = false;

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  fillerNav = Array.from({length: 10}, (_, i) => `Nav Item New Item  ${i + 1}`);
  appTitle = 'Research Admin';

  navLinks = [
    {name: 'Compliance Hedge Clauses'},
    {name: 'Images'},
    {name: 'Partners'},
    {name: 'Podcasts'},
    {name: 'Replace PDF on Research Central'},
    {name: 'Reports'},
    {name: 'Restricted Flag Override'},
    {name: 'Sector and Industry Classification'},
    {name: 'Sector Rating Change'}
  ];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  ngOnInit() {
  }

  toggleSideNav() {
    this.snav.toggle();
    this.toggleAppSideNav = !this.toggleAppSideNav;
  }
}
