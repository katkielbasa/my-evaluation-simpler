import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { routing } from './app.routing';
import { HomeComponent } from './home';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//clarity
import { ClarityModule } from '@clr/angular';
//material
import {MatMenuModule} from '@angular/material/menu'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatGridListModule} from '@angular/material/grid-list'; 

//primeng
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
//nebular
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbButtonModule, NbCardModule } from '@nebular/theme';
//ngbootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//ngzorro
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

//ng-lightening
import {NglModule, NGL_ICON_CONFIG, NglIconConfig} from 'ng-lightning';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    MatGridListModule,
    BrowserAnimationsModule,
    NgbModule,
    NglModule,
    // routing,
    MenuModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    ButtonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbCardModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    { provide: NGL_ICON_CONFIG, useValue: <NglIconConfig>{ svgPath: '/my/path' }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
