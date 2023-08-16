import {
	add,
	conjugate,
	copy,
	equals,
	exactEquals,
	fromMatrix4,
	fromRotation,
	fromRotationTranslation,
	fromTranslation,
	fromValues,
	getDual,
	getTranslation,
	identity,
	invert,
	lerp,
	multiply,
	normalize,
	rotateAroundAxis,
	rotateByQuaternionAppend,
	rotateByQuaternionPrepend,
	rotateX,
	rotateY,
	rotateZ,
	scale,
	setDual,
	translate
} from "#DualQuaternion";
import { getMagnitude } from "#Vector4";
import epsilon from "#epsilon";
import { expect } from "chai";
import { quat2 } from "gl-matrix";
import { beforeEach, describe, it } from "mocha";

describe("DualQuaternion", () => {
	const aValues = [1, 2, 3, 4, 2, 5, 6, -2];
	const bValues = [5, 6, 7, 8, 9, 8, 6, -4];

	let a;
	let b;
	let out;
	let result;

	beforeEach(() => {
		a = [...aValues];
		b = [...bValues];
		out = [];
		result = [];
	});

	describe("#add()", () => {
		const sum = quat2.add([], aValues, bValues);

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = add(a, b, out);
			});

			it("should return the correct sum", () => {
				expect(result).to.have.ordered.members(sum);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the augend", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the addend", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the augend as the output dual quaternion", () => {
			beforeEach(() => {
				result = add(a, b, a);
			});

			it("should return the correct sum", () => {
				expect(result).to.have.ordered.members(sum);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the addend", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the addend as the output dual quaternion", () => {
			beforeEach(() => {
				result = add(a, b, b);
			});

			it("should return the correct sum", () => {
				expect(result).to.have.ordered.members(sum);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(b);
			});

			it("should not modify the augend", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});
	});

	describe("#conjugate()", () => {
		const expected = quat2.conjugate([], aValues);

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = conjugate(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the dual quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output dual quaternion", () => {
			beforeEach(() => {
				result = conjugate(a, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#copy()", () => {
		beforeEach(() => {
			result = copy(a, out);
		});

		it("should return a copy", () => {
			expect(result).to.have.ordered.members(aValues);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the original matrix", () => {
			expect(a).to.have.ordered.members(aValues);
		});
	});

	describe("#equals()", () => {
		let c;
		let d;
		let e;

		beforeEach(() => {
			c = [...aValues];

			d = [...aValues];
			d[0]++;

			e = [...aValues];
			e[0] += epsilon * 0.1;
		});

		it("should return true for identical dual quaternions", () => {
			expect(equals(a, c)).to.be.true;
		});

		it("should return false for different dual quaternions", () => {
			expect(equals(a, d)).to.be.false;
		});

		it("should return true for similar dual quaternions", () => {
			expect(equals(a, e)).to.be.true;
		});

		it("should not modify the first dual quaternion", () => {
			equals(a, b);
			expect(a).to.have.ordered.members(aValues);
		});

		it("should not modify the second dual quaternion", () => {
			equals(a, b);
			expect(b).to.have.ordered.members(bValues);
		});
	});

	describe("#exactEquals()", () => {
		let c;
		let d;
		let e;

		beforeEach(() => {
			c = [...aValues];

			d = [...aValues];
			d[0]++;

			e = [...aValues];
			e[0] += epsilon * 0.1;
		});

		it("should return true for identical dual quaternions", () => {
			expect(exactEquals(a, c)).to.be.true;
		});

		it("should return false for different dual quaternions", () => {
			expect(exactEquals(a, d)).to.be.false;
		});

		it("should return false for similar dual quaternions", () => {
			expect(exactEquals(a, e)).to.be.false;
		});

		it("should not modify the first dual quaternion", () => {
			exactEquals(a, b);
			expect(a).to.have.ordered.members(aValues);
		});

		it("should not modify the second dual quaternion", () => {
			exactEquals(a, b);
			expect(b).to.have.ordered.members(bValues);
		});
	});

	describe("#getDual()", () => {
		const expected = quat2.getDual([], aValues);

		let innerResult;
		let innerOut;

		beforeEach(() => {
			innerOut = [];

			innerResult = getDual(a, innerOut);
		});

		it("should return the correct value", () => {
			expect(innerResult).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(innerResult).to.equal(innerOut);
		});

		it("should not modify the original dual quaternion", () => {
			expect(a).to.have.ordered.members(aValues);
		});
	});

	describe("#getTranslation()", () => {
		const expected = quat2.getTranslation([], aValues);

		let innerResult;
		let innerOut;

		beforeEach(() => {
			innerOut = [];

			innerResult = getTranslation(a, innerOut);
		});

		it("should return the correct value", () => {
			expect(innerResult).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(innerResult).to.equal(innerOut);
		});

		it("should not modify the original dual quaternion", () => {
			expect(a).to.have.ordered.members(aValues);
		});
	});

	describe("#identity()", () => {
		const expected = [0, 0, 0, 1, 0, 0, 0, 0];

		beforeEach(() => {
			result = identity(out);
		});

		it("should return the identity", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe("#invert()", () => {
		const expected = quat2.invert([], aValues);

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = invert(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the dual quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output dual quaternion", () => {
			beforeEach(() => {
				result = invert(a, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#lerp()", () => {
		const t = 0.5;
		const expected = quat2.lerp([], aValues, bValues, t);

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = lerp(a, b, t, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the first dual quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the second dual quaternion", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the first dual quaternion as the output dual quaternion", () => {
			beforeEach(() => {
				result = lerp(a, b, t, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the second dual quaternion", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the second dual quaternion as the output dual quaternion", () => {
			beforeEach(() => {
				result = lerp(a, b, t, b);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(b);
			});

			it("should not modify the first dual quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});
	});

	describe("#multiply()", () => {
		const product = quat2.multiply([], aValues, bValues);

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = multiply(a, b, out);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the multiplicand", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the multiplier", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the multiplicand as the output dual quaternion", () => {
			beforeEach(() => {
				result = multiply(a, b, a);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the multiplier", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the multiplier as the output dual quaternion", () => {
			beforeEach(() => {
				result = multiply(a, b, b);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(b);
			});

			it("should not modify the multiplicand", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});
	});

	describe("#normalize()", () => {
		const expected = quat2.normalize([], aValues);

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = normalize(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the dual quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should return a unit dual quaternion", () => {
				expect(getMagnitude(result) - 1).to.be.within(-epsilon, epsilon);
			});
		});

		describe("with the same output dual quaternion", () => {
			beforeEach(() => {
				result = normalize(a, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should return a unit dual quaternion", () => {
				expect(getMagnitude(result) - 1).to.be.within(-epsilon, epsilon);
			});
		});
	});

	describe("#rotateAroundAxis()", () => {
		const angle = Math.PI / 2;
		const axisValues = [1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const expected = quat2.rotateAroundAxis([], aValues, axisValues, angle);

		let axis;

		beforeEach(() => {
			axis = [...axisValues];
		});

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = rotateAroundAxis(a, axis, angle, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the matrix", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the axis", () => {
				expect(axis).to.have.ordered.members(axisValues);
			});
		});

		describe("with the same output matrix", () => {
			beforeEach(() => {
				result = rotateAroundAxis(a, axis, angle, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the axis", () => {
				expect(axis).to.have.ordered.members(axisValues);
			});
		});
	});

	describe("#rotateByQuaternionAppend()", () => {
		const quaternionValues = [0, -1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const expected = quat2.rotateByQuatAppend([], aValues, quaternionValues);

		let quaternion;

		beforeEach(() => {
			quaternion = [...quaternionValues];
		});

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = rotateByQuaternionAppend(a, quaternion, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the dual quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the quaternion", () => {
				expect(quaternion).to.have.ordered.members(quaternionValues);
			});
		});

		describe("with the same output dual quaternion", () => {
			beforeEach(() => {
				result = rotateByQuaternionAppend(a, quaternion, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the quaternion", () => {
				expect(quaternion).to.have.ordered.members(quaternionValues);
			});
		});
	});

	describe("#rotateByQuaternionPrepend()", () => {
		const quaternionValues = [0, -1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const expected = quat2.rotateByQuatPrepend([], quaternionValues, aValues);

		let quaternion;

		beforeEach(() => {
			quaternion = [...quaternionValues];
		});

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = rotateByQuaternionPrepend(quaternion, a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the dual quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the quaternion", () => {
				expect(quaternion).to.have.ordered.members(quaternionValues);
			});
		});

		describe("with the same output dual quaternion", () => {
			beforeEach(() => {
				result = rotateByQuaternionPrepend(quaternion, a, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the quaternion", () => {
				expect(quaternion).to.have.ordered.members(quaternionValues);
			});
		});
	});

	describe("#rotateX()", () => {
		const radians = Math.PI / 2;
		const expected = quat2.rotateX([], aValues, radians);

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = rotateX(a, radians, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the dual quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output dual quaternion", () => {
			beforeEach(() => {
				result = rotateX(a, radians, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#rotateY()", () => {
		const radians = Math.PI / 2;
		const expected = quat2.rotateY([], aValues, radians);

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = rotateY(a, radians, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the dual quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output dual quaternion", () => {
			beforeEach(() => {
				result = rotateY(a, radians, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#rotateZ()", () => {
		const radians = Math.PI / 2;
		const expected = quat2.rotateZ([], aValues, radians);

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = rotateZ(a, radians, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the dual quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output dual quaternion", () => {
			beforeEach(() => {
				result = rotateZ(a, radians, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#scale()", () => {
		const scalar = 2;
		const product = quat2.scale([], aValues, scalar);

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = scale(a, scalar, out);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the multiplicand", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the multiplicand as the output dual quaternion", () => {
			beforeEach(() => {
				result = scale(a, scalar, a);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#setDual()", () => {
		const dualValues = [1, 2, 3, 4];
		const expected = quat2.setDual([], dualValues);

		let dual;

		beforeEach(() => {
			dual = [...dualValues];

			result = setDual(dual, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the dual quaternion", () => {
			expect(dual).to.have.ordered.members(dualValues);
		});
	});

	describe("#translate()", () => {
		const vectorValues = [2, 3, 4];
		const expected = quat2.translate([], aValues, vectorValues);

		let vector;

		beforeEach(() => {
			vector = [...vectorValues];
		});

		describe("with a separate output dual quaternion", () => {
			beforeEach(() => {
				result = translate(a, vector, out);
			});

			it("should return the correct result", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the dual quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the vector", () => {
				expect(vector).to.have.ordered.members(vectorValues);
			});
		});

		describe("with the same output dual quaternion", () => {
			beforeEach(() => {
				result = translate(a, vector, a);
			});

			it("should return the correct result", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the vector", () => {
				expect(vector).to.have.ordered.members(vectorValues);
			});
		});
	});

	describe(".fromMatrix4()", () => {
		const matrixValues = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
		];

		const expected = quat2.fromMat4([], matrixValues);

		let matrix;

		beforeEach(() => {
			matrix = [...matrixValues];

			result = fromMatrix4(matrix, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the original matrix", () => {
			expect(matrix).to.have.ordered.members(matrixValues);
		});
	});

	describe(".fromRotation()", () => {
		const rotationValues = [0, -1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const expected = quat2.fromRotation([], rotationValues);

		let rotation;

		beforeEach(() => {
			rotation = [...rotationValues];

			result = fromRotation(rotation, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the rotation quaternion", () => {
			expect(rotation).to.have.ordered.members(rotationValues);
		});
	});

	describe(".fromRotationTranslation()", () => {
		const rotationValues = [0, -1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const translationValues = [1, 2, 3];
		const expected = quat2.fromRotationTranslation(
			[],
			rotationValues,
			translationValues
		);

		let rotation;
		let translation;

		beforeEach(() => {
			rotation = [...rotationValues];
			translation = [...translationValues];

			result = fromRotationTranslation(rotation, translation, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the rotation quaternion", () => {
			expect(rotation).to.have.ordered.members(rotationValues);
		});

		it("should not modify the translation vector", () => {
			expect(translation).to.have.ordered.members(translationValues);
		});
	});

	describe(".fromTranslation()", () => {
		const translationValues = [2, 3, 4];
		const expected = quat2.fromTranslation([], translationValues);

		let translation;

		beforeEach(() => {
			translation = [...translationValues];

			result = fromTranslation(translation, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".fromValues()", () => {
		const expected = [1, 2, 3, 4, 5, 6, 7, 8];

		beforeEach(() => {
			result = fromValues(...expected, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});
});
