import { describe, it } from "node:test";
import { equal, ok } from "node:assert/strict";
import { getAxisAngle, setAxisAngle } from "../dist/linalg/Quaternion.js";
import epsilon from "../dist/utility/epsilon.js";
import { notEqual } from "node:assert";

const approximatelyEqual = (actual, expected, delta = epsilon) => {
	if (actual === expected) {
		return;
	}

	ok(typeof actual === "number");
	ok(typeof expected === "number");

	ok(Math.abs(actual - expected) < delta);
};

const approximatelyEqualIterable = (actual, expected, delta = epsilon) => {
	if (actual === expected) {
		return;
	}

	ok(typeof actual === "object");
	ok(typeof expected === "object");

	ok(Symbol.iterator in actual);
	ok(Symbol.iterator in expected);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	equal(actual.length, expected.length);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	for (let i = 0; i < actual.length; i++) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		approximatelyEqual(actual[i], expected[i], delta);
	}
};

const approximatelyEqualObject = (actual, expected, delta = epsilon) => {
	if (actual === expected) {
		return;
	}

	ok(typeof actual === "object");
	ok(typeof expected === "object");

	if (Symbol.iterator in actual) {
		approximatelyEqualIterable(actual, expected, delta);
		return;
	}

	notEqual(actual, null);
	notEqual(expected, null);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	for (const [key, value] of Object.entries(actual)) {
		if (typeof value === "object" && value !== null) {
			if (Symbol.iterator in value) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				approximatelyEqualIterable(value, expected[key], delta);
				continue;
			}

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			approximatelyEqualObject(value, expected[key], delta);
			continue;
		}

		if (typeof value === "number") {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			approximatelyEqual(value, expected[key], delta);
			continue;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		equal(value, expected[key]);
	}
};

void describe("getAxisAngle", () => {
	void it("should return `axis = outAxis` and `angle = outAngle`", () => {
		const axis = [0, 1, 1];
		const angle = Math.PI / 4;
		const q = setAxisAngle(axis, angle, []);
		const [outAxis, outAngle] = getAxisAngle(q, []);
		approximatelyEqualObject(axis, outAxis);
		approximatelyEqual(angle, outAngle);
	});
});
