import { Style } from "./style";

export class Timeparam {
    currentSeconds: number = 0;
    currentMinutes: number = 0;
    threshold01: number = 0;
    threshold02: number = 0;
    style: Style = new Style;
}
