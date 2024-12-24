import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { Pagination } from '../../../model';
import { LeaseRoomList } from '../lease-room-list.store';

interface CollectionItem {
  id: string;
  _id: string;
  name: string;
  unitSize: number;
  grossRent: number;
  floor: string;
  deliveryCondition: string;
  typicalFloorLayout: string;
  building: {
    id: string;
    _id: string;
    name: string;
    buildingClass: string;
    address: string;
  };
}

interface QueryResultData {
  leaseRooms: {
    paginationInfo: {
      itemsPerPage: number;
      lastPage: number;
      totalCount: number;
    };
    collection: CollectionItem[];
  };
}

export type LeaseRoomListFetchParams = {
  page: number;
  search?: {
    name?: string;
    unitSizeFrom?: number;
    unitSizeTo?: number;
    grossRentFrom?: number;
    grossRentTo?: number;
  };
  order?: {
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
};

@Injectable({
  providedIn: 'root',
})
export class LeaseRoomListGQL {
  constructor(protected apollo: Apollo) {}

  public fetch(
    page: number,
    name: string | undefined,
    unit_size_from: number | undefined,
    unit_size_to: number | undefined,
    gross_rent_from: number | undefined,
    gross_rent_to: number | undefined,
    unit_size: string | undefined,
    gross_rent: string | undefined
  ): Observable<ApolloQueryResult<QueryResultData>> {
    const queryOptions = {
      query: gql`
        query leaseRooms(
          $page: Int!
          $name: String
          $unit_size_from: Float
          $unit_size_to: Float
          $gross_rent_from: Float
          $gross_rent_to: Float
          $unit_size: String
          $gross_rent: String
        ) {
          leaseRooms(
            page: $page
            name: $name
            unit_size_from: $unit_size_from
            unit_size_to: $unit_size_to
            gross_rent_from: $gross_rent_from
            gross_rent_to: $gross_rent_to
            unit_size: $unit_size
            gross_rent: $gross_rent
          ) {
            paginationInfo {
              itemsPerPage
              lastPage
              totalCount
            }
            collection {
              id
              _id
              name
              unitSize
              grossRent
              floor
              deliveryCondition
              typicalFloorLayout
              building {
                id
                _id
                name
                buildingClass
                address
              }
            }
          }
        }
      `,
      variables: {
        page,
        name,
        unit_size_from,
        unit_size_to,
        gross_rent_from,
        gross_rent_to,
        unit_size,
        gross_rent,
      },
    };

    return this.apollo.query<QueryResultData>(queryOptions);
  }

  public get(params: LeaseRoomListFetchParams): Observable<LeaseRoomList> {
    const { page, search, order } = params;
    const { name, unitSizeFrom, unitSizeTo, grossRentFrom, grossRentTo } = search ?? {};

    let unitSize: string | undefined = undefined;
    let grossRent: string | undefined = undefined;
    if (order) {
      if (order.sortBy === 'unit_size') {
        unitSize = order.sortOrder;
      } else if (order.sortBy === 'gross_rent') {
        grossRent = order.sortOrder;
      }
    }

    return this.fetch(page, name, unitSizeFrom, unitSizeTo, grossRentFrom, grossRentTo, unitSize, grossRent).pipe(
      map(({ data }) => {
        const { itemsPerPage, totalCount } = data.leaseRooms.paginationInfo;
        const leaseRoomList: LeaseRoomList = {
          pagination: { page, itemsPerPage, totalCount } as Pagination,
          records: [],
        };
        leaseRoomList.records = data.leaseRooms.collection.map(item => {
          return {
            id: item.id,
            _id: item._id,
            name: item.name,
            unitSize: item.unitSize,
            grossRent: item.grossRent,
            floor: item.floor,
            deliveryCondition: item.deliveryCondition,
            typicalFloorLayout: item.typicalFloorLayout,
            building: {
              id: item.building.id,
              _id: item.building._id,
              name: item.building.name,
              buildingClass: item.building.buildingClass,
              address: item.building.address,
            },
          };
        });
        return leaseRoomList;
      })
    );
  }
}
