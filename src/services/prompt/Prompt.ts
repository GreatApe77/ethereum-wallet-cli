export interface Prompt<T> {
	question(validate?: (input: string) => boolean): Promise<T>;
}
