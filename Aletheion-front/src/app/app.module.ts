import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {WelcomePage} from '../pages/welcome/welcome';
import {RIBWaitingListPage} from '../pages/RIB-waiting-list/RIB-waiting-list';
import {RIBWaitingDetailPage} from '../pages/RIB-waiting-detail/RIB-waiting-detail';
import {RIBCertifiedListPage} from '../pages/RIB-certified-list/RIB-certified-list';
import {RIBCertifiedDetailPage} from '../pages/RIB-certified-detail/RIB-certified-detail';
import {RIBRejectedListPage} from '../pages/RIB-rejected-list/RIB-rejected-list';
import {RIBRejectedDetailPage} from '../pages/RIB-rejected-detail/RIB-rejected-detail';
import {AboutPage} from '../pages/about/about';

import {RIBService} from "../providers/RIB-service-rest";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TouchID } from '@ionic-native/touch-id';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    AboutPage,
    RIBWaitingListPage,
    RIBWaitingDetailPage,
    RIBCertifiedListPage,
    RIBCertifiedDetailPage,
    RIBRejectedListPage,
    RIBRejectedDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    AboutPage,
    RIBWaitingListPage,
    RIBWaitingDetailPage,
    RIBCertifiedListPage,
    RIBCertifiedDetailPage,
    RIBRejectedListPage,
    RIBRejectedDetailPage
  ],
  providers: [
    StatusBar,
    TouchID,
    SplashScreen,
    RIBService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
