import { describe, it } from "node:test";
import { equal, ok } from "node:assert/strict";
import { getAxisAngle, setAxisAngle } from "../dist/linalg/Quaternion.js";
import epsilon from "../dist/utility/epsilon.js";
import { notEqual } from "node:assert";

const approximatelyEqual = (actual, expected, delta = epsilon) => {
	ok(typeof actual === "number");
	ok(typeof expected === "number");
	ok(Math.abs(actual - expected) < delta);
};

const approximatelyEqualIterable = (actual, expected, delta = epsilon) => {
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
	ok(typeof actual === "object");
	ok(typeof expected === "object");

	if (actual === expected) {
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
	void it("should return `inn = out", () => {
		const inn = { angle: Math.PI / 4, axis: [0, 1, 1] };
		const q = setAxisAngle(inn, []);
		const out = getAxisAngle(q, { angle: 0, axis: [] });
		approximatelyEqualObject(inn, out);
	});
});
