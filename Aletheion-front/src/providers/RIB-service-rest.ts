import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {SERVER_URL} from './config';
import 'rxjs/Rx';

let RIBsURL = SERVER_URL + '/api/RIBs/';

let RIBsWaitingURL = RIBsURL + 'HQIdWaiting/5ac5eeffc3ee561c701a93fb';

let RIBsCertifiedURL = RIBsURL + 'HQIdCertified/5ac5eeffc3ee561c701a93fb';

let RIBsRejectedURL = RIBsURL + 'HQIdRejected/5ac5eeffc3ee561c701a93fb';

let certifyRIBURL = RIBsURL + 'certify/';
let rejectRIBURL = RIBsURL + 'reject/';

let HQsURL = SERVER_URL + '/api/HQs/'


@Injectable()
export class RIBService {

    constructor(public http: Http) {
        this.http = http;
    }

    getHQs() {
        return this.http.get(HQsURL)
            .map(res => res.json())
            .toPromise();
    }    

    getWaiting() {
        return this.http.get(RIBsWaitingURL)
            .map(res => res.json())
            .toPromise();
    }

    getCertified() {
        return this.http.get(RIBsCertifiedURL)
            .map(res => res.json())
            .toPromise();
    }

    getRejected() {
        return this.http.get(RIBsRejectedURL)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(RIBsURL + "id/" + id)
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

}