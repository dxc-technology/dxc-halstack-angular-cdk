import {
  Component,
  Input,
  HostBinding,
  OnChanges,
  SimpleChanges,
  HostListener
} from "@angular/core";
import { css } from "emotion";
import { BehaviorSubject } from "rxjs";
import { CssUtils } from "../utils";
import { responsiveSizes } from "../variables.js";

@Component({
  selector: "dxc-footer",
  templateUrl: "./dxc-footer.component.html",
  styleUrls: ["./dxc-footer.component.scss"],
  providers: [CssUtils]
})
export class DxcFooterComponent implements OnChanges {
  @HostBinding("class") className;

  @Input() socialLinks: { href?: string; logoSrc?: string }[];
  @Input() bottomLinks: { href?: string; text?: string }[];

  @Input() copyright: string;
  @Input() margin: any;
  @Input() padding: any;
  @Input() logoSrc: string;

  defaultImglogo: string;
  innerWidth;
  isResponsive;

  bottomLinksLength;

  defaultInputs = new BehaviorSubject<any>({
    socialLinks: {},
    bottomLinks: {},
    copyright: "",
    logoSrc: null,
    margin: null,
    padding: null
  });

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth <= responsiveSizes.tablet) {
      this.isResponsive = true;
    } else {
      this.isResponsive = false;
    }
    this.footerFooterStyle = `${this.setFooterFooterStyle(this.isResponsive)}`;
  }

  // Styling
  footerContainerStyle: string;

  footerHeaderStyle: string = css`
    display: flex;
    justify-content: space-between;
  `;
  socialIconsStyle: string = css`
    display: flex;
    align-items: center;
  `;

  socialIconStyle: string = css`
    display: inline-flex;
  `;

  socialIconImageStyle: string = css`
    display: inline-flex;
    height: 25px;
    width: 25px;
  `;

  childComponentsStyle: string;

  footerFooterStyle: string;

  socialLinksStyle: string = css`
    display: inline-flex;
    margin-left: 15px;
    &:first-child {
      margin-left: 0px;
    }
  `;

  bottomLinkStyle: string = css`
    text-decoration: none;
    color: var(--white);
    font-size: 12px;
  `;

  constructor(private utils: CssUtils) {}

  public ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.childComponentsStyle = `${this.setChildComponentsStyle(
      this.defaultInputs.getValue()
    )}`;
    if (this.innerWidth <= responsiveSizes.tablet) {
      this.isResponsive = true;
    } else {
      this.isResponsive = false;
    }
    this.footerContainerStyle = `${this.setFooterContainerStyle(
      this.defaultInputs.getValue(), this.isResponsive
    )}`;
    this.footerFooterStyle = `${this.setFooterFooterStyle(this.isResponsive)}`;
    this.bottomLinksLength = this.bottomLinks.length - 1;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const inputs = Object.keys(changes).reduce((result, item) => {
      result[item] = changes[item].currentValue;
      return result;
    }, {});
    this.defaultInputs.next({ ...this.defaultInputs.getValue(), ...inputs });
    this.footerContainerStyle = `${this.setFooterContainerStyle(
      this.defaultInputs.getValue(), this.isResponsive
    )}`;
    this.childComponentsStyle = `${this.setChildComponentsStyle(
      this.defaultInputs.getValue()
    )}`;
    this.footerFooterStyle = `${this.setFooterFooterStyle(this.isResponsive)}`;
    this.bottomLinksLength = this.bottomLinks.length - 1;
  }

  getLogoDxc() {
    return "../../assets/dxc_logo_wht.png";
  }

  setFooterContainerStyle(input: any, responsive) {
    return css`
      padding: ${responsive ? "20px" : "20px 60px 20px 20px"};
      font-family: "Open Sans", sans-serif;
      background-color: var(--black);
      ${this.utils.getTopMargin(input.margin)}
    `;
  }

  setFooterHeaderStyle() {
    return css`
      display: flex;
      justify-content: space-between;
    `;
  }

  setChildComponentsStyle(inputs: any) {
    return css`
      min-height: 15px;
      color: #fff;
      overflow: hidden;
      ${this.utils.getPaddings(inputs.padding)}
    `;
  }

  setFooterFooterStyle(responsive) {
    return css`
      display: flex;
      justify-content: space-between;
      flex-direction: ${responsive ? "column" : "row"};
      align-items: ${responsive ? "center" : "flex-end"};

      .copyrightStyle {
        color: var(--white);
        font-size: 12px;
        max-width: ${responsive ? "100%" : "40%"};
        width: ${responsive ? "100%" : "40%"};
        text-align: ${responsive ? "center" : "right"};
      }

      .bottomLinksStyle {
        padding-top: 6px;
        border-top: 2px solid var(--yellow);
        display: inline-flex;
        flex-wrap: wrap;
        max-width: ${responsive ? "100%" : "60%"};
        width: ${responsive ? "100%" : "60%"};
        text-align: ${responsive ? "center" : ""};
        margin: ${responsive ? "40px 0 40px 0" : ""};
        .point {
          margin: 0px 10px;
          color: white;
        }
        a {
          text-decoration: none;
          color: var(--white);
          font-size: 12px;
        }
      }
    `;
  }
}
