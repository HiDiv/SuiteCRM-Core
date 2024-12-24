import { combineLatestWith, Observable } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  TrackByFunction,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { LeaseOrderModel, LeaseRoom, LeaseSearchModel, Pagination } from '../../../../model';
import { LeaseRoomListStore, LeaseRoomListStoreFactory } from '../../../../store';

interface LeaseRoomListView {
  records: LeaseRoom[];
  pagination: Pagination;
  search: LeaseSearchModel;
  order: LeaseOrderModel;
  loading: boolean;
}

@Component({
  selector: 'scrm-smart-view-rooms',
  templateUrl: './smart-view-rooms.component.html',
  styleUrls: ['./smart-view-rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartViewRoomsComponent implements OnInit, OnDestroy {
  private destroyRef: DestroyRef = inject(DestroyRef);
  private leaseRoomListStore: LeaseRoomListStore;

  public records$: Observable<LeaseRoom[]>;
  public pagination$: Observable<Pagination>;
  public search$: Observable<LeaseSearchModel>;
  public order$: Observable<LeaseOrderModel>;
  public loading$: Observable<boolean>;

  public vm$: Observable<LeaseRoomListView>;
  public vm: LeaseRoomListView;

  constructor(private leaseRoomListStoreFactory: LeaseRoomListStoreFactory) {
    this.leaseRoomListStore = this.leaseRoomListStoreFactory.create();
    this.records$ = this.leaseRoomListStore.records$;
    this.pagination$ = this.leaseRoomListStore.pagination$;
    this.search$ = this.leaseRoomListStore.search$;
    this.order$ = this.leaseRoomListStore.order$;
    this.loading$ = this.leaseRoomListStore.loading$;
    this.vm$ = this.records$.pipe(
      combineLatestWith(this.pagination$, this.search$, this.order$, this.loading$),
      map(([records, pagination, search, order, loading]) => {
        this.vm = { records, pagination, search, order, loading };
        return this.vm;
      })
    );
  }

  public trackByLeaseRoom: TrackByFunction<LeaseRoom> = (index, item) => item._id;

  public onPageChange(newPage: number): void {
    this.leaseRoomListStore.updatePage(newPage);
  }

  public onChangeSortOrder(newOrder: LeaseOrderModel): void {
    this.leaseRoomListStore.updateOrder(newOrder);
  }

  public onChangeSearchFilter(newSearch: LeaseSearchModel): void {
    this.leaseRoomListStore.updateSearch(newSearch);
  }

  public ngOnInit(): void {
    this.leaseRoomListStore.init().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  public ngOnDestroy(): void {
    this.leaseRoomListStore.destroy();
  }
}
