"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 判断是否为对象
 */
var isObject = function () {
	return function (obj) {
		return obj.constructor === Object;
	};
}();

/**
 * 判断是否为数组
 */
var isArray = function () {
	return function (obj) {
		return obj instanceof Array;
	};
}();

/**
 * 判断是否为undefined
 */
var isUndefined = function () {
	return function (obj) {
		return typeof obj === "undefined";
	};
}();

/**
 * 判断是否为null
 */
var isNull = function () {
	return function (obj) {
		return obj === null;
	};
}();

/**
 * 合并对象
 */
var merge = function () {
	return function () {
		var newObj = {};

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		args.forEach(function (arg) {
			if (isObject(arg)) {
				for (var key in arg) {
					newObj[key] = arg[key];
				}
			}
		});
		return newObj;
	};
}();

var utils = {
	isObject: isObject,
	isArray: isArray,
	isUndefined: isUndefined,
	isNull: isNull,
	merge: merge
};

var col = function col(data) {
	var style = data.style ? data.style : {};

	return "<span class=\"fir__col__line\" style=\"width: " + style.width + ";\"></span>";
};

var col$1 = {
	col: col
};

var row = function row(data) {
	var style = data.style ? data.style : {};

	return "<span class=\"fir__row__line\" style=\"height: " + style.height + ";\"></span>";
};

var row$1 = {
	row: row
};

var point = function point(data) {
	var style = data.style ? data.style : {};

	return "<div class=\"fir__point__block\" \n    data-point=\"[" + data.x + "," + data.y + "]\" \n    style=\"width: " + style.width + "; height: " + style.height + "; left: " + style.left + "; top: " + style.top + ";\"></div>";
};

var point$1 = {
	point: point
};

var fir_wrapper = function fir_wrapper(data) {
	return "\n    <div class=\"fir\">\n        <div class=\"fir__header\">\n            <p class=\"fir__header__p\">\u5F53\u524D\u4E3A\uFF1A\u9ED1\u65B9</>\n        </div>\n        <div class=\"fir__body\">\n            " + data + "\n        </div>\n        <div class=\"fir__side\">\n            <button class=\"fir__button\" id=\"backMoveBtn\">\u6094\u68CB</button>\n            <button class=\"fir__button\" id=\"resetBtn\">\u91CD\u65B0\u5F00\u59CB</button>\n        </div>\n    </div>";
};

var fir_col = function fir_col(data) {
	return "<div class=\"fir__col\">" + data + "</div>";
};

var fir_row = function fir_row(data) {
	return "<div class=\"fir__row\">" + data + "</div>";
};

var fir_point = function fir_point(data) {
	return "<div class=\"fir__point\">" + data + "</div>";
};

var frame = {
	fir_wrapper: fir_wrapper,
	fir_col: fir_col,
	fir_row: fir_row,
	fir_point: fir_point
};

var TPL_OBJ = merge(col$1, row$1, point$1, frame);

var tpl = function tpl(type, data) {
	if (typeof TPL_OBJ[type] === "function" || typeof TPL_OBJ[type] === "string") {
		return TPL_OBJ[type](data);
	}
};

/**
 * 获取dom元素
 */
var getElement = function () {
	return function (tag) {
		var isId = tag.indexOf("#") === 0;
		var isClass = tag.indexOf(".") === 0;
		var element = void 0;

		if (document.querySelector) {
			element = document.querySelector(tag);
			if (element.length > 0) {
				element = document.querySelectorAll(tag);
			}
		} else if (isId || isClass) {
			tag = tag.slice(1);
			if (isId) {
				element = document.getElementById(tag);
			} else if (isClass) {
				element = document.getElementsByClassName(tag);
			} else {
				element = document.getElementsByTagName(tag);
			}
		}

		return element;
	};
}();

/**
 * 增加类名
 */
var addClass = function () {
	return function (element, className) {
		var oldClassName = element.className.split(" ");
		var addClassName = className.split(" ");

		var newClassName = oldClassName.concat(addClassName);

		element.className = newClassName.join(" ");
	};
}();

/**
 * 删除类名
 */
var removeClass = function () {
	return function (element, className) {
		var oldClassName = element.className.split(" ");
		var removeClassName = className.split(" ");

		removeClassName.forEach(function (c, index) {
			var c_index = oldClassName.indexOf(c);
			if (c_index > -1) {
				oldClassName.splice(c_index, 1);
			}
		});

		element.className = oldClassName.join(" ");
	};
}();

/**
 * 增加事件监听器
 */
var on = function () {
	if (document.addEventListener) {
		return function (element, event, handler, propagation) {
			if (!propagation) {
				propagation = false;
			}
			if (element && event && handler) {
				element.addEventListener(event, handler, propagation);
			}
		};
	} else {
		return function (element, event, handler) {
			if (element && event && handler) {
				element.attachEvent("on" + event, handler);
			}
		};
	}
}();

/**
 * 获取dataset
 */
var getDataSet = function () {
	return function (element, key) {
		var val = void 0;

		if (element.dataset) {
			val = element.dataset[key];
		} else {
			val = element.getAttribute(key);
		}

		try {
			return JSON.parse(val);
		} catch (e) {
			return val;
		}
	};
}();

/**
 * 移除事件监听器
 */

var chess_array = void 0;
var row_num = void 0;
var chess_point = void 0;
var point_index = void 0;
var chess_val = void 0;

function commonCalculateXY(min, max, space) {
	var get_point_1 = 0;
	var get_point_2 = 0;

	var min_index = point_index;
	var max_index = point_index;

	for (var i = 0; i < 5; i++) {
		var min_point_value = chess_array[min_index] ? chess_array[min_index].value : undefined;
		var max_point_value = chess_array[max_index] ? chess_array[max_index].value : undefined;

		if (min_index > min && !utils.isUndefined(min_point_value)) {
			get_point_1 += min_point_value;
		} else if (utils.isUndefined(min_point_value)) {
			min_index = null;
		}

		if (max_index < max && !utils.isUndefined(max_point_value)) {
			get_point_2 += max_point_value;
		} else if (utils.isUndefined(max_point_value)) {
			max_index = null;
		}
		min_index -= space;
		max_index += space;

		var sum = get_point_1 + get_point_2 - chess_val;

		if (sum > 4 || sum < -4) {
			return true;
		}
	}

	return false;
}

function calculateX() {
	var min_col = chess_point[1] - 4 > 0 ? chess_point[1] - 4 : 1;
	var max_col = chess_point[1] + 4 > row_num ? row_num : chess_point[1] + 4;

	min_col = getPointIndex([chess_point[0], min_col]) - 1;
	max_col = getPointIndex([chess_point[0], max_col]) + 1;

	var result = commonCalculateXY(min_col, max_col, 1);

	return result;
}

function calculateY() {
	var min_row = chess_point[0] - 4 > 0 ? chess_point[0] - 4 : 1;
	var max_row = chess_point[0] + 4 > row_num ? row_num : chess_point[0] + 4;

	min_row = getPointIndex([min_row, chess_point[1]]) - 1;
	max_row = getPointIndex([max_row, chess_point[1]]) + 1;

	var result = commonCalculateXY(min_row, max_row, row_num);

	return result;
}

function calculateZ() {
	// 左边时是根据限制数量 + 1
	var space_L = row_num + 1;

	// 右边时是根据限制数量 - 1
	var space_R = row_num - 1;

	var point_index = getPointIndex(chess_point);

	var get_point_1 = 0; // minL + maxR
	var get_point_2 = 0; // minR + maxL

	// 获取点击时的坐标，需要生成多个，用于计算不同位置
	var x_min_L = chess_point[0];
	var x_min_R = chess_point[0];
	var y_min_L = chess_point[1];
	var y_min_R = chess_point[1];
	var x_max_L = chess_point[0];
	var x_max_R = chess_point[0];
	var y_max_L = chess_point[1];
	var y_max_R = chess_point[1];

	// 赋初始索引值
	var index_min_L = point_index;
	var index_min_R = point_index;
	var index_max_L = point_index;
	var index_max_R = point_index;

	// 用于标记是否已经获取到最大或者最小值
	var edgePointCheck = {
		min_L: null,
		min_R: null,
		max_L: null,
		max_R: null
	};

	for (var i = 0; i < 5; i++) {
		// 判断左边最小行
		if ((x_min_L === 1 || y_min_L === 1 || i === 4) && utils.isNull(edgePointCheck.min_L)) {
			edgePointCheck.min_L = getPointIndex([x_min_L, y_min_L]);
		} else {
			x_min_L = x_min_L - 1;
			y_min_L = y_min_L - 1;
		}

		// 判断右边最小行
		if ((x_min_R === 1 || y_min_R === row_num || i === 4) && utils.isNull(edgePointCheck.min_R)) {
			edgePointCheck.min_R = getPointIndex([x_min_R, y_min_R]);
		} else {
			x_min_R = x_min_R - 1;
			y_min_R = y_min_R + 1;
		}

		// 判断左边最大行
		if ((x_max_L === row_num || y_max_L === 1 || i === 4) && utils.isNull(edgePointCheck.max_L)) {
			edgePointCheck.max_L = getPointIndex([x_max_L, y_max_L]);
		} else {
			x_max_L = x_max_L + 1;
			y_max_L = y_max_L - 1;
		}

		// 判断右边最大行
		if ((x_max_R === row_num || y_max_R === row_num || i === 4) && utils.isNull(edgePointCheck.max_R)) {
			edgePointCheck.max_R = getPointIndex([x_max_R, y_max_R]);
		} else {
			x_max_R = x_max_R + 1;
			y_max_R = y_max_R + 1;
		}
	}

	for (var _i = 0; _i < 5; _i++) {
		var min_val_L = chess_array[index_min_L] ? chess_array[index_min_L].value : undefined;
		var min_val_R = chess_array[index_min_R] ? chess_array[index_min_R].value : undefined;
		var max_val_L = chess_array[index_max_L] ? chess_array[index_max_L].value : undefined;
		var max_val_R = chess_array[index_max_R] ? chess_array[index_max_R].value : undefined;

		if (index_min_L > edgePointCheck.min_L - 1 && !utils.isUndefined(min_val_L) && index_max_L !== point_index) {
			get_point_1 += min_val_L;
			if (get_point_1 > 4 || get_point_1 < -4) {
				return true;
			}
		}
		if (index_min_R > edgePointCheck.min_R - 1 && !utils.isUndefined(min_val_R) && index_min_R !== point_index) {
			get_point_2 += min_val_R;
			if (get_point_2 > 4 || get_point_2 < -4) {
				return true;
			}
		}

		if (index_max_L < edgePointCheck.max_L + 1 && !utils.isUndefined(max_val_L)) {
			get_point_2 += max_val_L;
			if (get_point_2 > 4 || get_point_2 < -4) {
				return true;
			}
		}

		if (index_max_R < edgePointCheck.max_R + 1 && !utils.isUndefined(max_val_R)) {
			get_point_1 += max_val_R;
			if (get_point_1 > 4 || get_point_1 < -4) {
				return true;
			}
		}

		index_min_L = index_min_L - space_L;
		index_min_R = index_min_R - space_R;
		index_max_L = index_max_L + space_R;
		index_max_R = index_max_R + space_L;
	}

	return false;
}

function getPointIndex(point) {
	var x = point[0];
	var y = point[1];

	var index = (x - 1) * row_num + y - 1;

	return index;
}

function isWin() {
	return calculateX() || calculateY() || calculateZ();
}

function count(chessArray, rowNum, point, val) {
	row_num = rowNum;
	chess_point = point;
	chess_val = val;

	var index = getPointIndex(point);

	chessArray[index] = {};
	chessArray[index].value = val;
	chessArray[index].point = chess_point;

	chess_array = chessArray;
	point_index = index;

	var is_win = isWin();

	return {
		chess_array: chessArray,
		is_win: is_win
	};
}

var calculate = {
	getPointIndex: getPointIndex,
	count: count
};

var FIR = function () {
	function FIR(configs) {
		_classCallCheck(this, FIR);

		var defaultConfigs = {
			id: "",
			size: 14
		};

		this.firBoard = [];
		this.firstChess = 1;
		this.isDisabled = false;
		this.winner = ""; // 输出赢家
		this.squence = []; // 记录下棋的顺序

		this.configs = utils.merge(defaultConfigs, configs);

		if (this.configs.id) {
			this.init();
		}
	}

	/**
     * 初始化
     * 
     * @memberof FIR
     */


	_createClass(FIR, [{
		key: "init",
		value: function init() {
			var element = getElement("#" + this.configs.id);
			var fir_body = this.createRow() + this.createCol() + this.createPoint(); // 生成格子以及点

			element.innerHTML = tpl("fir_wrapper", fir_body);

			var firPointWrapper = getElement(".fir__point");
			var backMoveBtn = getElement('#backMoveBtn');
			var resetBtn = getElement('#resetBtn');

			this.setFirSize();

			this.element_title = getElement(".fir__header__p");

			on(firPointWrapper, "click", this.handleChessClick.bind(this));
			on(backMoveBtn, 'click', this.handleBackMove.bind(this));
			on(resetBtn, 'click', this.handleReset.bind(this));
		}

		// 将棋盘的大小根据宽度，自动去计算高度，保证在外容器在宽高不一致的情况下棋盘依旧为正方形

	}, {
		key: "setFirSize",
		value: function setFirSize() {
			var firWrapper = getElement('.fir');
			var firBody = getElement('.fir__body');

			var scale = 0.8;

			var firBodyWidth = firWrapper.clientWidth * scale;
			var firBodyHeight = firBodyWidth / firWrapper.clientHeight * 100 + '%';

			firBody.style.width = scale * 100 + '%';
			firBody.style.height = firBodyHeight;
			firBody.style.position = 'relative';
		}

		/**
      * 创建行
      * 
      * @returns 
      * @memberof FIR
      */

	}, {
		key: "createRow",
		value: function createRow() {
			console.time("create row");

			var row_element = "";

			var row_height = 100 / this.configs.size + "%";

			for (var i = 0; i < this.configs.size; i++) {
				row_element += tpl("row", {
					style: {
						height: row_height
					}
				});
			}

			row_element = tpl("fir_row", row_element);

			console.timeEnd("create row");

			return row_element;
		}

		/**
      * 创建列
      * 
      * @returns 
      * @memberof FIR
      */

	}, {
		key: "createCol",
		value: function createCol() {
			console.time("create col");

			var col_element = "";
			var col_width = 100 / this.configs.size + "%";

			for (var i = 0; i < this.configs.size; i++) {
				col_element += tpl("col", {
					style: {
						width: col_width
					}
				});
			}

			col_element = tpl("fir_col", col_element);

			console.timeEnd("create col");

			return col_element;
		}

		/**
      * 创建点
      * 
      * @returns 
      * @memberof FIR
      */

	}, {
		key: "createPoint",
		value: function createPoint() {
			console.time("create point");

			var point_element = "";
			var point_num = Math.pow(this.configs.size + 1, 2); // 计算点的数量

			var current_row = 0,
			    current_col = 0; // 初始化当前行、列坐标
			var current_top = void 0,
			    current_left = void 0;

			var Percent = 100 / this.configs.size; // 计算格子的百分比

			var PointSize = Percent / 1.2; // 生成点的大小

			// 点的定位
			current_top = -PointSize / 2;
			current_left = -PointSize / 2;

			for (var i = 0; i < point_num; i++) {
				if (i % (this.configs.size + 1) === 0) {
					// 如果余数为0，则说明另起一行，则当前行、列、点的偏移起始值都需要改变
					current_row++; // 另起一行的情况时，当前行坐标累加
					current_col = 0; // 另起一行的情况时，当前列还原为起始值
					if (i !== 0) {
						current_top += Percent; // top需要加上格子的值
					}

					current_left = -PointSize / 2; // left需要还原为起始值
				}
				current_col++; // 非另起一行的情况时，当前列坐标累加

				point_element += tpl("point", {
					x: current_row, // 横坐标
					y: current_col, // 纵坐标
					style: {
						// 大小以及偏移值
						width: PointSize + "%",
						height: PointSize + "%",
						top: current_top + "%",
						left: current_left + "%"
					}
				});

				current_left += Percent; // 非另起一行的情况时，left加上格子的大小则为偏移
			}

			point_element = tpl("fir_point", point_element);

			console.timeEnd("create point");

			return point_element;
		}

		// 悔棋操作

	}, {
		key: "handleBackMove",
		value: function handleBackMove() {
			if (this.squence.length === 0) {
				return;
			}

			var pre_step = this.squence.pop();
			this.firBoard[pre_step.index] = undefined;

			this.firstChess = this.firstChess === 1 ? -1 : 1;
			this.element_title.innerHTML = "\u5F53\u524D\u4E3A\uFF1A" + (this.firstChess === 1 ? '黑方' : '白方');

			removeClass(getElement("[data-point=\"[" + pre_step.point + "]\"]"), "fir__point__block--black fir__point__block--white");
		}
	}, {
		key: "handleReset",
		value: function handleReset() {
			this.firBoard = [];

			this.squence.forEach(function (step) {
				removeClass(getElement("[data-point=\"[" + step.point + "]\"]"), "fir__point__block--black fir__point__block--white");
			});

			this.squence = [];
			this.firstChess = 1;
			this.element_title.innerHTML = "\u5F53\u524D\u4E3A\uFF1A\u9ED1\u65B9";
		}

		// 点击操作

	}, {
		key: "handleChessClick",
		value: function handleChessClick(evt) {
			var target = evt.target;

			if (target.dataset.point && !this.isDisabled) {
				var _point = getDataSet(target, "point");
				this.handleChess(_point, target);
			}
		}

		// 下棋的操作

	}, {
		key: "handleChess",
		value: function handleChess(point, target) {
			var is_win = false;
			var index = (point[0] - 1) * (this.configs.size + 1) + (point[1] - 1);

			if (!utils.isUndefined(this.firBoard[index])) {
				return;
			}

			if (this.firstChess === 1) {
				addClass(target, "fir__point__block--black");
			} else {
				addClass(target, "fir__point__block--white");
			}

			var calculate_result = calculate.count(this.firBoard, this.configs.size + 1, point, this.firstChess);

			this.firBoard = calculate_result.chess_array;
			is_win = calculate_result.is_win;

			if (is_win) {
				this.isDisabled = true;
				this.winner = this.firstChess === 1 ? "黑方" : "白方";
				alert("\u83B7\u80DC\u65B9\u4E3A\uFF1A" + this.winner);
				return;
			}

			this.firstChess = this.firstChess === 1 ? -1 : 1;

			this.squence.push({ point: point, index: index });

			this.element_title.innerHTML = "\u5F53\u524D\u4E3A\uFF1A" + (this.firstChess === 1 ? '黑方' : '白方');
		}
	}]);

	return FIR;
}();

window.FIR = FIR;