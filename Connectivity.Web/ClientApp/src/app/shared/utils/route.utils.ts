import { ActivatedRouteSnapshot, Router } from '@angular/router';
import * as _ from 'lodash';

export function getRouteParam(route: ActivatedRouteSnapshot, paramName: string): string {
    if (route.params[paramName]) {
        return route.params[paramName];
    }

    if (route.parent) {
        return getRouteParam(route.parent, paramName);
    }

    return '';
}
