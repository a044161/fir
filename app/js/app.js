import tpl from "./modules/templates/index";
import utils from "./modules/utils";
import {
	getElement,
	on,
	addClass,
	removeClass,
	getDataSet
} from "./modules/dom";

import calculate from "./core/calculate";

class FIR {
	constructor(configs) {
		const defaultConfigs = {
			id: "",
			size: 14
		};

		this.firBoard = [];
		this.firstChess = 1;
		this.isDisabled = false;
		this.winner = "";

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
	init() {
		this.element = getElement(`#${this.configs.id}`);

		const fir_body =
			this.createRow() + this.createCol() + this.createPoint(); // 生成格子以及点

		this.element.innerHTML = tpl("fir_wrapper", fir_body);

		const firPointWrapper = getElement(".fir__point");

		on(firPointWrapper, "click", this.handleChess.bind(this));
	}

	/**
     * 创建行
     * 
     * @returns 
     * @memberof FIR
     */
	createRow() {
		console.time("create row");

		let row_element = "";

		let row_height = `${100 / this.configs.size}%`;

		for (let i = 0; i < this.configs.size; i++) {
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
	createCol() {
		console.time("create col");

		let col_element = "";
		let col_width = `${100 / this.configs.size}%`;

		for (let i = 0; i < this.configs.size; i++) {
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
	createPoint() {
		console.time("create point");

		let point_element = "";
		let point_num = Math.pow(this.configs.size + 1, 2); // 计算点的数量

		let current_row = 0,
			current_col = 0; // 初始化当前行、列坐标
		let current_top, current_left;

		const Percent = 100 / this.configs.size; // 计算格子的百分比

		const PointSize = Percent / 1.2; // 生成点的大小

		// 点的定位
		current_top = -PointSize / 2;
		current_left = -PointSize / 2;

		for (let i = 0; i < point_num; i++) {
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
					width: `${PointSize}%`,
					height: `${PointSize}%`,
					top: `${current_top}%`,
					left: `${current_left}%`
				}
			});

			current_left += Percent; // 非另起一行的情况时，left加上格子的大小则为偏移
		}

		point_element = tpl("fir_point", point_element);

		console.timeEnd("create point");

		return point_element;
	}

	handleChess(evt) {
		const target = evt.target;

		if (target.dataset.point && !this.isDisabled) {
			const point = getDataSet(target, "point");

			const index =
				(point[0] - 1) * (this.configs.size + 1) + (point[1] - 1);

			if (!utils.isUndefined(this.firBoard[index])) {
				return;
			}

			if (this.firstChess === 1) {
				addClass(target, "fir__point__block--black");
			} else {
				addClass(target, "fir__point__block--white");
			}

			this.firBoard = calculate.count(
				this.firBoard,
				this.configs.size + 1,
				point,
				this.firstChess
			);
			if (calculate.isWin()) {
				this.isDisabled = true;
				this.winner = this.firstChess === 1 ? "黑方" : "白方";
				alert(`获胜方为：${this.winner}`);
				return;
			}

			this.firstChess = this.firstChess === 1 ? -1 : 1;
		}
	}
}

window.FIR = FIR;
