import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ApiAuthenticationService} from '../../../../Core/services/api/api-authentication.service';
import {NotificationService} from '../../../../Core/services/notification/notification.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.sass']
})
export class CreateTeacherComponent implements OnInit {
  @Input() schoolUid;
  ngUnsubscribe$ = new Subject();
  createTeacherForm = new FormGroup({
    _firstName: new FormControl(''),
    _lastName: new FormControl(''),
    _email: new FormControl('', Validators.required)
  });

  formState: boolean;

  constructor(
    private apiAuthenticationService: ApiAuthenticationService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.createTeacherForm.valid) {
      this.formState = true;
      // add the school uid to the form payload
      this.createTeacherForm.value._school_uid = this.schoolUid;
      // call the invitation endpoint to invite teacher to become member of school
      this.apiAuthenticationService.create('teacher', this.createTeacherForm.value)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(invited => {
          if (invited.statusCode === 201) {
            this.notificationService.success({
              _title: 'Invitation Sent',
              _message: `An invitation has been sent to ${this.createTeacherForm.value._email}, you can view all pending invitations on the invites page.`
            });
            this.modalService.dismissAll();
          }
        }, () => { this.formState = false; });
    }
  }

  ngOnDestroy = () => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
