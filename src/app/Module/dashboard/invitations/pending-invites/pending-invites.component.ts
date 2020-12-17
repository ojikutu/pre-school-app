import {Component, OnInit, TemplateRef} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiAuthenticationService } from '../../../../Core/services/api/api-authentication.service';
import {faCheck, faCheckDouble} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pending-invites',
  templateUrl: './pending-invites.component.html',
  styleUrls: ['./pending-invites.component.sass']
})
export class PendingInvitesComponent implements OnInit {
  ngUnsubscribe$ = new Subject();
  dtOptions: DataTables.Settings = {};
  heading = 'Invitations';
  subheading = 'Invitation History and Management';
  icon = 'pe-7s-mail icon-gradient bg-mean-fruit';
  faCheckDouble = faCheckDouble;
  faCheck = faCheck;

  dataFetching: boolean;
  pendingInvites = [];
  inviteUid: string;
  acceptingIndex: number;

  constructor(
    private apiAuthenticationService: ApiAuthenticationService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      order: [[3, 'asc']]
    };
    this.getPendingInvites();
  }

  getPendingInvites = () => {
    this.apiAuthenticationService.fetch('invites')
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(result => {
        if (result.statusCode === 200) {
          if (typeof result.data !== 'undefined' && result.data._details._recordsFound > 0) { this.pendingInvites = result.data._data; }
          this.dataFetching = true;
        }
      });
  }

  acceptInvite(inviteModal: TemplateRef<any>, uid: string, key: any) {
    this.modalService.open(inviteModal, {
      size: 'lg'
    });
    this.inviteUid = uid;
    this.acceptingIndex = key;
  }

  acceptanceStatus($event: boolean) {
    if ($event === true) {
      // update the status in the pending invites object
      this.pendingInvites[this.acceptingIndex]._source._status = $event;
    }
  }

  ngOnDestroy = () => {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
