import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-school-edit',
  templateUrl: './school-edit.component.html',
  styleUrls: ['./school-edit.component.sass']
})
export class SchoolEditComponent implements OnInit {
  schoolUid: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.schoolUid = this.activatedRoute.snapshot.params.id;
  }

}
