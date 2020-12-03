import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {StatisticsSidebarWidgetComponent} from './statistics-sidebar-widget.component';
import {Component} from '@angular/core';
import {ViewContext} from '@app-common/views/view.model';
import {WidgetMetadata} from '@app-common/metadata/widget.metadata';
import {LanguageStore} from '@store/language/language.store';
import {languageStoreMock} from '@store/language/language.store.spec.mock';
import {sidebarWidgetStatisticsFactoryMock} from './statistics-sidebar-widget.component.spec.mock';
import {SingleValueStatisticsStoreFactory} from '@store/single-value-statistics/single-value-statistics.store.factory';
import {FieldModule} from '@fields/field.module';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';

@Component({
    selector: 'statistics-sidebar-widget-test-host-component',
    template: '<scrm-statistics-sidebar-widget [context]="context" [config]="config"></scrm-statistics-sidebar-widget>'
})
class StatisticsSidebarWidgetHostComponent {
    context: ViewContext = {
        module: 'accounts',
        id: '123'
    };

    config: WidgetMetadata = {
        type: 'statistics',
        labelKey: 'LBL_SIZE_ANALYSIS',
        options: {
            sidebarStatistic: {
                rows: [
                    {
                        align: 'start',
                        cols: [{labelKey: 'LBL_POSITION', size: 'medium'}]
                    },
                    {
                        align: 'start',
                        cols: [
                            {
                                statistic: 'opportunity-size-analysis',
                                size: 'xx-large',
                                bold: true,
                                color: 'green'
                            }
                        ]
                    },
                    {
                        align: 'start',
                        cols: [
                            {labelKey: 'LBL_OUT_OF', size: 'regular'},
                            {
                                statistic: 'opportunity-count',
                                size: 'regular'
                            }
                        ]
                    }
                ]
            }
        }
    };
}

describe('StatisticsSidebarWidgetComponent', () => {
    let testHostComponent: StatisticsSidebarWidgetHostComponent;
    let testHostFixture: ComponentFixture<StatisticsSidebarWidgetHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                StatisticsSidebarWidgetHostComponent,
                StatisticsSidebarWidgetComponent,
            ],
            imports: [
                BrowserDynamicTestingModule,
                FieldModule,
                CommonModule,
                RouterTestingModule,
                ApolloTestingModule
            ],
            providers: [
                {provide: LanguageStore, useValue: languageStoreMock},
                {provide: SingleValueStatisticsStoreFactory, useValue: sidebarWidgetStatisticsFactoryMock},
            ],
        }).compileComponents();

        testHostFixture = TestBed.createComponent(StatisticsSidebarWidgetHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();
    }));

    it('should create', () => {
        expect(testHostComponent).toBeTruthy();
    });

    it('should have statistics', () => {
        expect(testHostComponent).toBeTruthy();

        const widget = testHostFixture.nativeElement.getElementsByTagName('scrm-statistics-sidebar-widget')[0];

        expect(widget).toBeTruthy();

        const widgetBar = widget.getElementsByClassName('statistics-sidebar-widget').item(0);

        expect(widgetBar).toBeTruthy();

        const widgetRows = widgetBar.getElementsByClassName('statistics-sidebar-widget-row');

        expect(widgetRows).toBeTruthy();
        expect(widgetRows.length).toEqual(3);

        const titleRow = widgetRows.item(0);
        const titleCols = titleRow.getElementsByClassName('statistics-sidebar-widget-col');

        expect(titleCols).toBeTruthy();
        expect(titleCols.length).toEqual(1);

        const titleValue = titleCols.item(0).getElementsByClassName('statistics-sidebar-widget-entry-label');

        expect(titleValue).toBeTruthy();
        expect(titleValue.item(0)).toBeTruthy();
        expect(titleValue.item(0).textContent).toContain('Position');

        const valueRow = widgetRows.item(1);
        const valueCols = valueRow.getElementsByClassName('statistics-sidebar-widget-col');

        expect(valueCols).toBeTruthy();
        expect(valueCols.length).toEqual(1);

        const value = valueCols.item(0).getElementsByClassName('statistics-sidebar-widget-entry-value');

        expect(value).toBeTruthy();
        expect(value.item(0)).toBeTruthy();
        expect(value.item(0).textContent).toContain('5');

        const infoRow = widgetRows.item(2);

        const infoCols = infoRow.getElementsByClassName('statistics-sidebar-widget-col');

        expect(infoCols).toBeTruthy();
        expect(infoCols.length).toEqual(2);

        const infoLabel = infoCols.item(0).getElementsByClassName('statistics-sidebar-widget-entry-label');

        expect(infoLabel).toBeTruthy();
        expect(infoLabel.item(0)).toBeTruthy();
        expect(infoLabel.item(0).textContent).toContain('Out of');

        const infoValue = infoCols.item(1).getElementsByClassName('statistics-sidebar-widget-entry-value');

        expect(infoValue).toBeTruthy();
        expect(infoValue.item(0)).toBeTruthy();
        expect(infoValue.item(0).textContent).toContain('200');
    });
});
