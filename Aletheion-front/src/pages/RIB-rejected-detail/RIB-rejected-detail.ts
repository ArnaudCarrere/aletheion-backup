import {Component} from '@angular/core';
import {ActionSheetController, NavController, NavParams, ToastController, Nav} from 'ionic-angular';
import {RIBService} from '../../providers/RIB-service-rest';
import {RIBRejectedListPage} from '../RIB-rejected-list/RIB-rejected-list';
import {TouchID} from '@ionic-native/touch-id';


@Component({
    selector: 'page-RIB-rejected-detail',
    templateUrl: 'RIB-rejected-detail.html'
})
export class RIBRejectedDetailPage {

    RIB: any;

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public RIBService: RIBService, public toastCtrl: ToastController, public nav: Nav, private touchId: TouchID) {
        this.RIB = this.navParams.data;
        RIBService.findById(this.RIB.id).then(
            RIB => this.RIB = RIB
        );
    }

    certify(RIB) {
        this.touchId.verifyFingerprint('Scan your fingerprint please')
            .then(
                res => this.RIBService.certify(RIB)
                    .then(RIB => {
                        let toast = this.toastCtrl.create({
                            message: 'RIB certified',
                            cssClass: 'mytoast',
                            duration: 1000
                        });
                        toast.present(toast);
                        this.nav.setRoot(RIBRejectedListPage);
                    }),
                err => console.error('Error', err)
            );
    }

}
