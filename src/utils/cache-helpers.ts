"use client";

export function setCache(key: string, value: string): void {
    const cache = JSON.parse(localStorage.getItem('cache') || '{}');
    cache[key] = value;
    localStorage.setItem('cache', JSON.stringify(cache));
}


export function getCache(key: string): string | null {
    const cache = JSON.parse(localStorage.getItem('cache') || '{}');
    return cache[key] || null;
}