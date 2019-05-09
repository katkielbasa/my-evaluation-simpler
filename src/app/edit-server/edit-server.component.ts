import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input()
  orgId: string; 
  @Input()
  serverId: string; 
  loading = false;
  submitted = false;
  //editServerForm: FormControl;
  serverToEdit: Server;
  editedServer: Server;

  constructor(
    private router: Router,
    private serverService: ServersService,
    private alertService: AlertService,
    private org:OrgSelectorComponent
    
  ) {
    
   }

  ngOnInit() {
    this.loadServer();
    }

  private loadServer() {
    this.serverService.getServerById(this.orgId, this.serverId).pipe(first()).subscribe(
      server=>
      this.serverToEdit = server
    )
    console.log("serverToedit", this.serverToEdit);
 }

  onSubmit() {
    this.orgId = this.org.selectedOrg_id;
    console.log("My org id is: ", this.orgId)
    this.submitted = true;

 
    this.loading = true;
    this.submitted = true;

    //if (this.editServerForm.invalid) {
     // return;
    //}
    this.loading = true;

    this.serverService.updateServer(this.orgId, this.editedServer)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Server updated', true);
          this.router.navigate(['/servers']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;

        });
  }
}
