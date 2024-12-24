import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, map, shareReplay, take, tap } from 'rxjs/operators';
import { deepClone } from 'common';
import { MessageService, Metadata, MetadataStore, StateStore } from 'core';

import { LeaseFilterModel, LeaseOrderModel, LeaseRoom, LeaseSearchModel, Pagination } from '../../model';
import { LeaseRoomListFetchParams, LeaseRoomListGQL } from './graphql';

export interface LeaseRoomList {
  records: LeaseRoom[];
  pagination?: Pagination;
}

export interface LeaseRoomListState {
  records: LeaseRoom[];
  pagination?: Pagination;
  filter: LeaseFilterModel;
  loading: boolean;
}

const initialPagination: Pagination = {
  page: 1,
  itemsPerPage: 10,
  lastPage: 0,
  totalCount: 0,
};

const initialSearch: LeaseSearchModel = {
  rentType: 'per_sq_m_per_year',
};

const initialOrder: LeaseOrderModel = {
  orderBy: 'asc',
};

const initialFilter: LeaseFilterModel = {
  search: initialSearch,
  order: initialOrder,
};

const initialState: LeaseRoomListState = {
  records: [],
  filter: initialFilter,
  loading: false,
};

@Injectable()
export class LeaseRoomListStore implements StateStore {
  public records$: Observable<LeaseRoom[]>;
  public pagination$: Observable<Pagination>;
  public search$: Observable<LeaseSearchModel>;
  public order$: Observable<LeaseOrderModel>;
  public loading$: Observable<boolean>;
  metadata$: Observable<Metadata>;

  public metadata: Metadata;

  protected cache$: Observable<LeaseRoomList> = null;
  protected internalState: LeaseRoomListState = deepClone(initialState);
  protected store = new BehaviorSubject<LeaseRoomListState>(this.internalState);
  protected state$ = this.store.asObservable();

  constructor(
    protected leaseRoomListGQL: LeaseRoomListGQL,
    protected message: MessageService,
    protected metadataStore: MetadataStore
  ) {
    this.records$ = this.state$.pipe(
      map(state => state.records),
      distinctUntilChanged()
    );
    this.pagination$ = this.state$.pipe(
      map(state => state.pagination),
      distinctUntilChanged()
    );
    this.search$ = this.state$.pipe(
      map(state => state.filter.search),
      distinctUntilChanged()
    );
    this.order$ = this.state$.pipe(
      map(state => state.filter.order),
      distinctUntilChanged()
    );
    this.loading$ = this.state$.pipe(map(state => state.loading));

    this.metadata$ = metadataStore.metadata$.pipe(
      tap(metadata => {
        this.metadata = metadata;
      })
    );
  }

  public get pagination(): Pagination {
    if (!this.internalState.pagination) {
      return deepClone(initialPagination);
    }

    return deepClone(this.internalState.pagination);
  }

  public set pagination(pagination: Pagination) {
    this.updateState({
      ...this.internalState,
      pagination,
    });
  }

  public get records(): LeaseRoom[] {
    if (!this.internalState.records) {
      return [];
    }

    return this.internalState.records;
  }

  public getRecord(id: string): LeaseRoom | undefined {
    return this.records.find(record => record._id === id);
  }

  public destroy(): void {
    this.clear();
  }

  public clear(): void {
    this.cache$ = null;
    this.store.unsubscribe();
  }

  public clearAuthBased(): void {
    this.clear();
  }

  public init(load = true): Observable<LeaseRoomList> {
    if (load === false) {
      return null;
    }

    return this.load();
  }

  public load(useCache = true): Observable<LeaseRoomList> {
    this.updateState({
      ...this.internalState,
      loading: true,
    });

    return this.getRecords(this.internalState, useCache).pipe(
      catchError(() => {
        this.message.addDangerMessageByKey('LBL_GET_RECORD_LIST_ERROR');
        return of({
          records: [],
          pagination: deepClone(initialPagination),
        });
      }),
      tap((data: LeaseRoomList) => {
        this.updateState({
          ...this.internalState,
          records: data.records,
          pagination: data.pagination,
          loading: false,
        });
      })
    );
  }

  public updatePage(page: number): void {
    this.setPage(page).subscribe();
  }

  public setPage(page: number): Observable<LeaseRoomList> {
    const pagination: Pagination = { ...this.internalState.pagination, page };
    this.updateState({ ...this.internalState, pagination });
    return this.load(false).pipe(take(1));
  }

  public resetPagination(): void {
    this.updatePage(1);
  }

  public updateOrder(order: LeaseOrderModel): void {
    this.setOrder(order).subscribe();
  }

  public setOrder(order: LeaseOrderModel): Observable<LeaseRoomList> {
    const filter = { ...this.internalState.filter, order };
    this.updateState({
      ...this.internalState,
      filter,
    });
    return this.load(false).pipe(take(1));
  }

  public updateSearch(search: LeaseSearchModel): void {
    this.setSearch(search).subscribe();
  }

  public setSearch(search: LeaseSearchModel): Observable<LeaseRoomList> {
    const filter = { ...this.internalState.filter, search };
    this.updateState({
      ...this.internalState,
      filter,
    });
    return this.load(false).pipe(take(1));
  }

  public getPaginationTotalCount(): Observable<number> {
    return this.pagination$.pipe(
      map(pagination => pagination.totalCount),
      distinctUntilChanged()
    );
  }

  public getPagination(): Pagination {
    return this.store.value.pagination;
  }

  protected updateState(state: LeaseRoomListState): void {
    this.store.next((this.internalState = state));
  }

  protected getRecords(leaseRoomListState: LeaseRoomListState, useCache = true): Observable<LeaseRoomList> {
    if (this.cache$ === null || useCache === false) {
      const params = { page: leaseRoomListState?.pagination?.page ?? 1 } as LeaseRoomListFetchParams;

      if (leaseRoomListState.filter) {
        if (leaseRoomListState.filter.order && leaseRoomListState.filter.order.sortBy) {
          params.order = {
            sortBy: leaseRoomListState.filter.order.sortBy,
            sortOrder: leaseRoomListState.filter.order.orderBy,
          };
        }

        if (leaseRoomListState.filter.search) {
          params.search = {};
          const { name, unitSizeFrom, unitSizeTo, rentFrom, rentTo, rentType } = leaseRoomListState.filter.search;

          if (typeof name === 'string' && name.trim().length > 0) {
            params.search.name = name;
          }

          if (unitSizeFrom && +unitSizeFrom > 0) {
            params.search.unitSizeFrom = +unitSizeFrom;
          }

          if (unitSizeTo && +unitSizeTo > 0) {
            params.search.unitSizeTo = +unitSizeTo;
          }

          if (rentFrom && +rentFrom > 0) {
            params.search.grossRentFrom =
              rentType === 'per_sq_m_per_year' ? +rentFrom : Number((rentFrom / 12).toFixed(2));
          }

          if (rentTo && +rentTo > 0) {
            params.search.grossRentTo = rentType === 'per_sq_m_per_year' ? +rentTo : Number((rentTo / 12).toFixed(2));
          }
        }
      }

      this.cache$ = this.leaseRoomListGQL.get(params).pipe(shareReplay(1));
    }
    return this.cache$;
  }
}
