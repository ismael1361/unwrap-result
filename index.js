((global) => {
	global.Symbol.result = Symbol("result");

	function cloneFunc(scope, fn) {
		if (typeof fn !== "function") {
			return fn;
		}
		return fn.bind(scope);
	}

	function cloneObj(obj) {
		if (obj && typeof obj === "object" && !(obj instanceof Promise)) {
			const clone = Object.assign({}, obj);
			for (const prop in obj) {
				const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
				Object.defineProperty(
					clone,
					prop,
					Object.assign({}, descriptor, {
						value: cloneFunc(obj, obj[prop]),
					}),
				);
			}

			return clone;
		}

		return obj;
	}

	global.Function.prototype[Symbol.result] = function () {
		try {
			const result = this.apply(this, arguments);

			if (result && typeof result === "object" && Symbol.result in result) {
				return result[Symbol.result]();
			}

			return [null, cloneObj(result)];
		} catch (error) {
			return [error || new Error("Throw error is falsy"), null];
		}
	};

	global.Promise.prototype[Symbol.result] = async function () {
		try {
			const result = await this;
			return [null, cloneObj(result)];
		} catch (error) {
			return [error || new Error("Throw error is falsy"), null];
		}
	};
})(globalThis);
