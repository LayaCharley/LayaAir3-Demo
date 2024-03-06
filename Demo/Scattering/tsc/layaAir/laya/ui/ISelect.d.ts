import { Handler } from "../utils/Handler";
import { UIComponent } from "./UIComponent";
export interface ISelect extends UIComponent {
    selected: boolean;
    clickHandler: Handler;
}
