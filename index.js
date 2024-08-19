global.Symbol.result = Symbol("result");

global.Function.prototype[Symbol.result] = function (...args) {
	try {
		const result = this.apply(...args);

		if (result && typeof result === "object" && Symbol.result in result) {
			return result[Symbol.result]();
		}

		return [null, result];
	} catch (error) {
		return [error || new Error("Throw error is falsy"), null];
	}
};

global.Promise.prototype[Symbol.result] = async function () {
	try {
		const result = await this;
		return [null, result];
	} catch (error) {
		return [error || new Error("Throw error is falsy"), null];
	}
};
