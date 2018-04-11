import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {RIBService} from '../../providers/RIB-service-rest';
import {RIBWaitingDetailPage} from '../RIB-waiting-detail/RIB-waiting-detail';

@Component({
    selector: 'page-RIB-waiting-list',
    templateUrl: 'RIB-waiting-list.html'
})
export class RIBWaitingListPage {

    RIBs: Array<any>;
    RIBsForSearch: Array<any>;
    searchKey: string = "";

    constructor(public navCtrl: NavController, public service: RIBService,  public toastCtrl: ToastController) {
        this.getWaiting();
    }

    openRIBWaitingDetail(RIB: any) {
        this.navCtrl.push(RIBWaitingDetailPage, RIB);
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
                this.getWaiting();
            })
            .catch(error => alert(JSON.stringify(error)));
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
                this.getWaiting();
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
        this.getWaiting();
    }

    getWaiting() {
        this.service.getWaiting()
            .then(data => {
                this.RIBs = data;
                this.RIBsForSearch = data;
            })
            .catch(error => alert(error));
    }

}
