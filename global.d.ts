interface SymbolConstructor {
	readonly result: symbol;
}

interface Function {
	[Symbol.result]<A extends any[], R extends Promise<any>>(this: (...args: A) => R, ...args: A): Promise<[Error, null] | [null, Awaited<R>]>;

	[Symbol.result]<A extends any[], R>(this: (...args: A) => R, ...args: A): [Error, null] | [null, R];
}

interface Promise<T> {
	[Symbol.result](): Promise<[Error, null] | [null, T]>;
}

declare const Symbol: SymbolConstructor;
