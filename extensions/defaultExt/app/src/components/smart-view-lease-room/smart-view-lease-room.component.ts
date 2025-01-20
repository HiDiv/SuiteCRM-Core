import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { LeaseRoom } from '../../model';

@Component({
  selector: 'scrm-smart-view-lease-room',
  templateUrl: './smart-view-lease-room.component.html',
  styleUrls: ['./smart-view-lease-room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartViewLeaseRoomComponent {
  @Input() leaseRoom: LeaseRoom;

  public rentSqPerMonth(): number {
    return +(this.leaseRoom.grossRent / 12).toFixed(2);
  }

  public rentPerMonth(): number {
    return +(this.rentSqPerMonth() * this.leaseRoom.unitSize).toFixed(2);
  }
}
