import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {RIBService} from '../../providers/RIB-service-rest';
import {RIBRejectedDetailPage} from '../RIB-rejected-detail/RIB-rejected-detail';

@Component({
    selector: 'page-RIB-rejected-list',
    templateUrl: 'RIB-rejected-list.html'
})
export class RIBRejectedListPage {

    RIBs: Array<any>;
    RIBsForSearch: Array<any>;
    searchKey: string = "";

    constructor(public navCtrl: NavController, public service: RIBService, public toastCtrl: ToastController) {
        this.getRejected();
    }

    openRIBRejectedDetail(RIB) {
        this.navCtrl.push(RIBRejectedDetailPage, RIB);
    }

    certify(RIB) {
        this.service.certify(RIB)
            .then(() => {
                let toast = this.toastCtrl.create({
                    message: 'RIB certified',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast)
                this.getRejected();
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
        this.getRejected();
    }

    getRejected() {
        this.service.getRejected()
            .then(data => {
                this.RIBs = data;
                this.RIBsForSearch = data;
            })
            .catch(error => alert(error));
    }

}
