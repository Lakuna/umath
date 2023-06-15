import type SquareMatrix from "./SquareMatrix.js";

/** Numbers arranged into four columns and four rows. */
export type Matrix4Like = Matrix4 | [
	number, number, number, number,
	number, number, number, number,
	number, number, number, number,
	number, number, number, number
];

/** A four-by-four matrix. */
export default class Matrix4 extends Float32Array implements SquareMatrix { }
