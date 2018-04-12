import {Component} from '@angular/core';
import {NavController, ToastController, Nav} from 'ionic-angular';
import {RIBService} from '../../providers/RIB-service-rest';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {RIBWaitingListPage} from '../RIB-waiting-list/RIB-waiting-list';


@Component({
    selector: 'QR-scan',
    templateUrl: 'QR-scan.html'
})
export class QRScan {

    options: BarcodeScannerOptions;
    HQs: Array<any>;
    selectedHQ: any={};
    HQFound:boolean = false;
    scannedData:any={};

    constructor(public navCtrl: NavController, public service: RIBService,  public toastCtrl: ToastController, public scanner: BarcodeScanner, public nav: Nav) {
        this.getHQs();
        this.scan();
    }

    scan() {
        this.options= {
            prompt: 'Scan your QR code'
        }
        this.scanner.scan(this.options).then((data) => {
            this.scannedData = data;
            this.analyze();
        }, (err) => {
            console.log('Error :', err)
        })       
    }

    analyze() {
        this.selectedHQ = this.HQs.find(HQ => HQ.id === this.scannedData.text);
        if(this.selectedHQ !== undefined) {
            this.HQFound = true;
            let toast = this.toastCtrl.create({
                message: 'Welcome ' + this.selectedHQ.name,
                cssClass: 'mytoast',
                duration: 2000
            });
            toast.present(toast);
            this.nav.setRoot(RIBWaitingListPage);
        } else {
            this.HQFound = false;
            let toast = this.toastCtrl.create({
                message: 'Unvalid QR code',
                cssClass: 'mytoast',
                duration: 2000
            });
            toast.present(toast);
        }
    }

    getHQs() {
        this.service.getHQs()
            .then(data => {
                this.HQs = data;
            })
            .catch(error => alert(error));
    }
}
