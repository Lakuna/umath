import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import { add, adjoint, copy, equals, exactEquals, subtract } from "@lakuna/umath/Matrix2";
import { epsilon } from "@lakuna/umath";
import { mat2 } from "gl-matrix";

describe("Matrix2", () => {
    let a;
    let b;
    let out;
    let result;

    const aValues = [
        0, 1,
        2, 3
    ];

    const bValues = [
        4, 5,
        6, 7
    ];

    beforeEach(() => {
        a = [...aValues];
        b = [...bValues];

        out = [
            0, 0,
            0, 0
        ];

        result = [
            0, 0,
            0, 0
        ];
    });

    describe("#add()", () => {
        const sum = mat2.add([], aValues, bValues);

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
        const adjugate = mat2.adjoint([], aValues);

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
        // TODO
    });

    describe("#invert()", () => {
        // TODO
    });

    describe("#multiply()", () => {
        // TODO
    });

    describe("#multiplyScalar()", () => {
        // TODO
    });

    describe("#multiplyScalarAndAdd()", () => {
        // TODO
    });

    describe("#rotate()", () => {
        // TODO
    });

    describe("#scale()", () => {
        // TODO
    });

    describe("#subtract()", () => {
        const difference = mat2.subtract([], aValues, bValues);

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

    describe("#transpose()", () => {
        // TODO
    });

    describe(".fromRotation()", () => {
        // TODO
    });

    describe(".fromScaling()", () => {
        // TODO
    });

    describe(".fromValues()", () => {
        // TODO
    });
});
