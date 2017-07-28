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

		this.firBoard = []; // 计算五子连珠的数组
		this.firstChess = 1; // 黑棋先
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
	init() {
		const element = getElement(`#${this.configs.id}`);
		const fir_body =
			this.createRow() + this.createCol() + this.createPoint(); // 生成格子以及点

		element.innerHTML = tpl("fir_wrapper", fir_body);

		const firPointWrapper = getElement(".fir__point");
		const backMoveBtn = getElement("#backMoveBtn");
		const resetBtn = getElement("#resetBtn");

		this.setFirSize();

		this.element_title = getElement(".fir__header__p");

		// 注册下棋的点击事件
		on(firPointWrapper, "click", this.handleChessClick.bind(this));
		// 注册悔棋的点击事件
		on(backMoveBtn, "click", this.handleBackMove.bind(this));
		// 注册重新开始的点击事件
		on(resetBtn, "click", this.handleReset.bind(this));
	}

	// 将棋盘的大小根据宽度，自动去计算高度，保证在外容器在宽高不一致的情况下棋盘依旧为正方形
	setFirSize() {
		const firWrapper = getElement(".fir");
		const firBody = getElement(".fir__body");

		const scale = 0.8;

		const firBodyWidth = firWrapper.clientWidth * scale;
		const firBodyHeight =
			firBodyWidth / firWrapper.clientHeight * 100 + "%";

		firBody.style.width = scale * 100 + "%";
		firBody.style.height = firBodyHeight;
		firBody.style.position = "relative";
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

	// 悔棋操作
	handleBackMove() {
		if (this.squence.length === 0) {
			return;
		}
		// 获取最后一步时的棋子信息
		const pre_step = this.squence.pop();

		// 同步数据
		this.firBoard[pre_step.index] = undefined;

		this.firstChess = this.firstChess === 1 ? -1 : 1;
		this.element_title.innerHTML = `当前为：${this.firstChess === 1
			? "黑方"
			: "白方"}`;

		// 同步样式
		removeClass(
			getElement(`[data-point="[${pre_step.point}]"]`),
			"fir__point__block--black fir__point__block--white"
		);
	}

	// 重新开始
	handleReset() {
		this.firBoard = [];

		this.squence.forEach(step => {
			removeClass(
				getElement(`[data-point="[${step.point}]"]`),
				"fir__point__block--black fir__point__block--white"
			);
		});

		this.isDisabled = false;
		this.squence = [];
		this.firstChess = 1;
		this.element_title.innerHTML = `当前为：黑方`;
	}

	// 点击操作
	handleChessClick(evt) {
		const target = evt.target;

		if (target.dataset.point && !this.isDisabled) {
			const point = getDataSet(target, "point");
			this.handleChess(point, target);
		}
	}

	// 下棋的操作
	handleChess(point, target) {
		let is_win = false;

		// 获取坐标所对应的索引值
		const index = (point[0] - 1) * (this.configs.size + 1) + (point[1] - 1);

		if (!utils.isUndefined(this.firBoard[index])) {
			return;
		}

		// 不同棋子增加不同样式
		if (this.firstChess === 1) {
			addClass(target, "fir__point__block--black");
		} else {
			addClass(target, "fir__point__block--white");
		}

		// 计算是否获胜，返回当前的数组和是否获胜
		const calculate_result = calculate.count(
			this.firBoard, // 计算五子连珠的数组
			this.configs.size + 1, // 当前棋盘的大小
			point, // 棋子的坐标
			this.firstChess // 当前的下棋方
		);

		// 用于计算是否五子连珠的数组
		this.firBoard = calculate_result.chess_array;

		// 是否获胜
		is_win = calculate_result.is_win;

		// 往下棋队列中添加
		this.squence.push({ point: point, index: index });

		// 赢的操作
		if (is_win) {
			this.isDisabled = true;
			this.winner = this.firstChess === 1 ? "黑方" : "白方";
			alert(`获胜方为：${this.winner}`);
			return;
		}

		this.firstChess = this.firstChess === 1 ? -1 : 1;

		this.element_title.innerHTML = `当前为：${this.firstChess === 1
			? "黑方"
			: "白方"}`;
	}
}

window.FIR = FIR;

export default FIR;
