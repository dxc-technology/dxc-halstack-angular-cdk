import {
  Component,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { CssUtils } from "../utils";
import {
  Input,
  HostBinding,
  ContentChildren,
  QueryList,
  SimpleChanges,
} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { css } from "emotion";
import { DxcAccordionComponent } from "../dxc-accordion/dxc-accordion.component";
import { AccordionService } from "./services/accordionService.service";
import {
  coerceNumberProperty,
  coerceBooleanProperty,
} from "@angular/cdk/coercion";

@Component({
  selector: "dxc-accordion-group",
  templateUrl: "./dxc-accordionGroup.component.html",
  providers: [CssUtils, AccordionService],
})
export class DxcAccordionGroupComponent implements OnChanges, OnInit {
  @Input() margin: any;
  @Input()
  get indexActive(): any {
    return this._indexActive;
  }
  set indexActive(value: any) {
    if (value === undefined || value === "undefined") {
      this._indexActive = undefined;
    } else if (value === null || value === "null") {
      this._indexActive = null;
    } else {
      this._indexActive = coerceNumberProperty(value);
    }
  }
  private _indexActive;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;
  @Output() onActiveChange = new EventEmitter<any>();

  @HostBinding("class") className;

  @ContentChildren(DxcAccordionComponent)
  dxcAccordion: QueryList<DxcAccordionComponent>;

  accordionContent: string;

  defaultInputs = new BehaviorSubject<any>({
    margin: null,
    indexActive: null,
    disabled: false,
  });

  constructor(
    private cssUtils: CssUtils,
    private accordionService: AccordionService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const inputs = Object.keys(changes).reduce((result, item) => {
      result[item] = changes[item].currentValue;
      return result;
    }, {});
    this.defaultInputs.next({ ...this.defaultInputs.getValue(), ...inputs });
    this.accordionContent = `${this.getDynamicStyle(
      this.defaultInputs.getValue()
    )}`;
    if (
      this.indexActive !== undefined &&
      this.accordionService.accordionActive.getValue() !== this.indexActive
    ) {
      this.accordionService.accordionActive.next(this.indexActive);
    }
  }

  ngOnInit() {
    this.accordionContent = `${this.getDynamicStyle(
      this.defaultInputs.getValue()
    )}`;
  }

  ngAfterContentInit() {
    if (this.indexActive === undefined) {
      this.uncontrolledAccordionGroup();
    } else {
      this.controlledAccordionGroup();
    }
  }

  uncontrolledAccordionGroup() {
    this.dxcAccordion.forEach((instance, index) => {
      this.setDisabledAccordion(instance);
      instance.onClickHandler = (event: any) => {
        if (!instance.disabled) {
          instance.renderedIsExpanded = !instance.renderedIsExpanded;
        }
        this.accordionService.accordionActive.next(
          instance.renderedIsExpanded
            ? index
            : this.accordionService.accordionActive.getValue() === index &&
                !instance.renderedIsExpanded &&
                undefined
        );
      };
    });
    this.accordionService.accordionActive.subscribe((value) => {
      this.dxcAccordion.forEach((instance, index) => {
        if (value === index) {
          this.onActiveChange.emit(index);
        }
        this.setIsExpanded(instance, value === index);
      });
    });
  }

  controlledAccordionGroup() {
    this.accordionService.accordionActive.next(this.indexActive);
    this.dxcAccordion.forEach((instance, index) => {
      this.setDisabledAccordion(instance);
      if (index === this.accordionService.accordionActive.getValue()) {
        this.setIsExpanded(instance, true);
      }
      instance.onClickHandler = ($event: any) => {
        this.onActiveChange.emit(index);
        this.setIsExpanded(
          instance,
          this.accordionService.accordionActive.getValue() === index
        );
      };
    });
    this.accordionService.accordionActive.subscribe((value) => {
      this.dxcAccordion.forEach((instance, index) => {
        this.setIsExpanded(instance, value === index);
      });
    });
  }

  private setIsExpanded(instance: DxcAccordionComponent, value: boolean) {
    instance.isExpanded = value;
    instance.renderedIsExpanded = value;
    instance.renderedIsExpanded === true
      ? instance._matExpansionPanel.open()
      : instance._matExpansionPanel.close();
  }

  private setDisabledAccordion(instance: DxcAccordionComponent) {
    if (this.disabled) {
      instance.disabled = true;
    }
  }

  getNestedAccordionStyle() {
    return css`
      dxc-accordion {
        margin-left: -16px;
        margin: 0px;
        width: 100%;
        .mat-accordion .mat-expansion-panel:last-of-type,
        .mat-accordion .mat-expansion-panel:first-of-type {
          border-radius: 4px;
        }
      }
    `;
  }

  getNestedAccordionGroupStyle() {
    return css`
      dxc-accordion-group {
        margin-left: -16px;
        dxc-accordion {
          mat-expansion-panel {
            mat-expansion-panel-header {
              padding: 0px 16px 0px 16px;
            }
          }
        }
      }
    `;
  }

  getDynamicStyle(inputs) {
    return css`
      ${this.cssUtils.getMargins(inputs.margin)}
      dxc-accordion {
        margin: 0px;
        .mat-accordion .mat-expansion-panel:last-of-type,
        .mat-accordion .mat-expansion-panel:first-of-type {
          border-bottom-right-radius: 0px;
          border-bottom-left-radius: 0px;
        }
        .mat-accordion .mat-expansion-panel:first-of-type {
          border-top-right-radius: 0px;
          border-top-left-radius: 0px;
        }
        ${this.getNestedAccordionStyle()}
        ${this.getNestedAccordionGroupStyle()}
        div.mat-expansion-panel-content {
          div.mat-expansion-panel-body {
            margin-left: 48px;
          }
        }
      }
      dxc-accordion:first-of-type {
        .mat-accordion .mat-expansion-panel:last-of-type,
        .mat-accordion .mat-expansion-panel:first-of-type {
          border-top-right-radius: 4px;
          border-top-left-radius: 4px;
          border-bottom-right-radius: 0px;
          border-bottom-left-radius: 0px;
        }
      }
      dxc-accordion:last-of-type {
        .mat-accordion .mat-expansion-panel:last-of-type,
        .mat-accordion .mat-expansion-panel:first-of-type {
          border-bottom-right-radius: 4px;
          border-bottom-left-radius: 4px;
          border-top-right-radius: 0px;
          border-top-left-radius: 0px;
        }
      }
    `;
  }
}
