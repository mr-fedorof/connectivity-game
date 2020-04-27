import { Predicate } from '@angular/core';
import { Comparator, uniqWith } from 'lodash';

export function replaceElement<T>(
    values: T[],
    value: T,
    comparator: Comparator<T>,
    newValueFactory: ((T) => T)
): T[] {
    const index = values.findIndex(v => comparator(value, v));
    if (index < 0) {
        return values;
    }

    const result = [...values];

    result.splice(index, 1, newValueFactory(values[index]));

    return result;
}

export function replaceElementWith<T>(
    values: T[],
    valuePredicate: Predicate<T>,
    newValueFactory: ((T) => T)
): T[] {
    const index = values.findIndex(v => valuePredicate(v));
    if (index < 0) {
        return values;
    }

    const result = [...values];

    result.splice(index, 1, newValueFactory(values[index]));

    return result;
}

export function addElement<T>(
    values: T[],
    value: T,
    comparator: Comparator<T>
): T[] {
    const index = values.findIndex(v => comparator(value, v));
    if (index >= 0) {
        return values;
    }

    const result = [...values, value];

    return result;
}

export function removeElement<T>(
    values: T[],
    value: T,
    comparator: Comparator<T>
): T[] {
    const index = values.findIndex(v => comparator(value, v));
    if (index < 0) {
        return values;
    }

    const result = [...values];

    result.splice(index, 1);

    return result;
}

export function removeElementWith<T>(
    values: T[],
    valuePredicate: Predicate<T>
): T[] {
    const index = values.findIndex(v => valuePredicate(v));
    if (index < 0) {
        return values;
    }

    const result = [...values];

    result.splice(index, 1);

    return result;
}

export function mergeElements<T>(
    values1: T[],
    values2: T[],
    comparator: Comparator<T>
): T[] {
    return uniqWith([...values1, ...values2], comparator);
}
