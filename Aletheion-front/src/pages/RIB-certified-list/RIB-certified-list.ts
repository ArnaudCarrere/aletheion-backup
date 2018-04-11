import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {RIBService} from '../../providers/RIB-service-rest';
import {RIBCertifiedDetailPage} from '../RIB-certified-detail/RIB-certified-detail';

@Component({
    selector: 'page-RIB-certified-list',
    templateUrl: 'RIB-certified-list.html'
})
export class RIBCertifiedListPage {

    RIBs: Array<any>;
    RIBsForSearch: Array<any>;
    searchKey: string = "";

    constructor(public navCtrl: NavController, public service: RIBService, public toastCtrl: ToastController) {
        this.getCertified();
    }

    openRIBCertifiedDetail(RIB) {
        this.navCtrl.push(RIBCertifiedDetailPage, RIB);
    }

    reject(RIB) {
        this.service.reject(RIB)
            .then(() => {
                let toast = this.toastCtrl.create({
                    message: 'RIB rejected',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast)
                this.getCertified();
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    onInput(event) {
         // Reset items back to all of the items
        this.RIBs = this.RIBsForSearch;

        // set val to the value of the searchbar
        let val = this.searchKey;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.RIBs = this.RIBs.filter((RIB) => {
            return (RIB.companyname.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
    }

    onCancel(event) {
        this.getCertified();
    }

    getCertified() {
        this.service.getCertified()
            .then(data => {
                this.RIBs = data;
                this.RIBsForSearch = data;
            })
            .catch(error => alert(error));
    }

}
