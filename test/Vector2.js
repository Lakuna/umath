import {
	add,
	angle,
	ceil,
	copy,
	cross,
	distance,
	divide,
	dot,
	equals,
	exactEquals,
	floor,
	fromValues,
	getMagnitude,
	getSquaredMagnitude,
	invert,
	lerp,
	max,
	min,
	multiply,
	negate,
	normalize,
	random,
	rotate,
	round,
	scale,
	scaleAndAdd,
	squaredDistance,
	subtract,
	transformMatrix2,
	transformMatrix3,
	transformMatrix4,
	zero
} from "#Vector2";
import epsilon from "#epsilon";
import { expect } from "chai";
import { vec2 } from "gl-matrix";
import { beforeEach, describe, it } from "mocha";

describe("Vector2", () => {
	const aValues = [1, 2];
	const bValues = [3, 4];

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
		const expected = vec2.length(aValues);

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
		const expected = vec2.squaredLength(aValues);

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
		const sum = vec2.add([], aValues, bValues);

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

	describe("#angle()", () => {
		const expected = vec2.angle(aValues, bValues);

		let innerResult;

		beforeEach(() => {
			innerResult = angle(a, b);
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

	describe("#ceil()", () => {
		const expected = vec2.ceil([], aValues);

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
		const product = vec2.cross([], aValues, bValues);

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = cross(a, b, out);
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
				result = cross(a, b, a);
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
				result = cross(a, b, b);
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

	describe("#distance()", () => {
		const expected = vec2.distance(aValues, bValues);

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
		const quotient = vec2.divide([], aValues, bValues);

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
		const product = vec2.dot(aValues, bValues);

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
		const expected = vec2.floor([], aValues);

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
		const expected = vec2.inverse([], aValues);

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
		const expected = vec2.lerp([], aValues, bValues, t);

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
		const expected = vec2.max([], aValues, bValues);

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
		const expected = vec2.min([], aValues, bValues);

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
		const product = vec2.multiply([], aValues, bValues);

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
		const expected = vec2.negate([], aValues);

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
		const expected = vec2.normalize([], aValues);

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

	describe("#rotate()", () => {
		const originValues = [1, 2];
		const radians = Math.PI / 2;
		const expected = vec2.rotate([], aValues, originValues, radians);

		let origin;

		beforeEach(() => {
			origin = [...originValues];
		});

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = rotate(a, origin, radians, out);
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

			it("should not modify the origin vector", () => {
				expect(origin).to.have.ordered.members(originValues);
			});
		});

		describe("with the original vector as the output vector", () => {
			beforeEach(() => {
				result = rotate(a, origin, radians, a);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(a);
			});

			it("should not modify the origin vector", () => {
				expect(origin).to.have.ordered.members(originValues);
			});
		});

		describe("with the origin vector as the output vector", () => {
			beforeEach(() => {
				result = rotate(a, origin, radians, origin);
			});

			it("should return the correct value", () => {
				expect(result).to.have.ordered.members(expected);
			});

			it("should return the `out` parameter", () => {
				expect(result).to.equal(origin);
			});

			it("should not modify the original vector", () => {
				expect(a).to.have.ordered.members(aValues);
			});
		});
	});

	describe("#round()", () => {
		const expected = vec2.round([], aValues);

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
		const product = vec2.scale([], aValues, scalar);

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
		const sum = vec2.scaleAndAdd([], aValues, bValues, scalar);

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
		const expected = vec2.squaredDistance(aValues, bValues);

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
		const difference = vec2.subtract([], aValues, bValues);

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

	describe("#transformMatrix2()", () => {
		const matrixValues = [1, 2, 3, 4];

		const product = vec2.transformMat2([], aValues, matrixValues);

		let matrix;

		beforeEach(() => {
			matrix = [...matrixValues];
		});

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = transformMatrix2(a, matrix, out);
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
				result = transformMatrix2(a, matrix, a);
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

	describe("#transformMatrix3()", () => {
		const matrixValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		const product = vec2.transformMat3([], aValues, matrixValues);

		let matrix;

		beforeEach(() => {
			matrix = [...matrixValues];
		});

		describe("with a separate output vector", () => {
			beforeEach(() => {
				result = transformMatrix3(a, matrix, out);
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
				result = transformMatrix3(a, matrix, a);
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

	describe("#transformMatrix4()", () => {
		const matrixValues = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
		];

		const product = vec2.transformMat4([], aValues, matrixValues);

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

	describe("#zero()", () => {
		const expected = [0, 0];

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
		const expected = [1, 2];

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
