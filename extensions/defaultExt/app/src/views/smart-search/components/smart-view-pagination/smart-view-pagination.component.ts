import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { floor } from 'lodash-es';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'scrm-smart-view-pagination',
  templateUrl: './smart-view-pagination.component.html',
  styleUrls: ['./smart-view-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartViewPaginationComponent {
  @Input() page: number;
  @Input() itemsPerPage: number;
  @Input() totalCount: number;
  @Output() pageChange = new EventEmitter<number>();

  public selectPage(page: string) {
    const selectedPage = parseInt(page, 10) || 1;
    if (selectedPage > 0 && selectedPage <= floor(this.totalCount / this.itemsPerPage, 0)) {
      this.onPageChange(selectedPage);
    }
  }

  public formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  public onPageChange(newPage: number) {
    if (this.page != newPage) {
      this.pageChange.emit(newPage);
    }
  }
}
