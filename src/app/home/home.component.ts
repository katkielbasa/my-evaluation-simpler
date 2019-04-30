import { Component, OnInit, ViewEncapsulation,ChangeDetectionStrategy } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { NbMenuItem } from '@nebular/theme';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'home.component.html',
    styleUrls: [ 
],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    
    constructor() {
    }
  
    items: MenuItem[];
    // selected: string;
    // open: boolean;
  
    itemsLight = [
      { value: 'Add Server', icon: 'kanban', routerLink: ['/add'] },
      { value: 'Servers Table', icon: 'table', routerLink: ['/servers'] },
    ];
   
    ngOnInit() {
        this.items = [{
            label: 'Available Actions ',
            items: [
                {label: 'Add Server', routerLink: ['/add'], icon: 'pi pi-fw pi-plus'},
                {label: 'Servers Table', routerLink: ['/servers'], icon: 'pi pi-fw pi-download'}
            ]
        }];
      
    }
    itemsNb: NbMenuItem[] =  [
        {
          title: 'Add Server',
          link: '/add',
        },
        {
          title: 'Servers Table',
          link: '/servers',
        }
      ];
   
}

