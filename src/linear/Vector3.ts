import type Vector from "./Vector.js";

/** A quantity with magnitude and direction in three dimensions. */
export type Vector3Like = Vector3 | [number, number, number];

/** A quantity with magnitude and direction in three dimensions. */
export default class Vector3 extends Float32Array implements Vector { }
