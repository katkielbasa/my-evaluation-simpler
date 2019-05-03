import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { routing } from './app.routing';
import { AlertService, ServersService } from './_services';
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
import {MatDividerModule} from '@angular/material/divider'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatListModule} from '@angular/material/list'; 
//primeng
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TooltipModule} from 'primeng/tooltip';
import {ProgressBarModule} from 'primeng/progressbar';
import {CaptchaModule} from 'primeng/captcha';
import {ToastModule} from 'primeng/toast';
//nebular
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbButtonModule, NbCardModule } from '@nebular/theme';
//ngbootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//ngx-bootstrao
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//ngzorro
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

//ng-lightening
import {NglModule, NGL_ICON_CONFIG, NglIconConfig} from 'ng-lightning';
//KENDO
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { MenusModule } from '@progress/kendo-angular-menu';
import { AddServerComponent } from './add-server/add-server.component';
import { EditServerComponent } from './edit-server/edit-server.component';
import { ServerDetailsComponent } from './server-details/server-details.component';
import { ServersTableComponent } from './servers-table/servers-table.component';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddServerComponent,
    EditServerComponent,
    ServerDetailsComponent,
    ServersTableComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    MatGridListModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgbModule,
    NglModule,
    MatBadgeModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    TooltipModule,
    ProgressBarModule,
    CaptchaModule,
    ToastModule,
    MatListModule,
    // routing,
    MenuModule,
    MenusModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatButtonModule,
    ButtonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    BsDropdownModule.forRoot(),
    NbCardModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ButtonsModule,
    LayoutModule
  ],
  providers: [
    ServersService,
    AlertService,
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NGL_ICON_CONFIG, useValue: <NglIconConfig>{ svgPath: '/my/path' }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
