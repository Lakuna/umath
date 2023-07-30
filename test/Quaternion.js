import {
	calculateW, conjugate, exp, fromAxes, fromEuler, fromMatrix3, getAngle, getAxisAngle, identity,
	invert, ln, multiply, pow, random, rotateX, rotateY, rotateZ, setAxisAngle, slerp, sqlerp
} from "#linalg/Quaternion";
import { expect } from "chai";
import { quat } from "gl-matrix";
import { beforeEach, describe, it } from "mocha";

describe("Quaternion", () => {
	const aValues = [0, -1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
	const bValues = [0, 0, 0, 1];

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

	describe("#calculateW()", () => {
		const expected = quat.calculateW([], aValues);

		describe("with a separate output quaternion", () => {
			beforeEach(() => {
				result = calculateW(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output quaternion", () => {
			beforeEach(() => {
				result = calculateW(a, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#conjugate()", () => {
		const expected = quat.conjugate([], aValues);

		describe("with a separate output quaternion", () => {
			beforeEach(() => {
				result = conjugate(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output quaternion", () => {
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

	describe("#exp()", () => {
		const expected = quat.exp([], aValues);

		describe("with a separate output quaternion", () => {
			beforeEach(() => {
				result = exp(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output quaternion", () => {
			beforeEach(() => {
				result = exp(a, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#getAngle()", () => {
		const expected = quat.getAngle(aValues, bValues);

		let innerResult;

		beforeEach(() => {
			innerResult = getAngle(a, b);
		});

		it("should return the correct value", () => {
			expect(innerResult).to.equal(expected);
		});

		it("should not modify the first quaternion", () => {
			expect(a).to.have.ordered.members(aValues);
		});

		it("should not modify the second quaternion", () => {
			expect(b).to.have.ordered.members(bValues);
		});
	});

	describe("#getAxisAngle()", () => {
		const expectedAxis = [];
		const expectedAngle = quat.getAxisAngle(expectedAxis, aValues);

		let innerResult;
		let innerOut;

		beforeEach(() => {
			innerOut = {};
			innerResult = getAxisAngle(a, innerOut);
		});

		it("should return the correct value", () => {
			expect(innerResult).to.deep.equal({ axis: expectedAxis, angle: expectedAngle });
		});

		it("should return the `out` parameter", () => {
			expect(innerResult).to.equal(innerOut);
		});

		it("should not modify the quaternion", () => {
			expect(a).to.have.ordered.members(aValues);
		});

		it("should not modify the axis angle", () => {
			expect(b).to.have.ordered.members(bValues);
		});
	});

	describe("#identity()", () => {
		const expected = [0, 0, 0, 1];

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
		const expected = quat.invert([], aValues);

		describe("with a separate output quaternion", () => {
			beforeEach(() => {
				result = invert(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output quaternion", () => {
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

	describe("#ln()", () => {
		const expected = quat.ln([], aValues);

		describe("with a separate output quaternion", () => {
			beforeEach(() => {
				result = ln(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output quaternion", () => {
			beforeEach(() => {
				result = ln(a, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#multiply()", () => {
		const product = quat.multiply([], aValues, bValues);

		describe("with a separate output quaternion", () => {
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

		describe("with the multiplicand as the output quaternion", () => {
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

		describe("with the multiplier as the output quaternion", () => {
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

	describe("#pow()", () => {
		const scalar = 2;
		const expected = quat.pow([], aValues, scalar);

		describe("with a separate output quaternion", () => {
			beforeEach(() => {
				result = pow(a, scalar, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output quaternion", () => {
			beforeEach(() => {
				result = pow(a, scalar, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#random()", () => {
		beforeEach(() => {
			result = random(out);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe("#rotateX()", () => {
		const radians = Math.PI / 2;
		const expected = quat.rotateX([], aValues, radians);

		describe("with a separate output quaternion", () => {
			beforeEach(() => {
				result = rotateX(a, radians, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output quaternion", () => {
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
		const expected = quat.rotateY([], aValues, radians);

		describe("with a separate output quaternion", () => {
			beforeEach(() => {
				result = rotateY(a, radians, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output quaternion", () => {
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
		const expected = quat.rotateZ([], aValues, radians);

		describe("with a separate output quaternion", () => {
			beforeEach(() => {
				result = rotateZ(a, radians, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output quaternion", () => {
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

	describe("#setAxisAngle()", () => {
		const axisAngleValues = { axis: Math.PI / 2, angle: [1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)] }
		const expected = quat.setAxisAngle([], axisAngleValues.axis, axisAngleValues.angle);

		let axisAngle;

		beforeEach(() => {
			axisAngle = { ...axisAngleValues };

			result = setAxisAngle(axisAngle, out);
		});

		it("should return the correct value", () => {
			expect(result).to.deep.equal(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the axis angle", () => {
			expect(axisAngle).to.deep.equal(axisAngleValues);
		});
	});

	describe("#slerp()", () => {
		const t = 0.5;
		const expected = quat.slerp([], aValues, bValues, t);

		describe("with a separate output quaternion", () => {
			beforeEach(() => {
				result = slerp(a, b, t, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the first quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the second quaternion", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the first quaternion as the output quaternion", () => {
			beforeEach(() => {
				result = slerp(a, b, t, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the second quaternion", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the second quaternion as the output quaternion", () => {
			beforeEach(() => {
				result = slerp(a, b, t, b);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(b);
			});

			it("should not modify the first quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});
	});

	describe("#sqlerp()", () => {
		const cValues = [0, 1, 0, 1];
		const dValues = [0, 0, 1, 1];
		const t = 0.5;
		const expected = quat.sqlerp([], aValues, bValues, cValues, dValues, t);

		let c;
		let d;

		beforeEach(() => {
			c = [...cValues];
			d = [...dValues];
		});

		describe("with a separate output quaternion", () => {
			beforeEach(() => {
				result = sqlerp(a, b, c, d, t, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the first quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the second quaternion", () => {
				expect(b).to.have.ordered.members(bValues);
			});

			it("should not modify the third quaternion", () => {
				expect(c).to.have.ordered.members(cValues);
			});

			it("should not modify the fourth quaternion", () => {
				expect(d).to.have.ordered.members(dValues);
			});
		});

		describe("with the first quaternion as the output quaternion", () => {
			beforeEach(() => {
				result = sqlerp(a, b, c, d, t, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the second quaternion", () => {
				expect(b).to.have.ordered.members(bValues);
			});

			it("should not modify the third quaternion", () => {
				expect(c).to.have.ordered.members(cValues);
			});

			it("should not modify the fourth quaternion", () => {
				expect(d).to.have.ordered.members(dValues);
			});
		});

		describe("with the second quaternion as the output quaternion", () => {
			beforeEach(() => {
				result = sqlerp(a, b, c, d, t, b);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(b);
			});

			it("should not modify the first quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the third quaternion", () => {
				expect(c).to.have.ordered.members(cValues);
			});

			it("should not modify the fourth quaternion", () => {
				expect(d).to.have.ordered.members(dValues);
			});
		});

		describe("with the third quaternion as the output quaternion", () => {
			beforeEach(() => {
				result = sqlerp(a, b, c, d, t, c);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(c);
			});

			it("should not modify the first quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the second quaternion", () => {
				expect(b).to.have.ordered.members(bValues);
			});

			it("should not modify the fourth quaternion", () => {
				expect(d).to.have.ordered.members(dValues);
			});
		});

		describe("with the fourth quaternion as the output quaternion", () => {
			beforeEach(() => {
				result = sqlerp(a, b, c, d, t, d);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(d);
			});

			it("should not modify the first quaternion", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the second quaternion", () => {
				expect(b).to.have.ordered.members(bValues);
			});

			it("should not modify the third quaternion", () => {
				expect(c).to.have.ordered.members(cValues);
			});
		});
	});

	describe(".fromAxes()", () => {
		const viewValues = [0, 0, 1];
		const rightValues = [-1, 0, 0];
		const upValues = [0, 1, 0];
		const expected = quat.setAxes([], viewValues, rightValues, upValues);

		let view;
		let right;
		let up;

		beforeEach(() => {
			view = [...viewValues];
			right = [...rightValues];
			up = [...upValues];

			result = fromAxes(view, right, up, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the view quaternion", () => {
			expect(view).to.have.ordered.members(viewValues);
		});

		it("should not modify the right quaternion", () => {
			expect(right).to.have.ordered.members(rightValues);
		});

		it("should not modify the up quaternion", () => {
			expect(up).to.have.ordered.members(upValues);
		});
	});

	describe(".fromAxes()", () => {
		const x = -30;
		const y = 30;
		const z = 30;
		const expected = quat.fromEuler([], x, y, z);

		beforeEach(() => {
			result = fromEuler(x, y, z, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".fromMatrix3()", () => {
		const matrixValues = [
			1, 2, 3,
			4, 5, 6,
			7, 8, 9
		]

		const expected = quat.fromMat3([], matrixValues);

		let matrix;

		beforeEach(() => {
			matrix = [...matrixValues];

			result = fromMatrix3(matrix, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the matrix", () => {
			expect(matrix).to.have.ordered.members(matrixValues);
		});
	});
});
