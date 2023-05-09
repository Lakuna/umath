import type Vector from "./Vector.js";

/** A quantity with magnitude and direction in four dimensions. */
export type Vector4Like = Vector4 | [number, number, number, number];

/** A quantity with magnitude and direction in four dimensions. */
export default class Vector4 extends Float32Array implements Vector {
	// TODO
}
