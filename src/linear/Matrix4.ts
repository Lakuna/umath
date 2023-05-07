import type { SquareMatrix } from "./Matrix.js"

/** Numbers arranged into three columns and three rows. */
export type Matrix4Like = Matrix4 | [
	number, number, number, number,
	number, number, number, number,
	number, number, number, number,
	number, number, number, number
];

/** A four-by-four matrix. */
export default class Matrix4 extends Float32Array implements SquareMatrix {
	// TODO
}
