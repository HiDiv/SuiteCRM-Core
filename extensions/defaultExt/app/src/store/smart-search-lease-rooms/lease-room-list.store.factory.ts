import { Injectable } from '@angular/core';
import { MessageService, MetadataStore } from 'core';

import { LeaseRoomListGQL } from './graphql';
import { LeaseRoomListStore } from './lease-room-list.store';

@Injectable({
  providedIn: 'root',
})
export class LeaseRoomListStoreFactory {
  constructor(
    protected leaseRoomListGQL: LeaseRoomListGQL,
    protected message: MessageService,
    protected metadataStore: MetadataStore
  ) {}

  public create(): LeaseRoomListStore {
    return new LeaseRoomListStore(this.leaseRoomListGQL, this.message, this.metadataStore);
  }
}
