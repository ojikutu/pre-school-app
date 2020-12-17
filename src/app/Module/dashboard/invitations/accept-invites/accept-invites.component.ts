import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {NotificationService} from '../../../../Core/services/notification/notification.service';
import {ApiAuthenticationService} from '../../../../Core/services/api/api-authentication.service';

@Component({
  selector: 'app-accept-invites',
  templateUrl: './accept-invites.component.html',
  styleUrls: ['./accept-invites.component.sass']
})
export class AcceptInvitesComponent implements OnInit {
  @Input() acceptInvitation;
  @Output() inviteAccepted: EventEmitter<boolean> = new EventEmitter<boolean>();
  formSubmitted: boolean;
  form = new FormGroup({
    _acceptanceCode: new FormControl('', Validators.required)
  });
  ngUnsubscribe$ = new Subject();
  constructor(
    private notificationService: NotificationService,
    private apiAuthenticationService: ApiAuthenticationService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.form.valid) {
      this.formSubmitted = true;
      this.form.value._invite_uid = this.acceptInvitation;
      this.apiAuthenticationService.create('invites', this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(inviteAccepted => {
          if (inviteAccepted.statusCode === 200) {
            this.notificationService.success({
              _title: 'Operation Successful',
              _message: 'Invitation accepted.'
            });
            this.inviteAccepted.emit(true);
            this.modalService.dismissAll();
          }
        }, () => this.formSubmitted = false );
    }
  }

  ngOnDestroy = () => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
