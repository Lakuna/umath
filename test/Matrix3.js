import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { add, adjoint, copy, equals, exactEquals, identity, invert, multiply, multiplyScalar, multiplyScalarAndAdd, rotate, scale, subtract, translate, transpose, fromMatrix4, fromQuaternion, fromRotation, fromScaling, fromTranslation, fromValues, normalFromMatrix4, projection } from "@lakuna/umath/Matrix3";
import { epsilon } from "@lakuna/umath";
import { mat3, mat4 } from "gl-matrix";

describe("Matrix3", () => {
	let a;
	let b;
	let out;
	let result;

	const aValues = [
		1, 0, 0,
		0, 1, 0,
		1, 2, 1
	];

	const bValues = [
		1, 0, 0,
		0, 1, 0,
		3, 4, 1
	];

	beforeEach(() => {
		a = [...aValues];
		b = [...bValues];

		out = [
			0, 0, 0,
			0, 0, 0,
			0, 0, 0
		];

		result = [
			0, 0, 0,
			0, 0, 0,
			0, 0, 0
		];
	});

	describe("#add()", () => {
		const sum = mat3.add([], aValues, bValues);

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
		const adjugate = mat3.adjoint([], aValues);

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

	describe("#identity()", () => {
		const expected = [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1
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
		const inverse = mat3.invert([], aValues);

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
		const product = mat3.multiply([], aValues, bValues);

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
		const product = mat3.multiplyScalar([], aValues, scalar);

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
		const sum = mat3.multiplyScalarAndAdd([], aValues, bValues, 2);

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
		const expected = mat3.rotate([], aValues, radians);

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
		const product = mat3.scale([], aValues, vectorValues);

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
		const difference = mat3.subtract([], aValues, bValues);

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
		const vectorValues = [2, 3];
		const expected = mat3.translate([], aValues, vectorValues);

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
		const expected = mat3.transpose([], aValues);

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

	describe(".fromMatrix4()", () => {
		const matrixValues = [
			1, 2, 3, 4,
			5, 6, 7, 8,
			9, 10, 11, 12,
			13, 14, 15, 16
		];

		const expected = mat3.fromMat4([], matrixValues);

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

	describe(".fromQuaternion()", () => {
		const quaternionValues = [0, -1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
		const expected = mat3.fromQuat([], quaternionValues);

		let quaternion;

		beforeEach(() => {
			quaternion = [...quaternionValues];

			result = fromQuaternion(quaternion, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});

		it("should not modify the quaternion", () => {
			expect(quaternion).to.have.ordered.members(quaternionValues);
		});
	});

	describe(".fromRotation()", () => {
		const radians = Math.PI / 2;
		const expected = mat3.fromRotation([], radians);

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
		const expected = mat3.fromScaling([], vectorValues);

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
		const vectorValues = [2, 3];
		const expected = mat3.fromTranslation([], vectorValues);

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
			1, 2, 3,
			4, 5, 6,
			7, 8, 9
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

	describe(".normalFromMatrix4()", () => {
		describe("with rotation and translation", () => {
			const rotation = [0, -1 / Math.sqrt(2), 0, 1 / Math.sqrt(2)];
			const translation = [1, 2, 3];
			const matrixValues = mat4.fromRotationTranslation([], rotation, translation);
			const expected = mat3.normalFromMat4([], matrixValues);

			let matrix;

			beforeEach(() => {
				matrix = [...matrixValues];

				result = normalFromMatrix4(matrix, out);
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

			describe("with scaling", () => {
				const scaling = [1, 2, 3];
				const innerMatrixValues = mat4.fromRotationTranslationScale([], rotation, translation, scaling);
				const innerExpected = mat3.normalFromMat4([], innerMatrixValues);

				let innerMatrix;

				beforeEach(() => {
					innerMatrix = [...innerMatrixValues];

					result = normalFromMatrix4(innerMatrix, out);
				});

				it("should return the correct value", () => {
					expect(result).to.have.ordered.members(innerExpected);
				});
		
				it("should return the `out` parameter", () => {
					expect(result).to.equal(out);
				});
	
				it("should not modify the original matrix", () => {
					expect(matrix).to.have.ordered.members(matrixValues);
				});
			});
		});
	});

	describe(".projection()", () => {
		const width = 100;
		const height = 200;
		const expected = mat3.projection([], width, height);

		beforeEach(() => {
			result = projection(width, height, out);
		});

		it("should return the correct value", () => {
			expect(result).to.have.ordered.members(expected);
		});

		it("should return the `out` parameter", () => {
			expect(result).to.equal(out);
		});
	});
});
