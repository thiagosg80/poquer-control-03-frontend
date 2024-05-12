import { Duration } from "../components/period/model/duration";

export class Crono {
    isOverTime: boolean = false;
    isStartedByUser: boolean = false;
    duration: Duration = new Duration;
}
