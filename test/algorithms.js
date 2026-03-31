import { deepEqual, ok, strictEqual } from "node:assert/strict";
import { describe, it } from "node:test";

import combinations from "../dist/algorithms/combinations.js";
import degreesToRadians from "../dist/algorithms/degreesToRadians.js";
import factorial from "../dist/algorithms/factorial.js";
import fibonacci from "../dist/algorithms/fibonacci.js";
import greatestCommonDivisor from "../dist/algorithms/greatestCommonDivisor.js";
import hypergeometricPmf from "../dist/algorithms/hypergeometricPmf.js";
import isPrime from "../dist/algorithms/isPrime.js";
import permutations from "../dist/algorithms/permutations.js";
import primeFactorization from "../dist/algorithms/primeFactorization.js";
import radiansToDegrees from "../dist/algorithms/radiansToDegrees.js";
import summation from "../dist/algorithms/summation.js";
import { approximatelyEqual } from "./shared.js";

void describe("combinations", () => {
	void it("should return $nCr(1,1)=1$", () => {
		strictEqual(combinations(1, 1), 1);
	});

	void it("should return $nCr(2,1)=2$", () => {
		strictEqual(combinations(2, 1), 2);
	});

	void it("should return $nCr(10,5)=252$", () => {
		strictEqual(combinations(10, 5), 252);
	});

	void it("should return $nCr(10,10)=1$", () => {
		strictEqual(combinations(10, 10), 1);
	});
});

void describe("degreesToRadians", () => {
	void it("should return $0°=0rad$", () => {
		approximatelyEqual(degreesToRadians(0), 0);
	});

	void it("should return $180°=πrad$", () => {
		approximatelyEqual(degreesToRadians(180), Math.PI);
	});

	void it("should return $100°=5π/9rad$", () => {
		approximatelyEqual(degreesToRadians(100), (5 * Math.PI) / 9);
	});
});

void describe("factorial", () => {
	void it("should return $0!=1$", () => {
		strictEqual(factorial(0), 1);
	});

	void it("should return $1!=1$", () => {
		strictEqual(factorial(1), 1);
	});

	void it("should return $3!=6$", () => {
		strictEqual(factorial(3), 6);
	});

	void it("should return $10!=3628800$", () => {
		strictEqual(factorial(10), 3628800);
	});
});

void describe("fibonacci", () => {
	void it("should start with $[0,1,1,2,3,5,8,13,21,34,55,89,144,233]$", () => {
		const generator = fibonacci();

		const out = [];
		for (let i = 0; i < 14; i++) {
			out.push(generator.next().value);
		}

		deepEqual(out, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]);
	});
});

void describe("greatestCommonDivisor", () => {
	void it("should return $gcd(1,1)=1$", () => {
		strictEqual(greatestCommonDivisor(1, 1), 1);
	});

	void it("should return $gcd(10,5)=5$", () => {
		strictEqual(greatestCommonDivisor(10, 5), 5);
	});

	void it("should return $gcd(5,10)=5$", () => {
		strictEqual(greatestCommonDivisor(5, 10), 5);
	});

	void it("should return $gcd(14,21)=7$", () => {
		strictEqual(greatestCommonDivisor(14, 21), 7);
	});

	void it("should return $gcd(21,14)=7$", () => {
		strictEqual(greatestCommonDivisor(21, 14), 7);
	});
});

void describe("hypergeometricPmf", () => {
	void it("should return $px(1,1,1,1)=1$", () => {
		approximatelyEqual(hypergeometricPmf(1, 1, 1, 1), 1);
	});

	void it("should return $px(4,3,2,1)=1/2$", () => {
		approximatelyEqual(hypergeometricPmf(4, 3, 2, 1), 1 / 2);
	});

	void it("should return $px(8,4,2,1)=4/7$", () => {
		approximatelyEqual(hypergeometricPmf(8, 4, 2, 1), 4 / 7);
	});

	void it("should return $px(60,4,7,1)=163982/487635$", () => {
		approximatelyEqual(hypergeometricPmf(60, 4, 7, 1), 163982 / 487635);
	});
});

void describe("isPrime", () => {
	void it("should return `isPrime(0) = false`", () => {
		ok(!isPrime(0));
	});

	void it("should return `isPrime(1) = false`", () => {
		ok(!isPrime(1));
	});

	void it("should return `isPrime(2) = true`", () => {
		ok(isPrime(2));
	});

	void it("should return `isPrime(3) = true`", () => {
		ok(isPrime(3));
	});

	void it("should return `isPrime(4) = false`", () => {
		ok(!isPrime(4));
	});

	void it("should return `isPrime(67280421310721) = true`", () => {
		ok(isPrime(67280421310721));
	});

	void it("should return `isPrime(67280421310722) = false`", () => {
		ok(!isPrime(67280421310722));
	});
});

void describe("permutations", () => {
	void it("should return $nPr(1,1)=1$", () => {
		strictEqual(permutations(1, 1), 1);
	});

	void it("should return $nPr(2,1)=2$", () => {
		strictEqual(permutations(2, 1), 2);
	});

	void it("should return $nPr(10,5)=30240$", () => {
		strictEqual(permutations(10, 5), 30240);
	});
});

void describe("primeFactorization", () => {
	void it("should return `primeFactorization(2) = [2]`", () => {
		deepEqual(primeFactorization(2), [2]);
	});

	void it("should return `primeFactorization(10) = [2, 5]`", () => {
		deepEqual(primeFactorization(10), [2, 5]);
	});

	void it("should return `primeFactorization(100) = [2, 2, 5, 5]`", () => {
		deepEqual(primeFactorization(100), [2, 2, 5, 5]);
	});

	void it("should return `primeFactorization(256) = [2, 2, 2, 2, 2, 2, 2, 2]`", () => {
		deepEqual(primeFactorization(256), [2, 2, 2, 2, 2, 2, 2, 2]);
	});

	void it("should return `primeFactorization(499999) = [31, 127, 127]`", () => {
		deepEqual(primeFactorization(499999), [31, 127, 127]);
	});
});

void describe("radiansToDegrees", () => {
	void it("should return $0rad=0°$", () => {
		approximatelyEqual(radiansToDegrees(0), 0);
	});

	void it("should return $πrad=180°$", () => {
		approximatelyEqual(radiansToDegrees(Math.PI), 180);
	});

	void it("should return $5π/9rad=100°$", () => {
		approximatelyEqual(radiansToDegrees((5 * Math.PI) / 9), 100);
	});
});

void describe("summation", () => {
	void it("should return `summation(1, 4, (i) => i) = 10`", () => {
		strictEqual(
			summation(1, 4, (i) => i),
			10
		);
	});

	void it("should return `summation(1, 100, (i) => i) = 5050`", () => {
		strictEqual(
			summation(1, 100, (i) => i),
			5050
		);
	});

	void it("should return `summation(1, 4, (i) => i * i) = 30`", () => {
		strictEqual(
			summation(1, 4, (i) => i * i),
			30
		);
	});
});
