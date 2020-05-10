import * as moment from 'moment';

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
