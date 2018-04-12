import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {RIBWaitingListPage} from '../pages/RIB-waiting-list/RIB-waiting-list';
import {RIBCertifiedListPage} from '../pages/RIB-certified-list/RIB-certified-list';
import {RIBRejectedListPage} from '../pages/RIB-rejected-list/RIB-rejected-list';
import {WelcomePage} from '../pages/welcome/welcome';
import {AboutPage} from '../pages/about/about';
import {QRScan} from '../pages/QR-scan/QR-scan';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = WelcomePage;

    appMenuItems: Array<MenuItem>;

    helpMenuItems: Array<MenuItem>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        this.appMenuItems = [
            {title: 'Awaiting RIBs', component: RIBWaitingListPage, icon: 'alert'},
            {title: 'Certified RIBs', component: RIBCertifiedListPage, icon: 'checkbox'},
            {title: 'Rejected RIBs', component: RIBRejectedListPage, icon: 'close-circle'},
            {title: 'QR Code Scanner', component: QRScan, icon: 'qr-scanner'}
        ];

        this.helpMenuItems = [
            {title: 'Welcome', component: WelcomePage, icon: 'home'},
            {title: 'About', component: AboutPage, icon: 'information-circle'},
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
