export abstract class CacheService {
    abstract get<T>(key: string): T | null;
    abstract set<T>(key: string, value: T, timeInSeconds?: number): void;
    abstract delete(key: string): void;
    abstract clear(): void;
    // abstract keys(): string[];
    // abstract values(): any[];
    abstract has(key: string): boolean;
    // abstract size(): number;
    // abstract forEach(callback: (key: string, value: any) => void): void;
}