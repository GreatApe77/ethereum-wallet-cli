export interface CacheService{
    get<T>(key: string): T | null;
    set<T>(key: string, value: T,timeInSeconds?:number): void;
    delete(key: string): void;
    clear(): void;
    //keys(): string[];
    //values(): any[];
    has(key: string): boolean;
    // size(): number;
    // forEach(callback: (key: string, value: any) => void): void;
}