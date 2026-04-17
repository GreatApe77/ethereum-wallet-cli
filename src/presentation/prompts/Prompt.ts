
export type PromptProps<X=void>={
	validate?:  (input: string) => boolean
	options?: X[];
	additionalData?:any
}
export interface Prompt<T,X=void> {
	question(props?:PromptProps<X>): Promise<T>;
}
