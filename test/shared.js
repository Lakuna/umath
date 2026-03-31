import { notStrictEqual, ok, strictEqual } from "node:assert/strict";

import epsilon from "../dist/utility/epsilon.js";

export const approximatelyEqual = (actual, expected, delta = epsilon) => {
	if (actual === expected) {
		return;
	}

	strictEqual(typeof actual, "number");
	strictEqual(typeof expected, "number");

	ok(Math.abs(actual - expected) < delta);
};

export const approximatelyEqualIterable = (
	actual,
	expected,
	delta = epsilon
) => {
	if (actual === expected) {
		return;
	}

	strictEqual(typeof actual, "object");
	strictEqual(typeof expected, "object");

	ok(Symbol.iterator in actual);
	ok(Symbol.iterator in expected);

	strictEqual(actual.length, expected.length);

	for (let i = 0; i < actual.length; i++) {
		approximatelyEqual(actual[i], expected[i], delta);
	}
};

export const approximatelyEqualObject = (actual, expected, delta = epsilon) => {
	if (actual === expected) {
		return;
	}

	strictEqual(typeof actual, "object");
	strictEqual(typeof expected, "object");

	if (Symbol.iterator in actual) {
		approximatelyEqualIterable(actual, expected, delta);
		return;
	}

	notStrictEqual(actual, null);
	notStrictEqual(expected, null);

	for (const [key, value] of Object.entries(actual)) {
		if (typeof value === "object" && value !== null) {
			if (Symbol.iterator in value) {
				approximatelyEqualIterable(value, expected[key], delta);
				continue;
			}

			approximatelyEqualObject(value, expected[key], delta);
			continue;
		}

		if (typeof value === "number") {
			approximatelyEqual(value, expected[key], delta);
			continue;
		}

		strictEqual(value, expected[key]);
	}
};
