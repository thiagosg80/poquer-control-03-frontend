import { Bet } from "./bet";
import { Duration } from "./duration";

export class Period {
    id: number = 0;
    isFinish: boolean = false;
    duration: Duration = new Duration;
    bet: Bet = new Bet;
}
