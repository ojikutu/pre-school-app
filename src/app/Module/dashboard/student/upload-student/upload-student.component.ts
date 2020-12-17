import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import { parse } from 'papaparse';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../../../Core/services/notification/notification.service';


@Component({
  selector: 'app-upload-student',
  templateUrl: './upload-student.component.html',
  styleUrls: ['./upload-student.component.sass']
})
export class UploadStudentComponent implements OnInit {
  @Output() studentData: EventEmitter<any> = new EventEmitter<any>();
  formSubmitted: boolean;
  constructor(
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  downloadCsv() {
    window.open('https://docs.google.com/spreadsheets/d/1soxOZvq90ARsBtJGlaefUdQ7o-0_Cz4TKqMyMnCwAFg/edit?usp=sharing', '_blank');
  }

  changeListener($event: any) {
    this.formSubmitted = true;
    if ($event.target.files[0].name.slice($event.target.files[0].name.length - 4) !== '.csv') {
      this.notificationService.error({
        _title: 'Invalid File Type',
        _message: 'Only CSv files are supported. Please reade the instruction to see a sample of a CSV file.'
      });
      this.formSubmitted = false;
    } else {
      parse($event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // check for the required keys before proceeding
          if (results.meta.fields[0] !== '_firstName' && results.meta.fields[0] !== '_lastName') {
            this.notificationService.error({
              _title: 'Format Mismatch',
              _message: 'Invalid CSV format, the first column of the CSV should be the Student ' +
                'First Name represented as _firstName and the second column should be student ' +
                'Last Name represented as _lastName. Please check sample CSV and try again.'
            });
            this.formSubmitted = false;
          } else {
            this.studentData.emit(results.data); // this studentData will be returned to parent component.
            this.modalService.dismissAll();
          }
        }
      });
    }
  }
}
