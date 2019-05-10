
import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, ServersService } from '../_services';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddServerComponent implements OnInit {

  @Input()
  orgId: string;
  submitServerForm: FormGroup;

  loading = false;
  submitted = false;
  payload: string

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ServerService: ServersService,
    private alertService: AlertService,
    private app: AppComponent
  ) {
  }
  receiveMessage($event) {
    this.orgId = $event
    console.log("Selected Org: ", this.orgId )
  }

  ngOnInit() {
    this.submitServerForm = this.formBuilder.group({
      name: ['',
        [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
        ]
      ],
      id: ['',
        [
        Validators.required,
        Validators.pattern('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'),
        Validators.maxLength(36),
        Validators.minLength(36)
        ]
      ],
      description: ['',
        [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(300)
        ]
      ],
      cpu: this.formBuilder.group({
        count: ['', 
        [
          Validators.required,
          Validators.min(1),
          Validators.max(64)
          ]
        ],
        speed: ['', Validators.required],
        coresPerSocket: ['', 
        [
          Validators.required,
          Validators.pattern('^[0-6]{0,1}[02468]{1}$'),
          Validators.min(2),
          Validators.max(64)          ]
        ]
      }),
      memoryGb: ['', 
      [
        Validators.required,
        Validators.max(64),
        Validators.min(1)
        ]
      ],
      network: this.formBuilder.group({
        id: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'),
          Validators.maxLength(36),
          Validators.minLength(36)
          ]
        ],
        privateIpv4: ['', 
        [
          Validators.required,
          Validators.pattern('^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$')
          ]
        ],
        vlanId: ['', 
        [
          Validators.required,
          Validators.pattern('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'),
          Validators.maxLength(36),
          Validators.minLength(36)
          ]
        ],
        vlanName: ['',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3)
          ]
        ],

      }),
      createTime: ['', 
      [
        Validators.required        ]
      ],
      deployed: ['', Validators.required],
      started: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.submitServerForm.controls; }

  onSubmit() {
    if(this.orgId == undefined){

    this.orgId = this.app.selectedOrg_id;
    }
    this.submitted = true;

    this.payload = JSON.stringify(this.submitServerForm.value);
   // console.log("payload: ", JSON.stringify(this.submitServerForm.value));

    if (this.submitServerForm.invalid) {
    //  console.log("Form is invalid: ", this.submitServerForm.value);

      return;
    }
    // console.log("Form is valid: ", this.submitServerForm.value);
    // console.log("Create date: ", this.submitServerForm.value.createDate);

    this.loading = true;
    this.ServerService.addServer(this.orgId, this.submitServerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log("this.submitServerForm ", this.submitServerForm)
          this.alertService.success('Server added', true);
          this.router.navigate(['/servers']);
        },
        error => {
          this.alertService.error(error.message);
          this.loading = false;
        });
  }
}