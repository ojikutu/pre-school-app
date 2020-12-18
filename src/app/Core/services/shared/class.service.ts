import { Injectable } from '@angular/core';
import { ApiAuthenticationService } from '../api/api-authentication.service';
import {Observable} from 'rxjs';
import {ApiInterface} from '../api/api-interface';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(
    private apiAuthenticationService: ApiAuthenticationService
  ) { }

  private schoolEndpoint = 'school';
  private classEndpoint = 'class';
  private studentEndpoint = 'student';
  private parentEndpoint = 'parent';

  schoolDetails = (schoolUid: string): Observable<ApiInterface> => {
    return this.apiAuthenticationService.fetch(this.schoolEndpoint, {
      _searchFilter: JSON.stringify({
        _mustEqual: {
          _uid: schoolUid
        }
      })
    });
  }

  allSchoolClasses = (schoolUid: string): Observable<ApiInterface> => {
    return this.apiAuthenticationService.fetch(this.classEndpoint, {
      _searchFilter: JSON.stringify({
        _mustEqual: {
          _school_uid: schoolUid
        },
        _records: 1000
      })
    });
  }

  allSchoolStudents = (schoolUid: string): Observable<ApiInterface> => {
    return this.apiAuthenticationService.fetch(this.studentEndpoint, {
      _searchFilter: JSON.stringify({
        _school_uid: schoolUid
      })
    });
  }

  classDetails = (classUid: string): Observable<ApiInterface> => {
    return this.apiAuthenticationService.fetch(this.classEndpoint, {
      _searchFilter: JSON.stringify({
        _mustEqual: {
          _uid: classUid
        }
      })
    });
  }

  getStudentDetails = (classUid: string, studentUid: string): Observable<ApiInterface> => {
    return this.apiAuthenticationService.fetch(this.studentEndpoint, {
      _searchFilter: JSON.stringify({
        _uid: studentUid,
        _class_uid: classUid
      })
    });
  }

  allChildren = (jsonOption): Observable<ApiInterface> => {
    return this.apiAuthenticationService.fetch(this.parentEndpoint, {
      _searchFilter: JSON.stringify(jsonOption)
    });
  }
}
