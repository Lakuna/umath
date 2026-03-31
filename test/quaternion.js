import { describe, it } from "node:test";

import { getAxisAngle, setAxisAngle } from "../dist/linalg/Quaternion.js";
import { approximatelyEqual, approximatelyEqualObject } from "./shared.js";

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
