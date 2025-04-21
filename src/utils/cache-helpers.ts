"use client";

export function setCache(key: string, value: unknown): void {
    const cache = JSON.parse(sessionStorage.getItem('cache') || '{}');
    cache[key] = value;
    sessionStorage.setItem('cache', JSON.stringify(cache));
}


export function getCache(key: string): unknown | null {
    const cache = JSON.parse(sessionStorage.getItem('cache') || '{}');
    return cache[key] || null;
}

export function updateCache(key: string, updateKey: string, updateValue: string): void {
    const cache = JSON.parse(sessionStorage.getItem('cache') || '{}');
    if (cache[key]) {
        cache[key][updateKey] = updateValue;
        sessionStorage.setItem('cache', JSON.stringify(cache));
    }
}

export function clearCache(key: string): void {
    const cache = JSON.parse(sessionStorage.getItem('cache') || '{}');
    if (cache[key]) {
        delete cache[key];
        sessionStorage.setItem('cache', JSON.stringify(cache));
    }
}