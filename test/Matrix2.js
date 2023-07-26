import { describe, it } from "mocha";
import { expect } from "chai";
import { equals } from "@lakuna/umath/Matrix2";

describe("Matrix2", function() {
    describe("#equals()", function()  {
        it("should return true for identical matrices", function() {
            expect(equals([0, 1, 2, 3], [0, 1, 2, 3])).to.be.true;
        });

        it("should return false for different matrices", function() {
            expect(equals([0, 1, 2, 3], [1, 2, 3, 4])).to.be.false;
        });

        it("should return true for similar matrices", function() {
            expect(equals([0, 1, 2, 3], [1e-16, 1, 2, 3])).to.be.true;
        });

        it("should not modify the first matrix", function() {
            const m = [0, 1, 2, 3];
            equals(m, [0, 1, 2, 3]);
            expect(m).to.have.ordered.members([0, 1, 2, 3]);
        });

        it("should not modify the second matrix", function() {
            const m = [0, 1, 2, 3];
            equals([0, 1, 2, 3], m);
            expect(m).to.have.ordered.members([0, 1, 2, 3]);
        });
    });
});
