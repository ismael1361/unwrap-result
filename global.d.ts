declare global {
	interface SymbolConstructor {
		readonly result: symbol;
	}

	interface Function {
		[Symbol.result]<A extends any[], R>(
			this: (...args: A) => R | Promise<R>,
			...args: A
		): [Error, null] | [null, R] | Promise<[Error, null] | [null, R]>;
	}

	interface Promise<T> {
		[Symbol.result](): Promise<[Error, null] | [null, T]>;
	}
}

interface SymbolConstructor {
	readonly result: symbol;
}

interface Function {
	[Symbol.result]<A extends any[], R>(
		this: (...args: A) => R | Promise<R>,
		...args: A
	): [Error, null] | [null, R] | Promise<[Error, null] | [null, R]>;
}

interface Promise<T> {
	[Symbol.result](): Promise<[Error, null] | [null, T]>;
}

declare const Symbol: SymbolConstructor;
