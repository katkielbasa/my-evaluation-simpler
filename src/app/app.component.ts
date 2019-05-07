import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { Server, Organisation } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-evaluation';

  constructor() {
    setTheme('bs4'); // or 'bs4'
  }
}
