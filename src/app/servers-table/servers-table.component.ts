import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Server } from '../_models';
import { ServersService, AlertService } from '../_services';
import { SortEvent } from 'primeng/api';
import { first } from 'rxjs/operators';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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


  @Input()
  org_id: string;

  constructor(private serverService: ServersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
) {
 }

  ngOnInit() {
    //this.serverService.getServersSmall().then(servers => this.servers = servers);
    this.loadAllServers(this.org_id);
 
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 's_id', header: 'Server ID'},
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

  deleteServer(org_id: string, s_id: string)  {
    this.serverService.deleteServer(org_id, s_id).pipe(first()).subscribe(() => {
      this.loadAllServers(org_id)
    });
  }

  editServer(server: Server): void {
    localStorage.removeItem("editServerId");
    localStorage.setItem("editServerId", server.id);
    this.router.navigate(['/update']);
  };


  private loadAllServers(org_id:string) {
    this.serverService.getServersForOrg(org_id).pipe(first()).subscribe(servers => {
      this.servers = servers;
    });
  }
}