import {Injectable} from '@angular/core';
import {StateStore} from '@store/state';
import {RecordList, RecordListStore} from '@store/record-list/record-list.store';
import {BehaviorSubject, Observable} from 'rxjs';
import {RecordListStoreFactory} from '@store/record-list/record-list.store.factory';
import {ColumnDefinition, RecordListMeta} from '@app-common/metadata/list.metadata.model';
import {MetadataStore} from '@store/metadata/metadata.store.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable()
export class RecordListModalStore implements StateStore {

    recordList: RecordListStore;
    metadata$: Observable<RecordListMeta>;
    columns$: Observable<ColumnDefinition[]>;
    metadata: RecordListMeta;
    loading$: Observable<boolean>;
    metadataLoading$: Observable<boolean>;
    protected metadataLoadingState: BehaviorSubject<boolean>;

    constructor(
        protected listStoreFactory: RecordListStoreFactory,
        protected meta: MetadataStore,
    ) {
        this.recordList = listStoreFactory.create();
        this.loading$ = this.recordList.loading$;

        this.metadataLoadingState = new BehaviorSubject(false);
        this.metadataLoading$ = this.metadataLoadingState.asObservable();
    }

    clear(): void {
        this.recordList.clear();
        this.recordList = null;
    }

    clearAuthBased(): void {
        this.recordList.clearAuthBased();
    }

    /**
     * Initial list records load if not cached and update state.
     * Returns observable to be used in resolver if needed
     *
     * @param {string} module name
     */
    public init(module: string): void {

        this.metadataLoadingState.next(true);
        this.metadata$ = this.meta.getMetadata(module).pipe(
            map(meta => meta.listView),
            tap(() => {
                this.metadataLoadingState.next(false);
                this.recordList.load().pipe(
                    take(1)
                ).subscribe();
            })
        );
        this.recordList.init(module, false, 'list_max_entries_per_subpanel');
        this.columns$ = this.metadata$.pipe(map(metadata => metadata.fields));
    }


    /**
     * Load / reload records using current pagination and criteria
     *
     * @param {boolean} useCache if to use cache
     * @returns {object} Observable<RecordList>
     */
    public load(useCache = true): Observable<RecordList> {

        return this.recordList.load(useCache);
    }
}
