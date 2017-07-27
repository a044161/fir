import utils from "../modules/utils";

let chess_array, row_num, chess_point, point_index, chess_val;

function calculateX() {
	let min_col = chess_point[1] - 4 > 0 ? chess_point[1] - 4 : 1;
	let max_col = chess_point[1] + 4 > row_num ? row_num : chess_point[1] + 4;

	min_col = getPointIndex([chess_point[0], min_col]) - 1;
	max_col = getPointIndex([chess_point[0], max_col]) + 1;

	let get_point_1 = 0;
	let get_point_2 = 0;

	let min_index = point_index;
	let max_index = point_index;

	for (let i = 0; i < 5; i++) {
		if (min_index > min_col && !utils.isUndefined(chess_array[min_index])) {
			get_point_1 += chess_array[min_index];
		} else if (utils.isUndefined(chess_array[min_index])) {
			min_index = null;
		}

		if (max_index < max_col && !utils.isUndefined(chess_array[max_index])) {
			get_point_2 += chess_array[max_index];
		} else if (utils.isUndefined(chess_array[max_index])) {
			max_index = null;
		}

		min_index--;
		max_index++;

		let sum = get_point_1 + get_point_2 - chess_val;

		if (sum > 4 || sum < -4) {
			return true;
		}
	}

	return false;
}

function calculateY() {
	const space = row_num;

	let min_row = chess_point[0] - 4 > 0 ? chess_point[0] - 4 : 1;
	let max_row = chess_point[0] + 4 > row_num ? row_num : chess_point[0] + 4;

	min_row = getPointIndex([min_row, chess_point[1]]) - 1;
	max_row = getPointIndex([max_row, chess_point[1]]) + 1;

	let get_point_1 = 0;
	let get_point_2 = 0;

	let min_index = point_index;
	let max_index = point_index;

	for (let i = 0; i < 5; i++) {
		if (min_index > min_row && !utils.isUndefined(chess_array[min_index])) {
			get_point_1 += chess_array[min_index];
		} else if (utils.isUndefined(chess_array[min_index])) {
			min_index = null;
		}

		if (max_index < max_row && !utils.isUndefined(chess_array[max_index])) {
			get_point_2 += chess_array[max_index];
		} else if (utils.isUndefined(chess_array[max_index])) {
			max_index = null;
		}

		min_index -= space;
		max_index += space;

		let sum = get_point_1 + get_point_2 - chess_val;

		if (sum > 4 || sum < -4) {
			return true;
		}
	}

	return false;
}

function calculateZ() {
	// 左边时是根据限制数量 + 1
	const space_L = row_num + 1;

	// 右边时是根据限制数量 - 1
	const space_R = row_num - 1;

	const point_index = getPointIndex(chess_point);

	let get_point_1 = 0; // minL + maxR
	let get_point_2 = 0; // minR + maxL

	// 获取点击时的坐标，需要生成多个，用于计算不同位置
	let x_min_L = chess_point[0];
	let x_min_R = chess_point[0];
	let y_min_L = chess_point[1];
	let y_min_R = chess_point[1];
	let x_max_L = chess_point[0];
	let x_max_R = chess_point[0];
	let y_max_L = chess_point[1];
	let y_max_R = chess_point[1];

	// 赋初始索引值
	let index_min_L = point_index;
	let index_min_R = point_index;
	let index_max_L = point_index;
	let index_max_R = point_index;

	// 用于标记是否已经获取到最大或者最小值
	let edgePointCheck = {
		min_L: null,
		min_R: null,
		max_L: null,
		max_R: null
	};

	for (let i = 0; i < 5; i++) {
		// 判断左边最小行
		if (
			(x_min_L === 1 || y_min_L === 1 || i === 4) &&
			utils.isNull(edgePointCheck.min_L)
		) {
			edgePointCheck.min_L = getPointIndex([x_min_L, y_min_L]);
		} else {
			x_min_L = x_min_L - 1;
			y_min_L = y_min_L - 1;
		}

		// 判断右边最小行
		if (
			(x_min_R === 1 || y_min_R === row_num || i === 4) &&
			utils.isNull(edgePointCheck.min_R)
		) {
			edgePointCheck.min_R = getPointIndex([x_min_R, y_min_R]);
		} else {
			x_min_R = x_min_R - 1;
			y_min_R = y_min_R + 1;
		}

		// 判断左边最大行
		if (
			(x_max_L === row_num || y_max_L === 1 || i === 4) &&
			utils.isNull(edgePointCheck.max_L)
		) {
			edgePointCheck.max_L = getPointIndex([x_max_L, y_max_L]);
		} else {
			x_max_L = x_max_L + 1;
			y_max_L = y_max_L - 1;
		}

		// 判断右边最大行
		if (
			(x_max_R === row_num || y_max_R === row_num || i === 4) &&
			utils.isNull(edgePointCheck.max_R)
		) {
			edgePointCheck.max_R = getPointIndex([x_max_R, y_max_R]);
		} else {
			x_max_R = x_max_R + 1;
			y_max_R = y_max_R + 1;
		}
	}

	for (let i = 0; i < 5; i++) {
		let min_val_L = chess_array[index_min_L];
		let min_val_R = chess_array[index_min_R];
		let max_val_L = chess_array[index_max_L];
		let max_val_R = chess_array[index_max_R];

		if (
			index_min_L > edgePointCheck.min_L - 1 &&
			!utils.isUndefined(min_val_L) &&
			index_max_L !== point_index
		) {
			get_point_1 += min_val_L;
			if (get_point_1 > 4 || get_point_1 < -4) {
				return true;
			}
		}
		if (
			index_min_R > edgePointCheck.min_R - 1 &&
			!utils.isUndefined(min_val_R) &&
			index_min_R !== point_index
		) {
			get_point_2 += min_val_R;
			if (get_point_2 > 4 || get_point_2 < -4) {
				return true;
			}
		}

		if (
			index_max_L < edgePointCheck.max_L + 1 &&
			!utils.isUndefined(max_val_L)
		) {
			get_point_2 += max_val_L;
			if (get_point_2 > 4 || get_point_2 < -4) {
				return true;
			}
		}

		if (
			index_max_R < edgePointCheck.max_R + 1 &&
			!utils.isUndefined(max_val_R)
		) {
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
	const x = point[0];
	const y = point[1];

	const index = (x - 1) * row_num + y - 1;

	return index;
}

function isWin() {
	return calculateX() || calculateY() || calculateZ();
}

function count(chessArray, rowNum, point, val) {
	row_num = rowNum;
	chess_point = point;
	chess_val = val;

	const index = getPointIndex(point);

	chessArray[index] = val;

	chess_array = chessArray;
	point_index = index;

	return chessArray;
}

export default {
	getPointIndex,
	count,
	isWin
};
