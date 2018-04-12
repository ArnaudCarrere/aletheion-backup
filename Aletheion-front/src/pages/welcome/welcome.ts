import {Component, ViewChild} from '@angular/core';
import {Slides, Nav} from 'ionic-angular';
import {RIBWaitingListPage} from '../RIB-waiting-list/RIB-waiting-list';
import {QRScan} from '../QR-scan/QR-scan';

@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {
  @ViewChild(Slides) slides: Slides;

    constructor(public nav: Nav) {
    }

    ngAfterViewInit() {
      this.slides.pager = true;
    }

    openRIBWaitingList() {
        this.nav.setRoot(RIBWaitingListPage);
    }

    openScanner() {
        this.nav.setRoot(QRScan);
    }

}