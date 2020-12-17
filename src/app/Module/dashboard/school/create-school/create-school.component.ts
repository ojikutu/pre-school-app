import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiAuthenticationService } from '../../../../Core/services/api/api-authentication.service';
import { NotificationService } from '../../../../Core/services/notification/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.sass']
})
export class CreateSchoolComponent implements OnInit {
  @Output() newNameAdded: EventEmitter<object> = new EventEmitter();
  schoolForm = new FormGroup({
    _name: new FormControl('', [Validators.required])
  });
  private ngUnsubscribe$ = new Subject();
  constructor(
    private apiAuthenticationService: ApiAuthenticationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {}

  submitForm = () => {
    if (this.schoolForm.value) {
      this.apiAuthenticationService.create('school', this.schoolForm.value)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(result => {
        // check for a 201 response
        if (result.statusCode === 201) {
          this.notificationService.success({
            _title: 'Operation successfully.',
            _message: 'New school record created successfully.'
          });
          this.newNameAdded.emit(result.data);
          this.schoolForm.reset();
        }
      });
    }
  }

  ngOnDestroy = (): void => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
