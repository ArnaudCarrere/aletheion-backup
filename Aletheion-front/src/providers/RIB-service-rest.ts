import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {SERVER_URL} from './config';
import 'rxjs/Rx';


let RIBsURL = SERVER_URL + '/api/RIBs/';

let RIBsWaitingURL = RIBsURL + 'HQIdWaiting/';
let RIBsCertifiedURL = RIBsURL + 'HQIdCertified/';
let RIBsRejectedURL = RIBsURL + 'HQIdRejected/';

let certifyRIBURL = RIBsURL + 'certify/';
let rejectRIBURL = RIBsURL + 'reject/';

let HQsURL = SERVER_URL + '/api/HQs/';
let configureHQURL = HQsURL + 'configured/';


@Injectable()
export class RIBService {

    HQ: any={};

    constructor(public http: Http) {
        this.http = http;
        this.HQ = '0';
    }

    getHQs() {
        return this.http.get(HQsURL)
            .map(res => res.json())
            .toPromise();
    }    

    getWaiting() {
        return this.http.get(RIBsWaitingURL + this.HQ)
            .map(res => res.json())
            .toPromise();
    }

    getCertified() {
        return this.http.get(RIBsCertifiedURL + this.HQ)
            .map(res => res.json())
            .toPromise();
    }

    getRejected() {
        return this.http.get(RIBsRejectedURL + this.HQ)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(RIBsURL + 'id/' + id)
            .map(res => res.json())
            .toPromise();
    }

    certify(RIB) {
        return this.http.get(certifyRIBURL + RIB.id)
            .toPromise();
    }

    reject(RIB) {
        return this.http.get(rejectRIBURL + RIB.id)
            .toPromise();
    }

    configure(HQ) {
        return this.http.get(configureHQURL + HQ.id)
            .toPromise();
    }

    setHQ(id) {
        this.HQ = id;
    }



}