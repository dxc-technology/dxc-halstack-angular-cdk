import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { DxcTableModule, DxcUploadModule,DxcTagModule, DxcChipModule,DxcHeadingModule } from "@dxc-technology/halstack-angular";
import { TabbedSectionModule } from "../../components/tabbed-section/tabbed-section.module";
import { UploadComponent } from "./upload.component";
import { UploadTablePropertiesComponent } from "src/app/components/examples/upload/properties/upload-table-properties.component";
import {UploadExampleComponent} from "../../components/examples/upload/upload-example/upload-example.component";
import { UploadImportComponent } from '../../components/examples/upload/upload-import/upload-import.component';

import { CodePlaygroundModule } from '../../components/code-playground/code-playground.module';
import { ComponentsSidenavModule } from '../components-sidenav/components-sidenav.module';
import { UploadThemeComponent } from '../../components/examples/upload/upload-theme/upload-theme.component';
import { UploadApiComponent } from '../../components/examples/upload/upload-api/upload-api.component';
import { CodesandboxViewerModule } from '../../components/codesandbox-viewer/codesandbox-viewer.module';

@NgModule({
  declarations: [
    UploadComponent,
    UploadTablePropertiesComponent,
    UploadExampleComponent,
    UploadImportComponent,
    UploadApiComponent,
    UploadThemeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DxcTableModule,
    TabbedSectionModule,
    DxcUploadModule,
    DxcTagModule,
    CodePlaygroundModule,
    ComponentsSidenavModule,
    DxcChipModule,
    DxcHeadingModule,
    CodesandboxViewerModule
  ],
  exports: [
    UploadComponent,
    UploadTablePropertiesComponent,
    UploadExampleComponent,
    UploadImportComponent,
    UploadApiComponent,
    UploadThemeComponent
  ]
})
export class UploadModule {}
