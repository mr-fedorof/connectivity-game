import * as moment from 'moment';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export function diffInSec(
    dateA: Date | string,
    dateB: Date | string
): number {
    const utcDateA = moment(dateA)
        .utc();
    const utcDateB = moment(dateB)
        .utc();

    const diff = utcDateA.diff(utcDateB, 'seconds');
    if (diff < 0) {
        return 0;
    }

    return diff;
}

export function leftTime(
    actualDiff: number,
    maxDiff: number
): number {
    return actualDiff > maxDiff
        ? 0
        : maxDiff - actualDiff;
}

export function leftTimeDelay(
    startedAt: Date | string,
    timespan: number
): Observable<void> {
    const diff = diffInSec(new Date(), startedAt);
    const delay = leftTime(diff, timespan);

    return timer(delay * 1000)
        .pipe(map(() => null));
}
