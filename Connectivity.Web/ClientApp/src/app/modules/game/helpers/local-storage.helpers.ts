import { Predicate } from '@angular/core';

export function getLocalStorageArray<T>(cacheKey: string): T[] {
    const nomTime = new Date().getTime();

    const rawEntries = localStorage.getItem(cacheKey);
    const entries: { item: T, expiry: number }[] = JSON.parse(rawEntries) || [];

    const actualEntries = entries.filter(o => !o.expiry || nomTime <= o.expiry);
    if (entries.length !== actualEntries.length) {
        const rawActualEntries = JSON.stringify(actualEntries);
        localStorage.setItem(cacheKey, rawActualEntries);
    }

    const items = actualEntries.map(e => e.item);

    return items;
}

export function getLocalStorageArrayItem<T>(cacheKey: string, predicate: Predicate<T>): T {
    const items = getLocalStorageArray<T>(cacheKey);

    const item = items.find(o => predicate(o));
    if (!item) {
        return null;
    }

    return item;
}

export function addLocalStorageArrayItem<T>(cacheKey: string, item: T, predicate: Predicate<T>, expirationTime: number): void {
    const expiry = new Date().getTime() + expirationTime;

    const rawEntries = localStorage.getItem(cacheKey);
    const entries: { item: T, expiry: number }[] = JSON.parse(rawEntries) || [];

    const index = entries.findIndex(e => predicate(e.item));
    if (index >= 0) {
        entries.splice(index, 1);
    }

    const newEntry = {
        item,
        expiry
    };
    entries.push(newEntry);

    const rawNewEntries = JSON.stringify(entries);
    localStorage.setItem(cacheKey, rawNewEntries);
}

export function removeLocalStorageArrayItem<T>(cacheKey: string, predicate: Predicate<T>): void {
    const rawEntries = localStorage.getItem(cacheKey);
    const entries: { item: T, expiry: number }[] = JSON.parse(rawEntries) || [];

    const index = entries.findIndex(e => predicate(e.item));
    if (index < 0) {
        return;
    }

    entries.splice(index, 1);

    const rawNewEntries = JSON.stringify(entries);

    localStorage.setItem(cacheKey, rawNewEntries);
}
