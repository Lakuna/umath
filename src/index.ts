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
	type DualQuaternionLike,
	default as DualQuaternion
} from "./linalg/DualQuaternion.js";
export type { MatrixLike, default as Matrix } from "./linalg/Matrix.js";
export { type Matrix2Like, default as Matrix2 } from "./linalg/Matrix2.js";
export { type Matrix3Like, default as Matrix3 } from "./linalg/Matrix3.js";
export { type Matrix4Like, default as Matrix4 } from "./linalg/Matrix4.js";
export {
	type QuaternionLike,
	default as Quaternion
} from "./linalg/Quaternion.js";
export { default as SlowMatrix } from "./linalg/SlowMatrix.js";
export { default as SlowSquareMatrix } from "./linalg/SlowSquareMatrix.js";
export type { default as SquareMatrix } from "./linalg/SquareMatrix.js";
export type { VectorLike, default as Vector } from "./linalg/Vector.js";
export { type Vector2Like, default as Vector2 } from "./linalg/Vector2.js";
export { type Vector3Like, default as Vector3 } from "./linalg/Vector3.js";
export { type Vector4Like, default as Vector4 } from "./linalg/Vector4.js";

// Types
export type { default as AxisAngle } from "./types/AxisAngle.js";
export type { default as FieldOfView } from "./types/FieldOfView.js";

// Utility
export { default as BigNumber } from "./utility/BigNumber.js";
export { default as epsilon } from "./utility/epsilon.js";
export { default as MagnitudeError } from "./utility/MagnitudeError.js";
export { default as MatrixSizeError } from "./utility/MatrixSizeError.js";
export { default as PartialMatrixError } from "./utility/PartialMatrixError.js";
export { default as SingularMatrixError } from "./utility/SingularMatrixError.js";
