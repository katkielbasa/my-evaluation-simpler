import { Component, OnInit, Input } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, ServersService } from '../_services';
import { AppComponent } from '../app.component';
import { Server } from '../_models';
import { OrgSelectorComponent } from '../org-selector/org-selector.component';
@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {

  orgId: string; 
  @Input()
  serverId: string; 
  loading = false;
  submitted = false;
  //editServerForm: FormControl;
  serverToEdit: Server;
  editedServer: Server;
  sub:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serverService: ServersService,
    private alertService: AlertService,
    private app: AppComponent
    // private org:OrgSelectorComponent
  ) {
    
   }

  ngOnInit() {
   
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.orgId = params['oid'];
      this.serverId = params['sid'];
      console.log('oid', this.orgId);
      console.log('sid', this.serverId);

    });
    this.loadServer();
    }

  private loadServer() {
    this.serverService.getServerById(this.orgId, this.serverId).pipe(first()).subscribe(
      server=>{
      this.serverToEdit = server;
      console.log("server to edit", this.serverToEdit);

      });
 }
//  private loadAllOrganisations() {
//   this.serverService.getAllOrganisations().pipe(first()).subscribe(organisations => {
//     this.organisations = organisations['organizations'];
//     console.log("organisation", this.organisations);
//     this.selectedOrg_id = this.organisations[0].id;
//     console.log("load selected org", this.selectedOrg_id);

//  });
// }

  onSubmit(event: any): void {
    //this.orgId = this.app.selectedOrg_id;
    this.submitted = true;
    this.editedServer = event;
    console.log("this.editedServer ", JSON.stringify(this.editedServer));
    console.log("this.editedServer ", this.editedServer);

    this.loading = true;
    this.submitted = true;

    //if (this.editServerForm.invalid) {
     // return;
    //}
    this.loading = true;

    this.serverService.updateServer(this.orgId, this.serverId, this.editedServer)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Server updated', true);
          this.router.navigate(['/servers']);
        },
        error => {
          this.alertService.error(error.message);
          this.loading = false;
          console.log("error", error)
          console.log("error body", error.error)
          console.log("error status", error.status)
        });
  }
}
