// TypeDoc-specific tag that gives a name to this module.
// eslint-disable-next-line tsdoc/syntax
/** @module . */

// Algorithms
export { default as approx } from "./algorithms/approx.js";
export { default as approxRelative } from "./algorithms/approxRelative.js";
export { default as combinations } from "./algorithms/combinations.js";
export { default as degreesToRadians } from "./algorithms/degreesToRadians.js";
export { default as factorial } from "./algorithms/factorial.js";
export { default as fibonacci } from "./algorithms/fibonacci.js";
export { default as greatestCommonDivisor } from "./algorithms/greatestCommonDivisor.js";
export { default as hypergeometricPmf } from "./algorithms/hypergeometricPmf.js";
export { default as isPrime } from "./algorithms/isPrime.js";
export { default as permutations } from "./algorithms/permutations.js";
export { default as primeFactorization } from "./algorithms/primeFactorization.js";
export { default as radiansToDegrees } from "./algorithms/radiansToDegrees.js";
export { default as summation } from "./algorithms/summation.js";

// Linear Algebra
export {
	default as DualQuaternion,
	type DualQuaternionLike
} from "./linalg/DualQuaternion.js";
export { default as Matrix2, type Matrix2Like } from "./linalg/Matrix2.js";
export { default as Matrix3, type Matrix3Like } from "./linalg/Matrix3.js";
export { default as Matrix4, type Matrix4Like } from "./linalg/Matrix4.js";
export type { default as Matrix, MatrixLike } from "./linalg/Matrix.js";
export {
	default as Quaternion,
	type QuaternionLike
} from "./linalg/Quaternion.js";
export { default as SlowMatrix } from "./linalg/SlowMatrix.js";
export { default as SlowSquareMatrix } from "./linalg/SlowSquareMatrix.js";
export { default as SlowVector } from "./linalg/SlowVector.js";
export type { default as SquareMatrix } from "./linalg/SquareMatrix.js";
export { default as Vector2, type Vector2Like } from "./linalg/Vector2.js";
export { default as Vector3, type Vector3Like } from "./linalg/Vector3.js";
export { default as Vector4, type Vector4Like } from "./linalg/Vector4.js";
export type { default as Vector, VectorLike } from "./linalg/Vector.js";

// Types
export type {
	default as AxisAngle,
	ReadonlyAxisAngle
} from "./types/AxisAngle.js";
export type { default as FieldOfView } from "./types/FieldOfView.js";

// Utility
export {
	type BigIntLike,
	default as BigNumber,
	type BigNumberLike
} from "./utility/BigNumber.js";
export { default as createAxisAngleLike } from "./utility/createAxisAngleLike.js";
export { default as epsilon } from "./utility/epsilon.js";
export { default as MagnitudeError } from "./utility/MagnitudeError.js";
export { default as MatrixSizeError } from "./utility/MatrixSizeError.js";
export { default as PartialMatrixError } from "./utility/PartialMatrixError.js";
export { default as SingularMatrixError } from "./utility/SingularMatrixError.js";
export { default as VectorSizeError } from "./utility/VectorSizeError.js";
