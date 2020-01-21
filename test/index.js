var chai = require("chai"),
  should = chai.should(),
  assert = chai.assert,
  Finance = require("../finance");

var cal = new Finance();

describe("FinanceJS", function() {
  it("should import Finance library", function() {
    assert.exists(cal);
  });

  describe("Coumpound Intrest", () => {
    it("should compute compound intrest", function() {
      // rate, compoundings per period, principal , and number of periods
      cal.CompoundIntrest(1500, 4.3, 6, 4).should.equal(1938.84);
    });

    it("should compute Quaterly compounded intrest", function() {
      // rate, compoundings per period, principal , and number of periods
      // 1000 compunded quaterly with 10% annualy rate for 5 Years
      cal.CompoundIntrest(1000, 10 / 4, 5 * 4, 1).should.equal(1638.62);
    });

    it("should compoute montly compunded intrest", () => {
      //  All the arguments should be in same units
      //  e.g. Montly compunded annully 10% for 5yrs  => rate 10/12, compundingFrequence 1, tenure  5*12
      cal.CompoundIntrest(1000, 10 / 12, 5 * 12, 1).should.equal(1645.31);
    });

    it("should compoute weekly compunded intrest", () => {
      //  All the arguments should be in same units
      //  e.g. Weekly compunded annully 10% for 5yrs  => rate 10/52, compundingFrequence 1, tenure  (5*25)
      cal.CompoundIntrest(1000, 10 / 52, 5 * 52, 1).should.equal(1647.93);
    });
    it("should compoute daily compunded intrest", () => {
      //  All the arguments should be in same units
      //  e.g. Daily compunded annully 10% for 5yrs  => rate 10/365, compundingFrequence 1, tenure  (5*365)
      cal.CompoundIntrest(1000, 10 / 365, 5 * 365, 1).should.equal(1648.61);
    });
  });

  describe("Compound Intrest Rate", () => {
    it("should compute compound intrest rate for given future value", () => {
      // 1000 compunded quaterly with 10% annualy rate for 5 Years
      cal.CompoundIntrestRate(1000, 1638.62, 5 * 4, 1).should.equal(10 / 4);
    });
    it("should compute compounding rate for daily compunded given futer value", () => {
      var rate = 10 / 365;
      var expectedRate = Math.round(rate * 100) / 100; /// Rounded to 2 digits intrest rate
      cal
        .CompoundIntrestRate(1000, 1648.61, 5 * 365, 1)
        .should.equal(expectedRate);
    });
  });

  describe("Compound Intrest Principal", () => {
    it("should compute principal amout for compounded future value", () => {
      // 1000 with 12% annually compounded yearly
      cal.CompoundIntrestPrincipal(1762.34, 12, 5, 1).should.equal(1000);
    });

    it("should compute principal amount for quaterly compounded future value", () => {
      // 1000 with 12% annually compounded quaterly (4 Months)
      cal
        .CompoundIntrestPrincipal(1806.11, 12 / 4, 5 * 4, 1)
        .should.equal(1000);
    });
  });

  describe("Compound Intrest Tenure", () => {
    it("should compute tenure of compounded future value", () => {
      cal.CompoundIntrestTenure(1000, 1806.11, 12 / 4, 1).should.equal(5 * 4);
    });

    it("should compute tenure of compounded future value", () => {
      // how many days it would take to 1000 principal become 1648.61
      // with 10% annul rate compounded daily
      // => 5*365 Days
      cal
        .CompoundIntrestTenure(1000, 1648.61, 10 / 365, 1)
        .should.equal(5 * 365);
    });
  });

  describe("Simple Intrest", () => {
    it("should compute simple intrest", () => {
      cal.SimpleIntrest(1000, 10, 5).should.equal(1500);
    });
    it("should compute simple intrest for tenure in monts", () => {
      cal.SimpleIntrest(1000, 10 / 12, 5 * 12).should.equal(1500);
    });
    it("should compute simple intrest for tenure in days", () => {
      cal.SimpleIntrest(1000, 10 / 365, 5 * 365).should.equal(1500);
    });
  });
});
