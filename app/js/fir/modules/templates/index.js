import { merge } from "../utils";

import col from "./col"; // 各模板文件
import row from "./row";
import point from "./point";

import frame from "./frame";

const TPL_OBJ = merge(col, row, point, frame); // ...运算符无法使用，就写了一个用于合并对象的方法

export default (type, data) => {
	if (
		// 通过type来查找模板，data是用于传入模板内的参数
		typeof TPL_OBJ[type] === "function" ||
		typeof TPL_OBJ[type] === "string"
	) {
		return TPL_OBJ[type](data);
	}
};
