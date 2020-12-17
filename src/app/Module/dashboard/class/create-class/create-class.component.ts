import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiAuthenticationService } from '../../../../Core/services/api/api-authentication.service';
import { NotificationService } from '../../../../Core/services/notification/notification.service';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.sass']
})
export class CreateClassComponent implements OnInit {

  @Input() schoolUid;
  @Output() createdClass: EventEmitter<object> = new EventEmitter<object>();

  formSubmitted = false;
  private ngUnsubscribe$ = new Subject();

  classForm = new FormGroup({
    _name: new FormControl('', Validators.required),
    _teacher_email: new FormControl('')
  });

  constructor(
    private apiAuthenticationService: ApiAuthenticationService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.classForm.valid) {
      this.formSubmitted = true;
      // include the school id in the payload to be sent to the server
      this.classForm.value._school_uid = this.schoolUid._uid;
      this.apiAuthenticationService.create('class', this.classForm.value)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(result => {
          if (result.statusCode === 201) {
            this.notificationService.success({
              _title: 'Operation successfully.',
              _message: 'New class created successfully.'
            });
            // send response back to parent component
            this.createdClass.emit(result.data);

            // check if email was provided, then trigger the email invite endpoint
            if (this.classForm.value._teacher_email) {
              setTimeout(() => {
                this.apiAuthenticationService.create('teacher', {
                  _email: this.classForm.value._teacher_email,
                  _class_uid: result.data._uid,
                  _school_uid: this.schoolUid._uid,
                }).pipe(takeUntil(this.ngUnsubscribe$))
                  .subscribe(invite => {
                    if (invite.statusCode === 201) {
                      this.notificationService.success({
                        _title: 'Email Invite.',
                        _message: `Email invite sent to ${this.classForm.value._teacher_email}`
                      });
                      this.classForm.reset();
                      this.modalService.dismissAll();
                    }
                  });
              }, 5000);
            }
            if (!this.classForm.value._teacher_email) {
              this.classForm.reset();
              this.modalService.dismissAll();
            }
          }
        }, error => console.log(error));
      this.formSubmitted = false;
    }
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
