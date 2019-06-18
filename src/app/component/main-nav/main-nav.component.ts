import {Component, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable, Subject} from 'rxjs';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {filter, map} from 'rxjs/operators';
import {MessageService} from '../../shared/shared-service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        display: 'block',
      })),
      state('closed', style({
        display: 'none',
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
    trigger('openCloseLink', [
      state('link-opened', style({
        display: 'inline-block'
      })),
      state('link-closed', style({
        display: 'none'
      })),
      transition('link-opened => link-closed', [
        animate('0.3s')
      ]),
      transition('link-closed => link-opened', [
        animate('0.3s')
      ]),
    ]),
    trigger('openCloseMegaMenu', [
      state('open', style({
        visibility: 'visible'
      })),
      state('close', style({
        visibility: 'none'
      })),
      transition('open => close', [
        animate('0.3s')
      ]),
      transition('close => open', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class MainNavComponent {
  // keyboardEventsManager: ListKeyManager;
  megaMenuOpened = false;
  searchOpened = false;
  searchMenuOpened = false;
  showFullNavigation = true;
  showNavigationMenu = true;
  showLink = false;
  slideColor = 'blue';

  /* menuItems = [
     {id: '/', icon: 'feather icon-bar-chart', clicked: false, link: true, title: 'New Item New Item'},
     {id: '/images', icon: 'feather icon-image', clicked: false, link: true, title: 'New Item New Item'},
     {id: '/partners', icon: 'feather icon-map', clicked: false, link: true, title: 'New Item New Item'},
     {id: '/podcast', icon: 'feather icon-grid', clicked: false, link: true, title: 'New Item New Item'},
     {
       id: '/client', icon: 'feather icon-briefcase', clicked: false, title: 'New Item New Item', submenu: true,
       links: [
         {id: '/client', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'New Item New Item'},
         {id: '/client', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'New Item New Item'},
         {id: '/client', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'New Item New Item'},
       ]
     },
     {
       id: '/symbol', icon: 'feather icon-trending-up', clicked: false, title: 'New Item New Item', submenu: true,
       links: [
         {id: '/symbol', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'New Item New Item'},
         {id: '/symbol', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'New Item New Item'},
         {id: '/symbol', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'New Item New Item'},
       ]
     },
     /!*{
       id: '/sector', icon: 'feather icon-box', clicked: true, submenuWithSearch: true, title: 'Search Sector',
       links: [
         {id: '/sector', icon: '', clicked: true, searchable: false, title: 'Trading'},
         {id: '/sector', icon: '', clicked: true, searchable: false, title: 'Banking'},
         {id: '/sector', icon: '', clicked: true, searchable: false, title: 'Health care'},
         {id: '/sector', icon: 'feather icon-plus', clicked: true, searchable: false, title: 'Add New'}
       ]
     },
     {
       id: '/preset', icon: 'feather icon-server', clicked: true, submenuWithSearch: true, title: 'Search Preset',
       links: [
         {id: '/preset', icon: '', clicked: true, searchable: false, title: 'Barrick gold'},
         {id: '/preset', icon: '', clicked: true, searchable: false, title: 'Goldman Sachs'},
         {id: '/preset', icon: '', clicked: true, searchable: false, title: 'FxExchange'},
         {id: '/preset', icon: 'feather icon-plus', clicked: true, searchable: false, title: 'Add New'}
       ]
     }*!/
   ];*/

  menuItems = [
    {id: '/', icon: 'feather icon-home', clicked: false, link: true, title: 'Home'},
    {
      id: '/podcast', icon: 'feather icon-play-circle', clicked: false, submenu: true, title: 'Podcast',
      links: [
        {id: '/podcast/new', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'New Podcast'},
        {id: '/podcast/listing', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'Podcast Listing'},
      ]
    },
    {
      id: '/administration', icon: 'feather icon-shield', clicked: false, submenu: true, title: 'Administration',
      links: [
        {id: '/administration/users', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'Users'},
        {id: '/administration/company', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'Company'},
        {id: '/administration/images', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'Images'},
        {id: '/administration/partners', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'Partners'},
      ]
    },
    {
      id: '/reports', icon: 'feather icon-bar-chart', clicked: false, submenu: true, title: 'Reports',
      links: [
        {
          id: '/reports/monthlystock', icon: 'feather icon-chevrons-right',
          clicked: false, searchable: false, title: 'Canadian Monthly Stock'
        },
        {id: '/reports/companyhedge', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'Company Hedge'},
        {id: '/reports/distribution', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'Distribution'},
        {id: '/reports/published', icon: 'feather icon-chevrons-right', clicked: false, searchable: false, title: 'Published'},
        {
          id: '/reports/ratingdistribution', icon: 'feather icon-chevrons-right',
          clicked: false, searchable: false, title: 'Rating Distribution'
        },
      ]
    },
    {id: '/compliance', icon: 'feather icon-edit', clicked: false, link: true, title: 'Compliance Hedge Clauses'},
    {id: '/replacepdf', icon: 'feather icon-repeat', clicked: false, link: true, title: 'Replace PDF on Research'},
    {id: '/restricted', icon: 'feather icon-flag', clicked: false, link: true, title: 'Restricted Flag Override'},
    {id: '/sectorratings', icon: 'feather icon-award', clicked: false, link: true, title: 'Sector and Ratings'},
  ];
  /* menuItems = Array.from({length: 10}, (_, i) => {
     return {id: i === 0 ? '/' : '/ee', icon: 'feather icon-bar-chart', clicked: true, link: true, title: `Nav Item New Item  ${i + 1}`};
   });*/
  menuItemsCopy = this.menuItems.map(x => Object.assign({}, x));

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  notifications = [
    {
      message: '<a class="notification-link" [routerLink]="/client" ' +
      'href="/#/client">Client ‘1832’</a> just executed a block trade on symbol: ‘XYZ’',
      id: 1
    },
    {message: 'John Smith from ABC Investments has had recent meetings about ‘ABC’', id: 2},
    {message: 'Bob Jones from Mackenzie might be interested in taking a position in ‘GHY’', id: 3},
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  public model: any;

  ngOnInit() {
    // this.searchClient(new Subject<string>());
  }

  toggleMegaMenu() {
    this.megaMenuOpened = !this.megaMenuOpened;
  }

  toggleSearchMenuOnMobile() {
    this.searchMenuOpened = !this.searchMenuOpened;
  }


  clickedOutMegaMenu() {
    if (this.megaMenuOpened) {
      this.megaMenuOpened = false;
    }
  }

  onEscKeyUp(event) {
    if (event.key === 'Escape') {
      if (this.searchOpened) {
        this.searchOpened = false;
      }

      if (this.megaMenuOpened) {
        this.megaMenuOpened = false;
      }
    }
  }

  toggleMenuItem(menuItem) {
    /* if (!menuItem.clicked) {

    } */

    this.showLink = !menuItem.clicked;
    this.menuItems = this.menuItems.map((item) => {
      item.clicked = false;

      return item;
    });
    menuItem.clicked = !menuItem.clicked;
  }

  toggle(event) {
    this.showFullNavigation = event.checked;
    this.messageService.sendMessage(this.showFullNavigation);
  }

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router, private route: ActivatedRoute,
              private messageService: MessageService) {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(x => {
      this.searchOpened = false;
      console.log(this.router.url);
    });
  }


  goToPage(link) {
    this.router.navigateByUrl(`/${link}`);
  }

  mouseEnter(menuItem) {
    if (this.showFullNavigation) {
      return;
    }
    this.showLink = !menuItem.clicked;
    this.menuItems = this.menuItems.map((item) => {
      item.clicked = false;

      return item;
    });
    menuItem.clicked = !menuItem.clicked;
    this.showNavigationMenu = true;
  }

  mouseLeave(menuItem) {
    if (this.showFullNavigation) {
      return;
    }
    this.showNavigationMenu = false;
    this.menuItems = this.menuItems.map((item) => {
      item.clicked = true;

      return item;
    });
  }

  deleteNotification($event, notification) {
    this.notifications = this.notifications.filter((item) => {
      return item.id !== notification.id;
    });
    if (this.notifications.length) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  clearAllNotifications() {
    this.notifications = [];
  }

  onClickMenuItem(event, item) {
    if (!item.link) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onFocusSearchInput(event, item) {
    item.active = !item.active;
  }

  onChangeSubmenuWithSearch($event, item) {
    let itemCopy = this.menuItemsCopy.filter(itemCopy => {
      return itemCopy.title === item.title;
    })[0];
    item['links'] = itemCopy['links'].filter(link => {
      return link.title.toLowerCase().indexOf($event.target.value.toLowerCase()) >= 0;
    });
  }

  itemSelected(event) {
    this.router.navigateByUrl(event.item.id);
  }

  openSubmenu(item) {
    const clicked = item.clicked;
    if (!clicked) {
      this.menuItems = this.menuItems.map((menu) => {
        menu.clicked = false;

        return menu;
      });
    }
    item.clicked = !item.clicked;

    if (!item.links) {
      this.router.navigateByUrl(item.id);
    }
  }

  onSublinkCliked($event, submenu) {
    $event.stopPropagation();
    $event.preventDefault();
    const clicked = submenu.clicked;
    if (!clicked) {
      this.menuItems = this.menuItems.map((menu) => {
        // menu.clicked = false;
        if (menu.links) {
          menu.links = menu.links.map((submenuItem) => {
            submenuItem.clicked = false;

            return submenuItem;
          });
        }

        return menu;
      });
    }
    submenu.clicked = !submenu.clicked;
  }
}
