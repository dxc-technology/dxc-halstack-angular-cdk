import { Component, OnInit, Input, SimpleChanges, HostBinding } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { css } from "emotion";
import { CssUtils } from '../utils';
@Component({
  selector: 'dxc-box',
  templateUrl: './dxc-box.component.html',
  styleUrls: ['./dxc-box.component.css'],
  providers : [CssUtils]
})
export class DxcBoxComponent implements OnInit {
  @HostBinding("class") className;
  @Input() shadowDepth: number;
  @Input() display:string;
  @Input() margin: any;
  @Input() padding: any;
  @Input() size: any;


   sizes = {
    small: "60px",
    medium: "240px",
    large: "480px",
    fillParent: "100%",
    fitcontent: "unset"
  };

  defaultInputs = new BehaviorSubject<any>({
    display: 'inline-flex',
    shadowDepth : '2',
    margin: null,
    padding: null
  });

  ngOnChanges(changes: SimpleChanges): void {
      const inputs = Object.keys(changes).reduce((result, item)=> {
      result[item] = changes[item].currentValue;
      return result;
    }, {});
    this.defaultInputs.next({ ... this.defaultInputs.getValue(), ... inputs});
    this.className = `${this.getDynamicStyle(this.defaultInputs.getValue())}`;
  }


  constructor(private utils: CssUtils) { }

  ngOnInit() {
    this.className = `${this.getDynamicStyle(this.defaultInputs.getValue())}`;
  }

  getDynamicStyle(inputs) {
    return css`
      display: ${inputs.display};
      border-radius: 4px;
      overflow: hidden;
  
      ${this.utils.getBoxShadow(inputs.shadowDepth) }
      ${this.utils.getMargins(inputs.margin) }
      ${this.utils.getPaddings(inputs.padding) }

    `;
  }
}