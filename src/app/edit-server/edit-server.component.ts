import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, ServersService } from '../_services';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  @Input()
  orgId: string; 
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private ServerService: ServersService,
    private alertService: AlertService,
    private app:AppComponent
  ) {
    
   }

  ngOnInit() {
  }

  onSubmit() {
    this.orgId = this.app.selectedOrg_id;
    console.log("My org id is: ", this.orgId)
    this.submitted = true;

 
    this.loading = true;
    // this.ServerService.addServer(this.orgId, this.submitServerForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       console.log('I am in consoel');

    //       this.alertService.success('Server added', true);
    //       this.router.navigate(['/servers']);
    //     },
    //     error => {
    //       console.log("in error: ", error);
    //       this.alertService.error(error);
    //       this.loading = false;

    //     });
}
}