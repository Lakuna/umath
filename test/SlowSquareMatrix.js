import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import SlowSquareMatrix from "@lakuna/umath/SlowSquareMatrix";
import { mat4 } from "gl-matrix";

describe("SlowSquareMatrix", () => {
	const aValues = [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[1, 2, 3, 1]
	];

	const zero = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

	const aValuesFlat = aValues.flat();

	let a;
	let result;

	beforeEach(() => {
		a = new SlowSquareMatrix(...aValues);
		result = new SlowSquareMatrix(...zero);
	});

	describe("#determinant", () => {
		const expected = mat4.determinant(aValuesFlat);

		let innerOut;

		beforeEach(() => {
			innerOut = a.determinant;
		});

		it("should return the correct determinant", () => {
			expect(innerOut).to.equal(expected);
		});

		it("should not modify the matrix", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});
	});

	describe("#adjoint()", () => {
		const adjugate = mat4.adjoint([], aValuesFlat);

		beforeEach(() => {
			result = a.adjoint();
		});

		it("should return the correct adjugate", () => {
			expect([...result]).to.have.ordered.members(adjugate);
		});

		it("should not modify the original matrix", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});
	});

	describe("#cofactor()", () => {
		// TODO: Automate based on `a`.
		const expected = [
			1, 0, 0, -1,
			0, 1, 0, -2,
			0, 0, 1, -3,
			0, 0, 0, 1
		];

		beforeEach(() => {
			result = a.cofactor();
		});

		it("should return the correct cofactor", () => {
			expect([...result]).to.have.ordered.members(expected);
		});

		it("should not modify the original matrix", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
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
			result = a.identity();
		});

		it("should return the identity", () => {
			expect([...result]).to.have.ordered.members(expected);
		});

		it("should return the original matrix", () => {
			expect(result).to.equal(a);
		});
	});

	describe("#invert()", () => {
		const inverse = mat4.invert([], aValuesFlat);

		beforeEach(() => {
			result = a.invert();
		});

		it("should return the correct inverse", () => {
			expect([...result]).to.have.ordered.members(inverse);
		});

		it("should not modify the original matrix", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});
	});

	describe("#minor()", () => {
		const row = 0;
		const col = 0;

		// TODO: Automate based on `a`, `row`, and `col`.
		const expected = 1;

		let innerResult;

		beforeEach(() => {
			innerResult = a.minor(row, col);
		});

		it("should return the correct value", () => {
			expect(innerResult).to.equal(expected);
		});

		it("should not modify the original matrix", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});
	});

	describe("#submatrix()", () => {
		const row = 0;
		const col = 0;

		// TODO: Automate based on `a`, `row`, and `col`.
		const expected = [
			1, 0, 0,
			0, 1, 0,
			2, 3, 1
		];

		let innerResult;

		beforeEach(() => {
			innerResult = a.submatrix(row, col);
		});

		it("should return the correct value", () => {
			expect([...innerResult]).to.have.ordered.members(expected);
		});

		it("should not modify the original matrix", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});
	});

	describe("#transpose()", () => {
		const expected = mat4.transpose([], aValuesFlat);

		beforeEach(() => {
			result = a.transpose();
		});

		it("should return the correct transpose", () => {
			expect([...result]).to.have.ordered.members(expected);
		});

		it("should not modify the original matrix", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});
	});
});
