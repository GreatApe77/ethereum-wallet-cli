type Token<T> = (new (...args: any[]) => T) | (abstract new (...args: any[]) => T);
type Factory<T> = () => T;

export class Locator {
	private singletons = new Map<any, any>();
	private factories = new Map<any, Factory<any>>();

	registerSingleton<T>(token: Token<T>, instance: T): void {
		this.singletons.set(token, instance);
	}

	registerFactory<T>(token: Token<T>, factory: Factory<T>): void {
		this.factories.set(token, factory);
	}

	get<T>(token: Token<T>): T {
		if (this.singletons.has(token)) {
			return this.singletons.get(token);
		}

		if (this.factories.has(token)) {
			const factory = this.factories.get(token)!;
			return factory();
		}

		throw new Error(`Service not found for token: ${token.name}`);
	}

    clear(): void {
        this.singletons.clear();
        this.factories.clear();
    }
}

export const locator = new Locator();
