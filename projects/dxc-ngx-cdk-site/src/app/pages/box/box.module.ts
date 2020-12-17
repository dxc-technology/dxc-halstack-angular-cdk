import { NgModule } from "@angular/core";
import { DxcBoxModule, DxcTableModule,DxcTagModule,DxcChipModule,DxcHeadingModule } from '@dxc-technology/halstack-angular';
import { BoxComponent } from './box.component';
import { BoxExampleComponent } from '../../components/examples/box/box-example/box-example.component';
import { BoxTablePropertiesComponent } from '../../components/examples/box/properties/box-table-properties/box-table-properties.component';
import { BrowserModule } from '@angular/platform-browser';
import { TabbedSectionModule } from '../../components/tabbed-section/tabbed-section.module';
import { BoxImportComponent } from '../../components/examples/box/box-import/box-import.component';
import { CodePlaygroundModule } from '../../components/code-playground/code-playground.module';
import { ComponentsSidenavModule } from '../components-sidenav/components-sidenav.module';
import { BoxApiComponent } from '../../components/examples/box/box-api/box-api.component';
import { BoxThemeComponent } from '../../components/examples/box/box-theme/box-theme.component';

@NgModule({
  declarations: [
    BoxComponent,
    BoxExampleComponent,
    BoxTablePropertiesComponent,
    BoxImportComponent,
    BoxApiComponent,
    BoxThemeComponent
    ],
  imports: [
    BrowserModule,
    TabbedSectionModule,
    DxcBoxModule,
    DxcTableModule,
    DxcTagModule,
    CodePlaygroundModule,
    ComponentsSidenavModule,
    DxcChipModule,
    DxcHeadingModule
  ],
  exports: [
    BoxExampleComponent,
    BoxTablePropertiesComponent,
    BoxImportComponent,
    BoxApiComponent,
    BoxThemeComponent
  ]
})
export class BoxModule {}
