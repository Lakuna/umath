import type SquareMatrix from "./SquareMatrix.js";

/** Numbers arranged into three columns and three rows. */
export type Matrix3Like = Matrix3 | [
	number, number, number,
	number, number, number,
	number, number, number
];

/** A three-by-three matrix. */
export default class Matrix3 extends Float32Array implements SquareMatrix { }
