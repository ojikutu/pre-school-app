import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationInterface } from './notification-interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private alert: ToastrService
  ) { }

  success(message: NotificationInterface): void {
    this.alert.success(message._message, message._title);
  }

  warning(message: NotificationInterface): void {
    this.alert.warning(message._message, message._title);
  }

  info(message: NotificationInterface): void {
    this.alert.info(message._message, message._title);
  }

  error(message: NotificationInterface): void {
    this.alert.error(message._message, message._title);
  }
}
