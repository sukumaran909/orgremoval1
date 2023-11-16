import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { SpeedDialModule } from 'primeng/speeddial';
import { DatePipe } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ActionBarComponent } from '@libsrc/action-bar/action-bar.component';
import { CaptionBarComponent } from '@libsrc/caption-bar/caption-bar.component';
import { UrlEditComponent } from '@libsrc/url-edit/url-edit.component';
import { WorkflowActionBarComponent } from '@libsrc/workflow-action-bar/workflow-action-bar.component';
import { ChangeLogsComponent } from '@libsrc/change-logs/change-logs.component';
import { ChangeLogsGridComponent } from '@libsrc/change-logs-grid/change-logs-grid.component';
import { ConfirmationPopupComponent } from '@libsrc/confirmation/confirmation-popup.component';
import { WorkflowSimulatorComponent } from '@libsrc/workflow-simulator/workflow-simulator.component';
import { TabsComponent } from '@libsrc/tabs/tabs.component';
import { SpeedDialComponent } from '@libsrc/speed-dial/speed-dial.component';
import { BreadcrumbComponent } from '@libsrc/breadcrumb/breadcrumb.component';
import { WorkflowHistoryComponent } from '@libsrc/workflow-history/workflow-history.component';
import { GridComponent } from '@libsrc/grid/grid.component';
import { OptionalFiltersComponent } from '@libsrc/optional-filters/optional-filters.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ActionBarComponent,
    CaptionBarComponent,
    UrlEditComponent,
    WorkflowActionBarComponent,
    ChangeLogsComponent,
    ChangeLogsGridComponent,
    ConfirmationPopupComponent,
    WorkflowSimulatorComponent,
    TabsComponent,
    SpeedDialComponent,
    BreadcrumbComponent,
    WorkflowHistoryComponent,
    GridComponent,
    OptionalFiltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    ButtonModule,
    ProgressBarModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    RippleModule,
    SplitButtonModule,
    TooltipModule,
    MenuModule,
    SpeedDialModule,
    TableModule,
    DataTablesModule,
    NgxMaskModule.forRoot({}),
    OverlayPanelModule,
    MultiSelectModule,
    DropdownModule,
    BreadcrumbModule,
    MessagesModule
  ],
  exports: [
    ActionBarComponent,
    CaptionBarComponent,
    UrlEditComponent,
    WorkflowActionBarComponent,
    ChangeLogsComponent,
    ChangeLogsGridComponent,
    TableModule,
    TabsComponent,
    BreadcrumbComponent,
    WorkflowHistoryComponent,
    GridComponent,
    NgxMaskModule,
    OptionalFiltersComponent,
    MultiSelectModule,
    DropdownModule,
    BreadcrumbModule,
    MessagesModule
  ],
  providers: [
    MessageService,
    CaptionBarComponent,
    UrlEditComponent,
    DatePipe
  ]
})
export class WidgetsBaseModule { }
