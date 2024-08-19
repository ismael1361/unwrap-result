((global) => {
	global.Symbol.result = Symbol("result");

	function cloneFunc(thisArg, fn) {
		if (typeof fn !== "function") {
			return fn;
		}
		return fn.bind(thisArg);
	}

	global.Function.prototype[Symbol.result] = function (...args) {
		try {
			const result = this.apply(this, args);

			if (result && typeof result === "object" && Symbol.result in result) {
				return result[Symbol.result]();
			}

			if (result && typeof result === "object" && !(result instanceof Promise)) {
				const clone = { ...result };
				for (const k in result) {
					clone[k] = cloneFunc(this, result[k]);
				}
				return [null, clone];
			}

			return [null, result];
		} catch (error) {
			return [error || new Error("Throw error is falsy"), null];
		}
	};

	global.Promise.prototype[Symbol.result] = async function () {
		try {
			const result = await this;

			if (result && typeof result === "object" && !(result instanceof Promise)) {
				const clone = { ...result };
				for (const k in result) {
					clone[k] = cloneFunc(result, result[k]);
				}
				return [null, clone];
			}

			return [null, result];
		} catch (error) {
			return [error || new Error("Throw error is falsy"), null];
		}
	};
})(globalThis);
