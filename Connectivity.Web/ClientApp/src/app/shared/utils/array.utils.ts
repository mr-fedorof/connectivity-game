export function replaceElement<T>(
    values: T[],
    predicate: (value: T, index: number, obj: T[]) => boolean,
    replaceFunc: ((T) => T)
): T[] {
    const index = values.findIndex(predicate);
    if (index < 0) {
        return values;
    }

    values = [...values];

    values.splice(index, 1, replaceFunc(values[index]));

    return values;
}

export function addElement<T>(
    values: T[],
    value: T
): T[] {
    return [...values || [], value];
}

export function addIfNotExistsElement<T>(
    values: T[],
    value: T,
    predicate: (value: T, index: number, obj: T[]) => boolean
): T[] {
    const index = values.findIndex(predicate);
    if (index >= 0) {
        return values;
    }

    return [...values || [], value];
}

export function removeElement<T>(
    values: T[],
    predicate: (value: T, index: number, obj: T[]) => boolean
): T[] {
    const index = values.findIndex(predicate);
    if (index < 0) {
        return values;
    }

    values = [...values];

    values.splice(index, 1);

    return values;
}
