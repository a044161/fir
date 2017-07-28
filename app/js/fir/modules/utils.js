/**
 * 判断是否为对象
 */
export const isObject = (function() {
	return function(obj) {
		return obj.constructor === Object;
	};
})();

/**
 * 判断是否为数组
 */
export const isArray = (function() {
	return function(obj) {
		return obj instanceof Array;
	};
})();

/**
 * 判断是否为undefined
 */
export const isUndefined = (function() {
	return function(obj) {
		return typeof obj === "undefined";
	};
})();

/**
 * 判断是否为null
 */
export const isNull = (function() {
	return function(obj) {
		return obj === null;
	};
})();

/**
 * 合并对象
 */
export const merge = (function() {
	return function(...args) {
		let newObj = {};

		args.forEach(arg => {
			if (isObject(arg)) {
				for (let key in arg) {
					newObj[key] = arg[key];
				}
			}
		});
		return newObj;
	};
})();

export default {
	isObject,
	isArray,
	isUndefined,
	isNull,
	merge
};
