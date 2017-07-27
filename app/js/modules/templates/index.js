import { merge } from "../utils";

import col from "./col";
import row from "./row";
import point from "./point";

import frame from "./frame";

const TPL_OBJ = merge(col, row, point, frame);

export default (type, data) => {
	if (
		typeof TPL_OBJ[type] === "function" ||
		typeof TPL_OBJ[type] === "string"
	) {
		return TPL_OBJ[type](data);
	}
};
