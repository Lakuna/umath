import type AxisAngle from "@lakuna/umath/AxisAngle";
import { epsilon } from "../index.js";

/** A complex number that is commonly used to describe rotations. */
export type QuaternionLike = Quaternion | [number, number, number, number];

/**
 * A complex number that is commonly used to describe rotations.
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Quaternion)
 */
export default class Quaternion extends Float32Array {
    /** Creates an identity quaternion. */
    public constructor() {
        super(4);
        this[3] = 1;
    }

    /**
     * Sets this quaternion to the identity.
     * @returns This quaternion.
     */
    public identity(): this {
        this[0] = 0;
        this[1] = 0;
        this[2] = 0;
        this[3] = 1;
        return this;
    }

    /** The axis and angle that represent this quaternion. */
    public get axisAngle(): AxisAngle {
        const r: number = Math.acos(this[3] as number) * 2;
        const s: number = Math.sin(r / 2);

        return {
            axis: s > epsilon
                ? [(this[0] as number) / s, (this[1] as number) / s, (this[2] as number) / s]
                : [1, 0, 0],
            angle: r
        };
    }

    /** The axis and angle that represent this quaternion. */
    public set axisAngle(value: AxisAngle) {
        const r: number = value.angle * 0.5;
        const s: number = Math.sin(r);

        this[0] = s * value.axis[0];
        this[1] = s * value.axis[1];
        this[2] = s * value.axis[2];
        this[3] = Math.cos(r);
    }

    // TODO: `getAngle`.

    // TODO: `multiply`.

    // TODO: `rotateX`.

    // TODO: `rotateY`.

    // TODO: `rotateZ`.

    // TODO: `calculateW`.

    // TODO: `exp`.

    // TODO: `ln`.

    // TODO: `pow`.

    // TODO: `slerp`.

    // TODO: `random`.

    // TODO: `invert`.

    // TODO: `conjugate`.

    // TODO: `fromMatrix3`.

    // TODO: `fromEuler`.

    // TODO: `clone`.

    // TODO: `fromValues`.

    // TODO: `copy`.

    // TODO: `add`.

    // TODO: `multiply`.

    // TODO: `scale`.

    // TODO: `dot`.

    // TODO: `lerp`.

    // TODO: `get magnitude`.

    // TODO: `get squaredMagnitude`.

    // TODO: `normalize`.

    // TODO: `exactEquals`.

    // TODO: `equals`.

    // TODO: `rotationTo`.

    // TODO: `sqlerp`.

    // TODO: `setAxes`.
}
