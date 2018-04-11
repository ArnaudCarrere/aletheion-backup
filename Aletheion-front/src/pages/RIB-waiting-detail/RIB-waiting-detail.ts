import {Component} from '@angular/core';
import {ActionSheetController, NavController, NavParams, ToastController, Nav} from 'ionic-angular';
import {RIBService} from '../../providers/RIB-service-rest';
import {RIBWaitingListPage} from '../RIB-waiting-list/RIB-waiting-list';

@Component({
    selector: 'page-RIB-waiting-detail',
    templateUrl: 'RIB-waiting-detail.html'
})
export class RIBWaitingDetailPage {

    RIB: any;

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public RIBService: RIBService, public toastCtrl: ToastController, public nav: Nav) {
        this.RIB = this.navParams.data;
        RIBService.findById(this.RIB.id).then(
            RIB => this.RIB = RIB
        );
    }

    reject(RIB) {
        this.RIBService.reject(RIB)
            .then(RIB => {
                let toast = this.toastCtrl.create({
                    message: 'RIB rejected',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
                this.nav.setRoot(RIBWaitingListPage);
            });
    }

    certify(RIB) {
        this.RIBService.certify(RIB)
            .then(RIB => {
                let toast = this.toastCtrl.create({
                    message: 'RIB certified',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
                this.nav.setRoot(RIBWaitingListPage);
            });
    }

}
