import SlowMatrix from "#SlowMatrix";
import epsilon from "#epsilon";
import { expect } from "chai";
import { beforeEach, describe, it } from "mocha";
import { mat4 } from "gl-matrix";

describe("SlowMatrix", () => {
	const aValues = [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[1, 2, 3, 1]
	];

	const bValues = [
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[4, 5, 6, 1]
	];

	const zero = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

	const aValuesFlat = aValues.flat();
	const bValuesFlat = bValues.flat();

	let a;
	let b;
	let result;

	beforeEach(() => {
		a = new SlowMatrix(...aValues);
		b = new SlowMatrix(...bValues);
		result = new SlowMatrix(...zero);
	});

	describe("#frob", () => {
		const expected = mat4.frob(aValuesFlat);

		let innerOut;

		beforeEach(() => {
			innerOut = a.frob;
		});

		it("should return the correct Frobenius norm", () => {
			expect(innerOut).to.equal(expected);
		});

		it("should not modify the matrix", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});
	});

	describe("#add()", () => {
		const sum = mat4.add([], aValuesFlat, bValuesFlat);

		beforeEach(() => {
			result = a.add(b);
		});

		it("should return the correct sum", () => {
			expect([...result]).to.have.ordered.members(sum);
		});

		it("should not modify the augend", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});

		it("should not modify the addend", () => {
			expect([...b]).to.have.ordered.members(bValuesFlat);
		});
	});

	describe("#copy()", () => {
		beforeEach(() => {
			result = a.copy(b);
		});

		it("should return a copy", () => {
			expect([...result]).to.have.ordered.members([...b]);
		});

		it("should return the original matrix", () => {
			expect(result).to.equal(a);
		});

		it("should not modify the second matrix", () => {
			expect([...b]).to.have.ordered.members(bValuesFlat);
		});
	});

	describe("#equals()", () => {
		let c;
		let d;
		let e;

		beforeEach(() => {
			c = new SlowMatrix(...aValues);

			d = new SlowMatrix(...aValues);
			d[0]++;

			e = new SlowMatrix(...aValues);
			e[0] += epsilon * 0.1;
		});

		it("should return true for identical matrices", () => {
			expect(a.equals(c)).to.be.true;
		});

		it("should return false for different matrices", () => {
			expect(a.equals(d)).to.be.false;
		});

		it("should return true for similar matrices", () => {
			expect(a.equals(e)).to.be.true;
		});

		it("should not modify the first matrix", () => {
			a.equals(b);
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});

		it("should not modify the second matrix", () => {
			a.equals(b);
			expect([...b]).to.have.ordered.members(bValuesFlat);
		});
	});

	describe("#exactEquals()", () => {
		let c;
		let d;
		let e;

		beforeEach(() => {
			c = new SlowMatrix(...aValues);

			d = new SlowMatrix(...aValues);
			d[0]++;

			e = new SlowMatrix(...aValues);
			e[0] += epsilon * 0.1;
		});

		it("should return true for identical matrices", () => {
			expect(a.exactEquals(c)).to.be.true;
		});

		it("should return false for different matrices", () => {
			expect(a.exactEquals(d)).to.be.false;
		});

		it("should return false for similar matrices", () => {
			expect(a.exactEquals(e)).to.be.false;
		});

		it("should not modify the first matrix", () => {
			a.exactEquals(b);
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});

		it("should not modify the second matrix", () => {
			a.exactEquals(b);
			expect([...b]).to.have.ordered.members(bValuesFlat);
		});
	});

	describe("#multiply()", () => {
		const product = mat4.multiply([], aValuesFlat, bValuesFlat);

		beforeEach(() => {
			result = a.multiply(b);
		});

		it("should return the correct product", () => {
			expect([...result]).to.have.ordered.members(product);
		});

		it("should not modify the multiplicand", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});

		it("should not modify the multiplier", () => {
			expect([...b]).to.have.ordered.members(bValuesFlat);
		});
	});

	describe("#multiplyScalar()", () => {
		const scalar = 2;
		const product = mat4.multiplyScalar([], aValuesFlat, scalar);

		beforeEach(() => {
			result = a.multiplyScalar(scalar);
		});

		it("should return the correct product", () => {
			expect([...result]).to.have.ordered.members(product);
		});

		it("should not modify the multiplicand", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});
	});

	describe("#multiplyScalarAndAdd()", () => {
		const scalar = 2;
		const sum = mat4.multiplyScalarAndAdd([], aValuesFlat, bValuesFlat, 2);

		beforeEach(() => {
			result = a.multiplyScalarAndAdd(b, scalar);
		});

		it("should return the correct sum", () => {
			expect([...result]).to.have.ordered.members(sum);
		});

		it("should not modify the augend", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});

		it("should not modify the addend", () => {
			expect([...b]).to.have.ordered.members(bValuesFlat);
		});
	});

	describe("#subtract()", () => {
		const difference = mat4.subtract([], aValuesFlat, bValuesFlat);

		beforeEach(() => {
			result = a.subtract(b);
		});

		it("should return the correct difference", () => {
			expect([...result]).to.have.ordered.members(difference);
		});

		it("should not modify the minuend", () => {
			expect([...a]).to.have.ordered.members(aValuesFlat);
		});

		it("should not modify the subtrahend", () => {
			expect([...b]).to.have.ordered.members(bValuesFlat);
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
