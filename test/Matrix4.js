import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { add, adjoint, copy, equals, exactEquals, getRotation, getScaling, getTranslation,
	identity, invert, multiply, multiplyScalar, multiplyScalarAndAdd, rotate, rotateX, rotateY,
	rotateZ, scale, subtract, translate, transpose, fromDualQuaternion, fromRotation,
	fromRotationTranslation, fromRotationTranslationScale, fromRotationTranslationScaleOrigin,
	fromScaling, fromTranslation, fromValues, fromXRotation, fromYRotation, fromZRotation, frustum,
	lookAt, ortho, perspective, perspectiveFromFieldOfView, targetTo } from "@lakuna/umath/Matrix4";
import { epsilon } from "@lakuna/umath";
import { mat4 } from "gl-matrix";

describe("Matrix4", () => {
	let a;
	let b;
	let out;
	let result;

	const aValues = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		1, 2, 3, 1
	];

	const bValues = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		4, 5, 6, 1
	];

	beforeEach(() => {
		a = [...aValues];
		b = [...bValues];

		out = [
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0
		];

		result = [
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0
		];
	});

	describe("#add()", () => {
		const sum = mat4.add([], aValues, bValues);

		describe("with a separate output matrix", () => {
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

		describe("with the augend as the output matrix", () => {
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

		describe("with the addend as the output matrix", () => {
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

	describe("#adjoint()", () => {
		const adjugate = mat4.adjoint([], aValues);

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = adjoint(a, out);
			});

			it("should return the correct adjugate", () => {
				expect(result).to.have.ordered.members(adjugate);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the original matrix", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output matrix", () => {
			beforeEach(() => {
				result = adjoint(a, a);
			});

			it("should return the correct adjugate", () => {
				expect(result).to.have.ordered.members(adjugate);
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

	describe("#equals()", () =>  {
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

		it("should return true for identical matrices", () => {
			expect(equals(a, c)).to.be.true;
		});

		it("should return false for different matrices", () => {
			expect(equals(a, d)).to.be.false;
		});

		it("should return true for similar matrices", () => {
			expect(equals(a, e)).to.be.true;
		});

		it("should not modify the first matrix", () => {
			equals(a, b);
			expect(a).to.have.ordered.members(aValues);
		});

		it("should not modify the second matrix", () => {
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

		it("should return true for identical matrices", () => {
			expect(exactEquals(a, c)).to.be.true;
		});

		it("should return false for different matrices", () => {
			expect(exactEquals(a, d)).to.be.false;
		});

		it("should return false for similar matrices", () => {
			expect(exactEquals(a, e)).to.be.false;
		});

		it("should not modify the first matrix", () => {
			exactEquals(a, b);
			expect(a).to.have.ordered.members(aValues);
		});

		it("should not modify the second matrix", () => {
			exactEquals(a, b);
			expect(b).to.have.ordered.members(bValues);
		});
	});

	describe("#getRotation()", () => {
		const expected = mat4.getRotation([], aValues);

		let innerOut;
		let innerResult;

		beforeEach(() => {
			innerOut = [];

			innerResult = getRotation(a, innerOut);
		});

		it("should return the correct value", () => {
			expect(innerResult).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(innerResult).to.equal(innerOut);
		});

		it("should not modify the original matrix", () => {
			expect(a).to.have.ordered.members(aValues);
		});
	});

	describe("#getRotation()", () => {
		const expected = mat4.getScaling([], aValues);

		let innerOut;
		let innerResult;

		beforeEach(() => {
			innerOut = [];

			innerResult = getScaling(a, innerOut);
		});

		it("should return the correct value", () => {
			expect(innerResult).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(innerResult).to.equal(innerOut);
		});

		it("should not modify the original matrix", () => {
			expect(a).to.have.ordered.members(aValues);
		});
	});

	describe("#getTranslation()", () => {
		const expected = mat4.getTranslation([], aValues);

		let innerOut;
		let innerResult;

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

		it("should not modify the original matrix", () => {
			expect(a).to.have.ordered.members(aValues);
		});
	});

	describe("#identity()", () => {
		const expected = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];

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
		const inverse = mat4.invert([], aValues);

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = invert(a, out);
			});

			it("should return the correct inverse", () => {
				expect(result).to.have.ordered.members(inverse);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the original matrix", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output matrix", () => {
			beforeEach(() => {
				result = invert(a, a);
			});

			it("should return the correct inverse", () => {
				expect(result).to.have.ordered.members(inverse);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#multiply()", () => {
		const product = mat4.multiply([], aValues, bValues);

		describe("with a separate output matrix", () => {
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

		describe("with the multiplicand as the output matrix", () => {
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

		describe("with the multiplier as the output matrix", () => {
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

	describe("#multiplyScalar()", () => {
		const scalar = 2;
		const product = mat4.multiplyScalar([], aValues, scalar);

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = multiplyScalar(a, scalar, out);
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

		describe("with the multiplicand as the output matrix", () => {
			beforeEach(() => {
				result = multiplyScalar(a, scalar, a);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#multiplyScalarAndAdd()", () => {
		const scalar = 2;
		const sum = mat4.multiplyScalarAndAdd([], aValues, bValues, 2);

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = multiplyScalarAndAdd(a, b, scalar, out);
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

		describe("with the augend as the output matrix", () => {
			beforeEach(() => {
				result = multiplyScalarAndAdd(a, b, scalar, a);
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

		describe("with the addend as the output matrix", () => {
			beforeEach(() => {
				result = multiplyScalarAndAdd(a, b, scalar, b);
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

	describe("#rotate()", () => {
		const angle = Math.PI / 2;
		const axisValues = [1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const expected = mat4.rotate([], aValues, angle, axisValues);

		let axis;

		beforeEach(() => {
			axis = [...axisValues];
		});

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = rotate(a, angle, axis, out);
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
				result = rotate(a, angle, axis, a);
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

	describe("#rotateX()", () => {
		const angle = Math.PI / 2;
		const expected = mat4.rotateX([], aValues, angle);

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = rotateX(a, angle, out);
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
		});

		describe("with the same output matrix", () => {
			beforeEach(() => {
				result = rotateX(a, angle, a);
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
		const angle = Math.PI / 2;
		const expected = mat4.rotateY([], aValues, angle);

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = rotateY(a, angle, out);
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
		});

		describe("with the same output matrix", () => {
			beforeEach(() => {
				result = rotateY(a, angle, a);
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
		const angle = Math.PI / 2;
		const expected = mat4.rotateZ([], aValues, angle);

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = rotateZ(a, angle, out);
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
		});

		describe("with the same output matrix", () => {
			beforeEach(() => {
				result = rotateZ(a, angle, a);
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
		const vectorValues = [2, 3, 4];
		const product = mat4.scale([], aValues, vectorValues);

		let vector;

		beforeEach(() => {
			vector = [...vectorValues];
		});

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = scale(a, vector, out);
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
				expect(vector).to.have.ordered.members(vectorValues);
			});
		});

		describe("with the multiplicand as the output matrix", () => {
			beforeEach(() => {
				result = scale(a, vector, a);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the multiplier", () => {
				expect(vector).to.have.ordered.members(vectorValues);
			});
		});
	});

	describe("#subtract()", () => {
		const difference = mat4.subtract([], aValues, bValues);

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = subtract(a, b, out);
			});

			it("should return the correct difference", () => {
				expect(result).to.have.ordered.members(difference);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the minuend", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the subtrahend", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the minuend as the output matrix", () => {
			beforeEach(() => {
				result = subtract(a, b, a);
			});

			it("should return the correct difference", () => {
				expect(result).to.have.ordered.members(difference);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the subtrahend", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the subtrahend as the output matrix", () => {
			beforeEach(() => {
				result = subtract(a, b, b);
			});

			it("should return the correct sum", () => {
				expect(result).to.have.ordered.members(difference);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(b);
			});

			it("should not modify the minuend", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});
	});

	describe("#translate()", () => {
		const vectorValues = [2, 3, 4];
		const expected = mat4.translate([], aValues, vectorValues);

		let vector;

		beforeEach(() => {
			vector = [...vectorValues];
		});

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = translate(a, vector, out);
			});

			it("should return the correct result", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the matrix", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the vector", () => {
				expect(vector).to.have.ordered.members(vectorValues);
			});
		});

		describe("with the same output matrix", () => {
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

	describe("#transpose()", () => {
		const expected = mat4.transpose([], aValues);

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = transpose(a, out);
			});

			it("should return the correct transpose", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the original matrix", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output matrix", () => {
			beforeEach(() => {
				result = transpose(a, a);
			});

			it("should return the correct transpose", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe(".fromScaling()", () => {
		const dualQuaternionValues = [1, 2, 3, 4, 5, 6, 7, 8];
		const expected = mat4.fromQuat2([], dualQuaternionValues);

		let dualQuaternion;

		beforeEach(() => {
			dualQuaternion = [...dualQuaternionValues];

			result = fromDualQuaternion(dualQuaternion, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".fromRotation()", () => {
		const angle = Math.PI / 2;
		const axisValues = [1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const expected = mat4.fromRotation([], angle, axisValues);

		let axis;

		beforeEach(() => {
			axis = [...axisValues];

			result = fromRotation(angle, axis, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the axis", () => {
			expect(axis).to.have.ordered.members(axisValues);
		});
	});

	describe(".fromRotationTranslation()", () => {
		const rotationValues = [0, -1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const translationValues = [1, 2, 3];
		const expected = mat4.fromRotationTranslation([], rotationValues, translationValues);

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

	describe(".fromRotationTranslation()", () => {
		const rotationValues = [0, -1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const translationValues = [1, 2, 3];
		const scalingValues = [1, 2, 3];
		const expected = mat4.fromRotationTranslationScale([], rotationValues, translationValues, scalingValues);

		let rotation;
		let translation;
		let scaling;

		beforeEach(() => {
			rotation = [...rotationValues];
			translation = [...translationValues];
			scaling = [...scalingValues];

			result = fromRotationTranslationScale(rotation, translation, scaling, out);
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

		it("should not modify the scaling vector", () => {
			expect(scaling).to.have.ordered.members(scalingValues);
		});
	});

	describe(".fromRotationTranslation()", () => {
		const rotationValues = [0, -1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const translationValues = [1, 2, 3];
		const scalingValues = [1, 2, 3];
		const originValues = [1, 2, 3];
		const expected = mat4.fromRotationTranslationScaleOrigin([], rotationValues, translationValues, scalingValues, originValues);

		let rotation;
		let translation;
		let scaling;
		let origin;

		beforeEach(() => {
			rotation = [...rotationValues];
			translation = [...translationValues];
			scaling = [...scalingValues];
			origin = [...originValues];

			result = fromRotationTranslationScaleOrigin(rotation, translation, scaling, origin, out);
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

		it("should not modify the scaling vector", () => {
			expect(scaling).to.have.ordered.members(scalingValues);
		});

		it("should not modify the origin vector", () => {
			expect(origin).to.have.ordered.members(originValues);
		});
	});

	describe(".fromScaling()", () => {
		const vectorValues = [2, 3, 4];
		const expected = mat4.fromScaling([], vectorValues);

		let vector;

		beforeEach(() => {
			vector = [...vectorValues];

			result = fromScaling(vector, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".fromTranslation()", () => {
		const vectorValues = [2, 3, 4];
		const expected = mat4.fromTranslation([], vectorValues);

		let vector;

		beforeEach(() => {
			vector = [...vectorValues];

			result = fromTranslation(vector, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".fromValues()", () => {
		const expected = [
			1, 2, 3, 4,
			5, 6, 7, 8,
			9, 10, 11, 12,
			13, 14, 15, 16
		];

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

	describe(".fromXRotation()", () => {
		const angle = Math.PI / 2;
		const expected = mat4.fromXRotation([], angle);

		beforeEach(() => {
			result = fromXRotation(angle, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".fromYRotation()", () => {
		const angle = Math.PI / 2;
		const expected = mat4.fromYRotation([], angle);

		beforeEach(() => {
			result = fromYRotation(angle, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".fromZRotation()", () => {
		const angle = Math.PI / 2;
		const expected = mat4.fromZRotation([], angle);

		beforeEach(() => {
			result = fromZRotation(angle, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".frustum()", () => {
		const left = -1;
		const right = 1;
		const bottom = -1;
		const top = 1;
		const near = -1;
		const far = 1;
		const expected = mat4.frustum([], left, right, bottom, top, near, far);

		beforeEach(() => {
			result = frustum(left, right, bottom, top, near, far, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".lookAt()", () => {
		const eyeValues = [1, 0, 1];
		const centerValues = [0, 0, 0];
		const upValues = [0, 1, 0];
		const expected = mat4.lookAt([], eyeValues, centerValues, upValues);

		let eye;
		let center;
		let up;

		beforeEach(() => {
			eye = [...eyeValues];
			center = [...centerValues];
			up = [...upValues];

			result = lookAt(eye, center, up, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the eye vector", () => {
			expect(eye).to.have.ordered.members(eyeValues);
		});

		it("should not modify the center vector", () => {
			expect(center).to.have.ordered.members(centerValues);
		});

		it("should not modify the up vector", () => {
			expect(up).to.have.ordered.members(upValues);
		});
	});

	describe(".ortho()", () => {
		const left = -1;
		const right = 1;
		const bottom = -1;
		const top = 1;
		const near = -1;
		const far = 1;
		const expected = mat4.ortho([], left, right, bottom, top, near, far);

		beforeEach(() => {
			result = ortho(left, right, bottom, top, near, far, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".perspective()", () => {
		const fov = Math.PI / 2;
		const aspect = 1;
		const near = 0;
		const far = 1;
		const expected = mat4.perspective([], fov, aspect, near, far);

		beforeEach(() => {
			result = perspective(fov, aspect, near, far, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".perspectiveFromFieldOfView()", () => {
		const fovValues = {
			upDegrees: Math.PI / 2,
			downDegrees: Math.PI / 2,
			leftDegrees: Math.PI / 2,
			rightDegrees: Math.PI / 2
		};
		const near = 0;
		const far = 1;
		const expected = mat4.perspectiveFromFieldOfView([], fovValues, near, far);

		let fov;

		beforeEach(() => {
			fov = { ...fovValues };

			result = perspectiveFromFieldOfView(fov, near, far, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the field of view", () => {
			expect(fov).to.deep.equal(fovValues);
		});
	});

	describe(".targetTo()", () => {
		const eyeValues = [1, 0, 1];
		const centerValues = [0, 0, 0];
		const upValues = [0, 1, 0];
		const expected = mat4.targetTo([], eyeValues, centerValues, upValues);

		let eye;
		let center;
		let up;

		beforeEach(() => {
			eye = [...eyeValues];
			center = [...centerValues];
			up = [...upValues];

			result = targetTo(eye, center, up, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the eye vector", () => {
			expect(eye).to.have.ordered.members(eyeValues);
		});

		it("should not modify the center vector", () => {
			expect(center).to.have.ordered.members(centerValues);
		});

		it("should not modify the up vector", () => {
			expect(up).to.have.ordered.members(upValues);
		});
	});
});
