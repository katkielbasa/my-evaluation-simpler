
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, ServersService } from '../_services';
//import { Constants } from '../constants';

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent implements OnInit {

  @Input()
  orgId: string;
  submitServerForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ServerService: ServersService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.submitServerForm = this.formBuilder.group({
      name: ['', Validators.required],
      s_id: ['',
        [
          Validators.required
          , Validators.pattern('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i')]
      ],
      description: ['', Validators.required],
      cpu: [this.formBuilder.group({
        count: ['', Validators.required],
        speed: ['', Validators.required],
        corePerSocket: ['', Validators.required]
      }),
      Validators.required
      ],
      memoryGb: ['', Validators.required],
      network: [this.formBuilder.group({
        n_id: ['',
          [
            Validators.required
            , Validators.pattern('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i')]
        ],
        privateIpv4: ['', Validators.required],
        vlanId: ['', Validators.required],
        vlanName: ['', Validators.required]

      }), Validators.required],
      createdTime: ['', Validators.required],
      deployed: ['', Validators.required],
      started: ['', Validators.required],
      state: ['', Validators.required]


    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.submitServerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.submitServerForm.invalid) {
      return;
    }

    this.loading = true;
    this.ServerService.addServer(this.orgId, this.submitServerForm.value)
      .pipe(first())
      .subscribe(
        data => {

          this.alertService.success('Server added', true);
          this.router.navigate(['/Servers']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}