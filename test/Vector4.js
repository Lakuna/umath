import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import {
	getMagnitude, getSquaredMagnitude, add, ceil, copy, cross, distance, divide, dot, equals,
	exactEquals, floor, invert, lerp, max, min, multiply, negate, normalize, random, round, scale,
	scaleAndAdd, squaredDistance, subtract, transformMatrix4, transformQuaternion, zero, fromValues
} from "@lakuna/umath/Vector4";
import { epsilon } from "@lakuna/umath";
import { vec4 } from "gl-matrix";

describe("Vector4", () => {
	const aValues = [1, 2, 3, 4];
	const bValues = [5, 6, 7, 8];

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

	describe("#magnitude", () => {
		const expected = vec4.length(aValues);

		let innerResult;

		beforeEach(() => {
			innerResult = getMagnitude(a);
		});

		it("should return the correct value", () => {
			expect(innerResult).to.equal(expected);
		});

		it("should not modify the original vector", () => {
			expect(a).to.have.ordered.members(aValues);
		});
	});

	describe("#squaredMagnitude", () => {
		const expected = vec4.squaredLength(aValues);

		let innerResult;

		beforeEach(() => {
			innerResult = getSquaredMagnitude(a);
		});

		it("should return the correct value", () => {
			expect(innerResult).to.equal(expected);
		});

		it("should not modify the original vector", () => {
			expect(a).to.have.ordered.members(aValues);
		});
	});

	describe("#add()", () => {
		const sum = vec4.add([], aValues, bValues);

		describe("with a separate output vector", () => {
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

		describe("with the augend as the output vector", () => {
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

		describe("with the addend as the output vector", () => {
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

	describe("#ceil()", () => {
		const expected = vec4.ceil([], aValues);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = ceil(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output vector", () => {
			beforeEach(() => {
				result = ceil(a, a);
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

	describe("#cross()", () => {
		const cValues = [9, 10, 11, 12];
		const product = vec4.cross([], aValues, bValues, cValues);

		let c;

		beforeEach(() => {
			c = [...cValues];
		});

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = cross(a, b, c, out);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the first vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the second vector", () => {
				expect(b).to.have.ordered.members(bValues);
			});

			it("should not modify the third vector", () => {
				expect(c).to.have.ordered.members(cValues);
			});
		});

		describe("with the first vector as the output vector", () => {
			beforeEach(() => {
				result = cross(a, b, c, a);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the second vector", () => {
				expect(b).to.have.ordered.members(bValues);
			});

			it("should not modify the third vector", () => {
				expect(c).to.have.ordered.members(cValues);
			});
		});

		describe("with the second vector as the output vector", () => {
			beforeEach(() => {
				result = cross(a, b, c, b);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(b);
			});

			it("should not modify the first vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the third vector", () => {
				expect(c).to.have.ordered.members(cValues);
			});
		});

		describe("with the third vector as the output vector", () => {
			beforeEach(() => {
				result = cross(a, b, c, c);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(c);
			});

			it("should not modify the first vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the second vector", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});
	});

	describe("#distance()", () => {
		const expected = vec4.distance(aValues, bValues);

		let innerResult;

		beforeEach(() => {
			innerResult = distance(a, b);
		});

		it("should return the correct value", () => {
			expect(innerResult).to.equal(expected);
		});

		it("should not modify the first vector", () => {
			expect(a).to.have.ordered.members(aValues);
		});

		it("should not modify the second vector", () => {
			expect(b).to.have.ordered.members(bValues);
		});
	});

	describe("#divide()", () => {
		const quotient = vec4.divide([], aValues, bValues);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = divide(a, b, out);
			});

			it("should return the correct quotient", () => {
				expect(result).to.have.ordered.members(quotient);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the dividend", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the divisor", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the dividend as the output vector", () => {
			beforeEach(() => {
				result = divide(a, b, a);
			});

			it("should return the correct quotient", () => {
				expect(result).to.have.ordered.members(quotient);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the divisor", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the divisor as the output vector", () => {
			beforeEach(() => {
				result = divide(a, b, b);
			});

			it("should return the correct quotient", () => {
				expect(result).to.have.ordered.members(quotient);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(b);
			});

			it("should not modify the dividend", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});
	});

	describe("#dot()", () => {
		const product = vec4.dot(aValues, bValues);

		let innerResult;

		beforeEach(() => {
			innerResult = dot(a, b);
		});

		it("should return the correct product", () => {
			expect(innerResult).to.equal(product);
		});

		it("should not modify the multiplicand", () => {
			expect(a).to.have.ordered.members(aValues);
		});

		it("should not modify the multiplier", () => {
			expect(b).to.have.ordered.members(bValues);
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

		it("should return true for identical vectors", () => {
			expect(equals(a, c)).to.be.true;
		});

		it("should return false for different vectors", () => {
			expect(equals(a, d)).to.be.false;
		});

		it("should return true for similar vectors", () => {
			expect(equals(a, e)).to.be.true;
		});

		it("should not modify the first vector", () => {
			equals(a, b);
			expect(a).to.have.ordered.members(aValues);
		});

		it("should not modify the second vector", () => {
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

		it("should return true for identical vectors", () => {
			expect(exactEquals(a, c)).to.be.true;
		});

		it("should return false for different vectors", () => {
			expect(exactEquals(a, d)).to.be.false;
		});

		it("should return false for similar vectors", () => {
			expect(exactEquals(a, e)).to.be.false;
		});

		it("should not modify the first vector", () => {
			exactEquals(a, b);
			expect(a).to.have.ordered.members(aValues);
		});

		it("should not modify the second vector", () => {
			exactEquals(a, b);
			expect(b).to.have.ordered.members(bValues);
		});
	});

	describe("#floor()", () => {
		const expected = vec4.floor([], aValues);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = floor(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output vector", () => {
			beforeEach(() => {
				result = floor(a, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#invert()", () => {
		const expected = vec4.inverse([], aValues);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = invert(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output vector", () => {
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
		const expected = vec4.lerp([], aValues, bValues, t);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = lerp(a, b, t, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the first vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the second vector", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the first vector as the output vector", () => {
			beforeEach(() => {
				result = lerp(a, b, t, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the second vector", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the second vector as the output vector", () => {
			beforeEach(() => {
				result = lerp(a, b, t, b);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(b);
			});

			it("should not modify the first vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});
	});

	describe("#max()", () => {
		const expected = vec4.max([], aValues, bValues);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = max(a, b, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the first vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the second vector", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the first vector as the output vector", () => {
			beforeEach(() => {
				result = max(a, b, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the second vector", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the second vector as the output vector", () => {
			beforeEach(() => {
				result = max(a, b, b);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(b);
			});

			it("should not modify the first vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});
	});

	describe("#min()", () => {
		const expected = vec4.min([], aValues, bValues);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = min(a, b, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the first vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should not modify the second vector", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the first vector as the output vector", () => {
			beforeEach(() => {
				result = min(a, b, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the second vector", () => {
				expect(b).to.have.ordered.members(bValues);
			});
		});

		describe("with the second vector as the output vector", () => {
			beforeEach(() => {
				result = min(a, b, b);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(b);
			});

			it("should not modify the first vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});
	});

	describe("#multiply()", () => {
		const product = vec4.multiply([], aValues, bValues);

		describe("with a separate output vector", () => {
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

		describe("with the multiplicand as the output vector", () => {
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

		describe("with the multiplier as the output vector", () => {
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

	describe("#negate()", () => {
		const expected = vec4.negate([], aValues);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = negate(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output vector", () => {
			beforeEach(() => {
				result = negate(a, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});
		});
	});

	describe("#normalize()", () => {
		const expected = vec4.normalize([], aValues);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = normalize(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});

			it("should return a unit vector", () => {
				expect(getMagnitude(result) - 1).to.be.within(-epsilon, epsilon);
			});
		});

		describe("with the same output vector", () => {
			beforeEach(() => {
				result = normalize(a, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should return a unit vector", () => {
				expect(getMagnitude(result) - 1).to.be.within(-epsilon, epsilon);
			});
		});
	});

	describe("#random()", () => {
		const magnitude = 1;

		beforeEach(() => {
			result = random(magnitude, out);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should have the correct magnitude", () => {
			expect(getMagnitude(result) - magnitude).to.be.within(-epsilon, epsilon);
		});
	});

	describe("#round()", () => {
		const expected = vec4.round([], aValues);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = floor(a, out);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should not modify the vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the same output vector", () => {
			beforeEach(() => {
				result = round(a, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});
		});
	});

	describe("#scale()", () => {
		const scalar = 2;
		const product = vec4.scale([], aValues, scalar);

		describe("with a separate output vector", () => {
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

		describe("with the multiplicand as the output vector", () => {
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

	describe("#scaleAndAdd()", () => {
		const scalar = 2;
		const sum = vec4.scaleAndAdd([], aValues, bValues, scalar);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = scaleAndAdd(a, b, scalar, out);
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

		describe("with the augend as the output vector", () => {
			beforeEach(() => {
				result = scaleAndAdd(a, b, scalar, a);
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

		describe("with the addend as the output vector", () => {
			beforeEach(() => {
				result = scaleAndAdd(a, b, scalar, b);
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

	describe("#squaredDistance()", () => {
		const expected = vec4.squaredDistance(aValues, bValues);

		let innerResult;

		beforeEach(() => {
			innerResult = squaredDistance(a, b);
		});

		it("should return the correct value", () => {
			expect(innerResult).to.equal(expected);
		});

		it("should not modify the first vector", () => {
			expect(a).to.have.ordered.members(aValues);
		});

		it("should not modify the second vector", () => {
			expect(b).to.have.ordered.members(bValues);
		});
	});

	describe("#subtract()", () => {
		const difference = vec4.subtract([], aValues, bValues);

		describe("with a separate output vector", () => {
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

		describe("with the minuend as the output vector", () => {
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

		describe("with the subtrahend as the output vector", () => {
			beforeEach(() => {
				result = subtract(a, b, b);
			});

			it("should return the correct difference", () => {
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

	describe("#transformMatrix4()", () => {
		const matrixValues = [
			1, 2, 3, 4,
			5, 6, 7, 8,
			9, 10, 11, 12,
			13, 14, 15, 16
		];

		const product = vec4.transformMat4([], aValues, matrixValues);

		let matrix;

		beforeEach(() => {
			matrix = [...matrixValues];
		});

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = transformMatrix4(a, matrix, out);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the multiplicand", () => {
				expect(matrix).to.have.ordered.members(matrixValues);
			});

			it("should not modify the multiplier", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the multiplier as the output vector", () => {
			beforeEach(() => {
				result = transformMatrix4(a, matrix, a);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the multiplicand", () => {
				expect(matrix).to.have.ordered.members(matrixValues);
			});
		});
	});

	describe("#transformQuaternion()", () => {
		const quaternionValues = [0, -1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const product = vec4.transformQuat([], aValues, quaternionValues);

		let quaternion;

		beforeEach(() => {
			quaternion = [...quaternionValues];
		});

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = transformQuaternion(a, quaternion, out);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(out);
			});

			it("should not modify the multiplicand", () => {
				expect(quaternion).to.have.ordered.members(quaternionValues);
			});

			it("should not modify the multiplier", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});

		describe("with the multiplier as the output vector", () => {
			beforeEach(() => {
				result = transformQuaternion(a, quaternion, a);
			});

			it("should return the correct product", () => {
				expect(result).to.have.ordered.members(product);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the multiplicand", () => {
				expect(quaternion).to.have.ordered.members(quaternionValues);
			});
		});
	});

	describe("#zero()", () => {
		const expected = [0, 0, 0, 0];

		beforeEach(() => {
			result = zero(out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".fromValues()", () => {
		const expected = [1, 2, 3, 4];

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
