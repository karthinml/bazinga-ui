import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  message: string;
  background: string = 'none';
  height: string = '0em';
  notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.notificationSubscription = this.notificationService.displayNotificatoin().subscribe(data => {
      this.message = data.message;
      let notificationType = data.type;
      if (this.isDefined(this.message)) {
        this.background = (notificationType == 'error') ? 'red' : 'green';
        this.height = '3em';
        this.messageNotification();
      }
    });
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }

  isDefined(value) {
    return value != undefined && value != null && value != "";
  }

  messageNotification() {
    setTimeout(() => {
      this.message = '';
      this.background = 'none';
      this.height = '0em';
    }, 5000);
  }

}
