import {Component} from '@angular/core';
import {ActionSheetController, NavController, NavParams, ToastController, Nav} from 'ionic-angular';
import {RIBService} from '../../providers/RIB-service-rest';
import {RIBCertifiedListPage} from '../RIB-certified-list/RIB-certified-list';
import {TouchID} from '@ionic-native/touch-id';


@Component({
    selector: 'page-RIB-certified-detail',
    templateUrl: 'RIB-certified-detail.html'
})
export class RIBCertifiedDetailPage {

    RIB: any;

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public RIBService: RIBService, public toastCtrl: ToastController, public nav: Nav, private touchId: TouchID) {
        this.RIB = this.navParams.data;
        RIBService.findById(this.RIB.id).then(
            RIB => this.RIB = RIB
        );
    }

    reject(RIB) {
        this.touchId.verifyFingerprint('Scan your fingerprint please')
            .then(
                res => this.RIBService.reject(RIB)
                    .then(RIB => {
                        let toast = this.toastCtrl.create({
                            message: 'RIB rejected',
                            cssClass: 'mytoast',
                            duration: 1000
                        });
                        toast.present(toast);
                        this.nav.setRoot(RIBCertifiedListPage);
                    }),
                err => console.error('Error', err)
            );
    }

}
