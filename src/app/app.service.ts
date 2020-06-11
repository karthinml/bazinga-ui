import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';

@Injectable()
export class AppService {

    private loggedInUser = {userId: "us101", userName: "Karthik"};

    private enableLoader = new Subject<any>();

    getUserDetails() {
        return this.loggedInUser;
    }

    enableLoading() {
        this.enableLoader.next(true);
    }

    disableLoading() {
        this.enableLoader.next(false);
    }

    listenLoader(): Observable<any> {
        return this.enableLoader.asObservable();
    }
}