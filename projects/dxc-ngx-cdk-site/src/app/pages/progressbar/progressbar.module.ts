import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { DxcTableModule, DxcProgressbarModule, DxcButtonModule,DxcTagModule,DxcChipModule,DxcHeadingModule } from "@dxc-technology/halstack-angular";
import { ProgressbarComponent } from "./progressbar.component";
import { ProgressbarTablePropertiesComponent } from "src/app/components/examples/progressbar/properties/progressbar-table-properties.component";
import { ProgressbarExampleComponent } from "../../components/examples/progressbar/progressbar-example/progressbar-example.component";
import { TabbedSectionModule } from '../../components/tabbed-section/tabbed-section.module';
import { ProgressbarImportComponent } from '../../components/examples/progressbar/progressbar-import/progressbar-import.component';
import { CodePlaygroundModule } from '../../components/code-playground/code-playground.module';
import { ComponentsSidenavModule } from '../components-sidenav/components-sidenav.module';
import { ProgressbarApiComponent } from '../../components/examples/progressbar/progressbar-api/progressbar-api.component';
import { ProgressbarThemeComponent } from '../../components/examples/progressbar/progressbar-theme/progressbar-theme.component';
import { ColorPreviewModule } from '../../components/color-preview/color-preview.module';
import { CodesandboxViewerModule } from '../../components/codesandbox-viewer/codesandbox-viewer.module';

@NgModule({
  declarations: [
    ProgressbarComponent,
    ProgressbarTablePropertiesComponent,
    ProgressbarExampleComponent,
    ProgressbarImportComponent,
    ProgressbarApiComponent,
    ProgressbarThemeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    DxcTableModule,
    TabbedSectionModule,
    DxcProgressbarModule,
    DxcButtonModule,
    DxcTagModule,
    CodePlaygroundModule,
    ComponentsSidenavModule,
    ColorPreviewModule,
    DxcChipModule,
    DxcHeadingModule,
    CodesandboxViewerModule
  ],
  exports: [
    ProgressbarTablePropertiesComponent,
    ProgressbarExampleComponent,
    ProgressbarComponent,
    ProgressbarImportComponent,
    ProgressbarApiComponent,
    ProgressbarThemeComponent
  ]
})
export class ProgressbarModule {}
