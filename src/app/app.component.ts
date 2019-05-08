import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Server, Organisation } from './_models';
import {ServersService} from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-evaluation';
  organisationForm: FormGroup;
  organisations: Organisation[];

  constructor(private fb: FormBuilder,
    private service: ServersService
  ) {
    setTheme('bs4'); // or 'bs4'
    this.loadAllOrganisations();
//    console.log(this.organisations[0]);
  }
  private loadAllOrganisations() {
    this.service.getAllOrganisations().pipe(first()).subscribe(organisations => {
      this.organisations = organisations;
    });
  }


ngOnInit() {
 this.organisationForm = this.fb.group({
   organisationControl: ['']
 });
}

}
