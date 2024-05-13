import { Duration } from "../components/periods/model/duration";

export class Crono {
    isOverTime: boolean = false;
    isStartedByUser: boolean = false;
    duration: Duration = new Duration;
}
