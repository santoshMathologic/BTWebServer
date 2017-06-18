var calc = require("../utility/customUtil");

describe("multiplication function", function () {

    it("should multiply 2 * 3", function () {
        var result = calc.multiply(2, 3);
        expect(result).toBe(6);
    });

    it("should multiply 2 * 3", function () {
        var result = calc.multiply(2, 3);
        expect(result).toBe(6);
    });

      it("should multiply 0 * 0", function () {
        var result = calc.multiply(0, 0);
        expect(result).toBe(0);
    });
});