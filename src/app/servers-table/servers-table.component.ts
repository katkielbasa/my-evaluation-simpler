import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Server } from '../_models';
import { ServersService, AlertService } from '../_services';
import { SortEvent } from 'primeng/api';
import { first } from 'rxjs/operators';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrgSelectorComponent } from '../org-selector/org-selector.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-servers-table',
  templateUrl: './servers-table.component.html',
  styleUrls: ['./servers-table.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ServersTableComponent implements OnInit {

  servers: Server[];

  cols: any[];

  deployed: SelectItem[];
  started: SelectItem[];
  speed: SelectItem[];
  state:SelectItem[];
  orgId: string;
  orgName: string;

  receiveMessage($event) {
    this.orgId = $event
    console.log("Selected Org: ", this.orgId )
  }

  constructor(private serverService: ServersService,
    private formBuilder: FormBuilder,
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
    this.serverService.deleteServer(orgId, s_id).pipe(first()).subscribe(() => {
      this.loadAllServers(orgId)
    });
  }

  editServer(server: Server): void {
    //localStorage.removeItem("editServerId");
    //localStorage.setItem("editServerId", server.id);
    console.log("edit server id ", server.id );

    this.router.navigate(['/edit', this.orgId, server.id] );
  };

  displayServers(){
    if(this.orgId == undefined){
      console.log("it was undefined")
    this.orgId = this.app.selectedOrg_id;
  }
   this.loadAllServers(this.orgId);
   console.log("Selected org: ", this.app.selectedOrg_id)
   
  }


  private loadAllServers(orgId:string) {
    this.serverService.getServersForOrg(orgId).pipe(first()).subscribe(servers => {
      this.servers = servers['server'];
      this.orgName = servers['organizationName'];
      console.log("my servers: ", JSON.stringify(this.servers))
    });
  }
}