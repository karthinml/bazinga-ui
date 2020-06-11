import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
    private notification = new Subject<any>();

    notify(errorMessage, errorType) { //TODO: Need to create enum for error type
        console.log("Notify message: :"+errorMessage);
        this.notification.next({"message": errorMessage, "type": errorType});
    }

    displayNotificatoin() {
        return this.notification.asObservable();
    }
}