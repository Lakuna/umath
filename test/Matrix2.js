import {
	add,
	adjoint,
	copy,
	determinant,
	equals,
	exactEquals,
	frob,
	fromRotation,
	fromScaling,
	fromValues,
	identity,
	invert,
	multiply,
	multiplyScalar,
	multiplyScalarAndAdd,
	rotate,
	scale,
	subtract,
	transpose
} from "#Matrix2";
import epsilon from "#epsilon";
import { expect } from "chai";
import { mat2 } from "gl-matrix";
import { beforeEach, describe, it } from "mocha";

describe("Matrix2", () => {
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

	describe("#determinant", () => {
		const expected = mat2.determinant(aValues);

		let innerOut;

		beforeEach(() => {
			innerOut = determinant(a);
		});

		it("should return the correct determinant", () => {
			expect(innerOut).to.equal(expected);
		});

		it("should not modify the matrix", () => {
			expect(a).to.have.ordered.members(aValues);
		});
	});

	describe("#frob", () => {
		const expected = mat2.frob(aValues);

		let innerOut;

		beforeEach(() => {
			innerOut = frob(a);
		});

		it("should return the correct Frobenius norm", () => {
			expect(innerOut).to.equal(expected);
		});

		it("should not modify the matrix", () => {
			expect(a).to.have.ordered.members(aValues);
		});
	});

	describe("#add()", () => {
		const sum = mat2.add([], aValues, bValues);

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
		const adjugate = mat2.adjoint([], aValues);

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

	describe("#identity()", () => {
		const expected = [1, 0, 0, 1];

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
		const inverse = mat2.invert([], aValues);

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
		const product = mat2.multiply([], aValues, bValues);

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
		const product = mat2.multiplyScalar([], aValues, scalar);

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
		const sum = mat2.multiplyScalarAndAdd([], aValues, bValues, 2);

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
		const radians = Math.PI / 2;
		const expected = mat2.rotate([], aValues, radians);

		describe("with a separate output matrix", () => {
			beforeEach(() => {
				result = rotate(a, radians, out);
			});

			it("should return the correct value", () => {
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
				result = rotate(a, radians, a);
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
		const vectorValues = [2, 3];
		const product = mat2.scale([], aValues, vectorValues);

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
		const difference = mat2.subtract([], aValues, bValues);

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

	describe("#transpose()", () => {
		const expected = mat2.transpose([], aValues);

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

	describe(".fromRotation()", () => {
		const radians = Math.PI / 2;
		const expected = mat2.fromRotation([], radians);

		beforeEach(() => {
			result = fromRotation(radians, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});

	describe(".fromScaling()", () => {
		const vectorValues = [2, 3];
		const expected = mat2.fromScaling([], vectorValues);

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
