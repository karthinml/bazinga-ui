import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { NotificationService } from './notification/notification.service';

@Injectable()
export class AppService {

    private loggedInUser = {userId: "us101", userName: "Karthik"};

    private enableLoader = new Subject<any>();

    constructor(private notificationService: NotificationService) {}

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

    appErrorHandler(error) {
        if(typeof(error['error']) == 'string') {
            this.notificationService.notify(error['error'], "error");
        } else {
            this.notificationService.notify("Internal Server Error!", "error");
        }
    }
}