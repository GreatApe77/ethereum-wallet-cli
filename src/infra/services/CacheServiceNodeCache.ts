import NodeCache from "node-cache";
import { CacheService } from "../../domain/services/CacheService.js";

export class CacheServiceNodeCache implements CacheService{

    private cache: NodeCache = new NodeCache({
        stdTTL:20,
        deleteOnExpire:true
    })

    get<T>(key: string): T | null {
        return this.cache.get<T>(key)===undefined?null:this.cache.get<T>(key) as T;
    }
    set<T>(key: string, value: T, timeInSeconds: number =20): void {
        
        this.cache.set<T>(key,value,timeInSeconds)
    }
    delete(key: string): void {
        this.cache.del(key)
    }
    clear(): void {
        this.cache.flushAll()
    }
    has(key: string): boolean {
        return this.cache.has(key)
    }

}