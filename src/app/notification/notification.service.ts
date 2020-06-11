import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';

@Injectable()
export class NotificationService {
    private notification = new Subject<any>();

    notify(errorMessage, errorType) { //TODO: Need to create enum for error type
        this.notification.next({"message": errorMessage, "type": errorType});
    }

    displayNotificatoin(): Observable<any> {
        return this.notification.asObservable();
    }
}