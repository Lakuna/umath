import { describe, it } from "mocha";
import combinations from "../dist/algorithms/combinations.js";
import degreesToRadians from "../dist/algorithms/degreesToRadians.js";
import epsilon from "../dist/utility/epsilon.js";
import { expect } from "chai";
import factorial from "../dist/algorithms/factorial.js";
import fibonacci from "../dist/algorithms/fibonacci.js";
import greatestCommonDivisor from "../dist/algorithms/greatestCommonDivisor.js";
import hypergeometricPmf from "../dist/algorithms/hypergeometricPmf.js";
import isPrime from "../dist/algorithms/isPrime.js";
import permutations from "../dist/algorithms/permutations.js";
import primeFactorization from "../dist/algorithms/primeFactorization.js";
import radiansToDegrees from "../dist/algorithms/radiansToDegrees.js";
import summation from "../dist/algorithms/summation.js";

describe("combinations", () => {
	it("should return $nCr(1,1)=1$", () => {
		expect(combinations(1, 1)).to.equal(1);
	});

	it("should return $nCr(2,1)=2$", () => {
		expect(combinations(2, 1)).to.equal(2);
	});

	it("should return $nCr(10,5)=252$", () => {
		expect(combinations(10, 5)).to.equal(252);
	});

	it("should return $nCr(10,10)=1$", () => {
		expect(combinations(10, 10)).to.equal(1);
	});
});

describe("degreesToRadians", () => {
	it("should return $0°=0rad$", () => {
		expect(degreesToRadians(0)).to.be.approximately(0, epsilon);
	});

	it("should return $180°=πrad$", () => {
		expect(degreesToRadians(180)).to.be.approximately(Math.PI, epsilon);
	});

	it("should return $100°=5π/9rad$", () => {
		expect(degreesToRadians(100)).to.be.approximately(
			(5 * Math.PI) / 9,
			epsilon
		);
	});
});

describe("factorial", () => {
	it("should return $0!=1$", () => {
		expect(factorial(0)).to.equal(1);
	});

	it("should return $1!=1$", () => {
		expect(factorial(1)).to.equal(1);
	});

	it("should return $3!=6$", () => {
		expect(factorial(3)).to.equal(6);
	});

	it("should return $10!=3628800$", () => {
		expect(factorial(10)).to.equal(3628800);
	});
});

describe("fibonacci", () => {
	it("should start with $[0,1,1,2,3,5,8,13,21,34,55,89,144,233]$", () => {
		const generator = fibonacci();

		const out = [];
		for (let i = 0; i < 14; i++) {
			out.push(generator.next().value);
		}

		expect(out).to.have.ordered.members([
			0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233
		]);
	});
});

describe("greatestCommonDivisor", () => {
	it("should return $gcd(1,1)=1$", () => {
		expect(greatestCommonDivisor(1, 1)).to.equal(1);
	});

	it("should return $gcd(10,5)=5$", () => {
		expect(greatestCommonDivisor(10, 5)).to.equal(5);
	});

	it("should return $gcd(5,10)=5$", () => {
		expect(greatestCommonDivisor(5, 10)).to.equal(5);
	});

	it("should return $gcd(14,21)=7$", () => {
		expect(greatestCommonDivisor(14, 21)).to.equal(7);
	});

	it("should return $gcd(21,14)=7$", () => {
		expect(greatestCommonDivisor(21, 14)).to.equal(7);
	});
});

describe("hypergeometricPmf", () => {
	it("should return $px(1,1,1,1)=1$", () => {
		expect(hypergeometricPmf(1, 1, 1, 1)).to.be.approximately(1, epsilon);
	});

	it("should return $px(4,3,2,1)=1/2$", () => {
		expect(hypergeometricPmf(4, 3, 2, 1)).to.be.approximately(1 / 2, epsilon);
	});

	it("should return $px(8,4,2,1)=4/7$", () => {
		expect(hypergeometricPmf(8, 4, 2, 1)).to.be.approximately(4 / 7, epsilon);
	});

	it("should return $px(60,4,7,1)=163982/487635$", () => {
		expect(hypergeometricPmf(60, 4, 7, 1)).to.be.approximately(
			163982 / 487635,
			epsilon
		);
	});
});

describe("isPrime", () => {
	it("should return `isPrime(0) = false`", () => {
		expect(isPrime(0)).to.equal(false);
	});

	it("should return `isPrime(1) = false`", () => {
		expect(isPrime(1)).to.equal(false);
	});

	it("should return `isPrime(2) = true`", () => {
		expect(isPrime(2)).to.equal(true);
	});

	it("should return `isPrime(3) = true`", () => {
		expect(isPrime(3)).to.equal(true);
	});

	it("should return `isPrime(4) = false`", () => {
		expect(isPrime(4)).to.equal(false);
	});

	it("should return `isPrime(67280421310721) = true`", () => {
		expect(isPrime(67280421310721)).to.equal(true);
	});
});

describe("permutations", () => {
	it("should return $nPr(1,1)=1$", () => {
		expect(permutations(1, 1)).to.equal(1);
	});

	it("should return $nPr(2,1)=2$", () => {
		expect(permutations(2, 1)).to.equal(2);
	});

	it("should return $nPr(10,5)=30240$", () => {
		expect(permutations(10, 5)).to.equal(30240);
	});
});

describe("primeFactorization", () => {
	it("should return `primeFactorization(2) = [2]`", () => {
		expect(primeFactorization(2)).to.have.members([2]);
	});

	it("should return `primeFactorization(10) = [2, 5]`", () => {
		expect(primeFactorization(10)).to.have.members([2, 5]);
	});

	it("should return `primeFactorization(100) = [2, 2, 5, 5]`", () => {
		expect(primeFactorization(100)).to.have.members([2, 2, 5, 5]);
	});

	it("should return `primeFactorization(256) = [2, 2, 2, 2, 2, 2, 2, 2]`", () => {
		expect(primeFactorization(256)).to.have.members([2, 2, 2, 2, 2, 2, 2, 2]);
	});

	it("should return `primeFactorization(499999) = [31, 127, 127]`", () => {
		expect(primeFactorization(499999)).to.have.members([31, 127, 127]);
	});
});

describe("radiansToDegrees", () => {
	it("should return $0rad=0°$", () => {
		expect(radiansToDegrees(0)).to.be.approximately(0, epsilon);
	});

	it("should return $πrad=180°$", () => {
		expect(radiansToDegrees(Math.PI)).to.be.approximately(180, epsilon);
	});

	it("should return $5π/9rad=100°$", () => {
		expect(radiansToDegrees((5 * Math.PI) / 9)).to.be.approximately(
			100,
			epsilon
		);
	});
});

describe("summation", () => {
	it("should return `summation(1, 4, (i) => i) = 10`", () => {
		expect(summation(1, 4, (i) => i)).to.equal(10);
	});

	it("should return `summation(1, 100, (i) => i) = 5050`", () => {
		expect(summation(1, 100, (i) => i)).to.equal(5050);
	});

	it("should return `summation(1, 4, (i) => i * i) = 30`", () => {
		expect(summation(1, 4, (i) => i * i)).to.equal(30);
	});
});
