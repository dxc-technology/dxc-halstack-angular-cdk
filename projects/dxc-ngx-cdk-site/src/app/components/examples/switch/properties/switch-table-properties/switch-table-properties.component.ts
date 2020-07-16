import { Component, OnInit, Input } from '@angular/core';
import { DataPropertiesTable } from 'src/app/model/data-properties-table';
@Component({
  selector: 'app-switch-table-properties',
  templateUrl: './switch-table-properties.component.html',
  styleUrls: ['./switch-table-properties.component.scss']
})
export class SwitchTablePropertiesComponent implements OnInit {

  @Input()
  tablePropertiesExample: Array<DataPropertiesTable>;

  constructor() { 
    this.tablePropertiesExample = new Array<DataPropertiesTable>();
  }

  ngOnInit(): void {
        
  }

}
