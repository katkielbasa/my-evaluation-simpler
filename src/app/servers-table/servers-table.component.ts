import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Server } from '../_models';
import { ServersService, AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-servers-table',
  templateUrl: './servers-table.component.html',
  styleUrls: ['./servers-table.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ServersTableComponent implements OnInit {

  private servers: Server[];

  cols: any[];

  private deployed: SelectItem[];
  private started: SelectItem[];
  private speed: SelectItem[];
  private state:SelectItem[];
  private orgId: string;
  private serId:string;
  private orgName: string;
  private display: boolean = false;

  receiveMessage($event) {
    this.orgId = $event
    console.log("Selected Org: ", this.orgId )
  }
  constructor(private serverService: ServersService,
    private router: Router,
    private alertService: AlertService,
    private app: AppComponent
    ) {
 }
  ngOnInit() {
 
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'server_id', header: 'Server ID'},
      { field: 'count', header: 'CPU count' },
      { field: 'speed', header: 'CPU speed'},
      { field: 'memoryGB', header: 'Memory'},
      { field: 'createTime', header:'Created Time' },
      { field: 'started', header:'started' },
      { field: 'deployed', header:'Deployed' },
      { field: 'state', header:'state' }

    ];
    this.started = [
      { label: 'true', value: 'Yes' },
      { label: 'false', value: 'No' }
    ]
    this.deployed = [
      { label: 'true', value: 'Yes' },
      { label: 'false', value: 'No' }
    ]
    this.state = [
      { label: 'true', value: 'Yes' },
      { label: 'false', value: 'No' }
    ]
    this.speed = [
      { label: 'true', value: 'Yes' },
      { label: 'false', value: 'No' }
    ]
  }

  deleteServer(orgId: string, s_id: string)  {
    this.display = false;

    this.serverService.deleteServer(orgId, s_id).pipe(first()).subscribe(() => {
      this.alertService.success('Server deleted', true);
      this.loadAllServers(orgId)
    },
    error => {
      console.log("in error: ", error);
      this.alertService.error(error);
    });
  }
  viewDetails(server: Server): void {
    this.router.navigate(['/viewDetails', this.orgId, server.id] );

  }

  editServer(server: Server): void {
  //  console.log("edit server id ", server.id );
    this.router.navigate(['/edit', this.orgId, server.id] );
  };

  displayServers(){
    if(this.orgId == undefined){
    this.orgId = this.app.selectedOrg_id;
  }
   this.loadAllServers(this.orgId);
   
  }


  showDialog(server:Server) {
      this.display = true;
      this.serId = server.id;
  }

  private loadAllServers(orgId:string) {
    this.serverService.getServersForOrg(orgId).pipe(first()).subscribe(servers => {
      this.servers = servers['server'];
      this.orgName = servers['organizationName'];
     // console.log("my servers: ", JSON.stringify(this.servers))
    });
  }
}