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

  describe("Compound Instrest with SIP (Systematically Investment Plan)", () => {
    it("should compute compound intrest with investment each interval period", () => {
      var futureValue = cal.CompoundIntrestWithSIP(
        1000,
        5 * 12,
        12 / 12,
        12,
        100,
        1
      );

      futureValue.should.within(9881, 9882);
    });

    it("should compute future value of quaterly compounded and montly investment SIP", () => {
      // 1000 for 5 years with 12% anually compounding quaterly and invested 100 monthly
      // all paramenter in weekly as investmentFrequency = weekly
      // p = 1000, t = 5*12, r=12/12, compoundingFrequency = 3*4, investmentAmount = 100, investmentFrequency = 1
      cal
        .CompoundIntrestWithSIP(1000, 5 * 12, 12 / 12, 3 * 1, 100, 1)
        .should.be.within(10028, 10029);
    });
    it("should compute future value of quaterly compounded and weekly investment SIP", () => {
      // 1000 for 5 years with 12% anually compounding quaterly and invested 100 weekly
      // all paramenter in weekly as investmentFrequency = weekly
      // p = 1000, t = 5*52, r=12/52, compoundingFrequency = 4*3, investmentAmount = 100, investmentFrequency = 1
      let noOfWeeksInYear = 52.2;
      // cal.CompoundIntrestWithSIP(1000, 1 * noOfWeeksInYear, 12 / noOfWeeksInYear, 3 * 4, 100, 1).should.equal(6648.59);
    });

    it("should compute future value of quaterly compounded and monthly investment SIP with breakdown", () => {
      // 1000 for 5 years with 12% anually compounding quaterly and invested 100 monthly
      // all paramenter in weekly as investmentFrequency = weekly
      // p = 1000, t = 5*12, r=12/12, compoundingFrequency = 3*4, investmentAmount = 100, investmentFrequency = 1
      var ci = cal.CompoundIntrestWithSIPBreakdown(
        1000,
        5 * 12,
        12 / 12,
        3 * 1,
        100,
        1,
        1
      );
      // console.log(ci);
      ci.futureValue.should.be.within(10028, 10029);
    });

    it("should compute montly breakdown of quaterly compounded and monthly investment SIP ", () => {
      // 1000 for 5 years with 12% anually compounding quaterly and invested 100 monthly
      // all paramenter in monthly as investmentFrequency = monthly
      // p = 1000, t = 5*12, r=12/12, compoundingFrequency = 3*1, investmentAmount = 100, investmentFrequency = 1
      var ci = cal.CompoundIntrestWithSIPBreakdown(
        1000,
        5 * 12,
        12 / 12,
        3 * 1,
        100,
        1,
        1
      );
      // console.log(ci);
      ci.futureValue.should.be.within(10028, 10029);
      var monthlyBreakdown = ci.breakDown.find(m => m.periodNo == 24); // 24th month
      monthlyBreakdown.closingBalance.should.within(3987, 3988);
      monthlyBreakdown.intrest.should.be.within(38.7, 38.8);
    });
  });

  describe("EMI", () => {
    it("should compute EMI for given principal and tenure ", () => {
      // principal ,rate(montly), tenure in months
      var emi = cal.EMI(1000, 12 / 12, 1 * 12);
      emi.should.equal(88.85);
    });

    it("should compute EMI for given large principal ", () => {
      // 10 L loan for 5 yrs with 10% anual intrest
      var emi = cal.EMI(1000000, 10 / 12, 12 * 5);
      emi.should.equal(21247.04);
    });
  });

  describe("LoanRepayment", () => {
    it("should compute EMI for principal", () => {
      var repayment = cal.LoanRepayment(1000000, 10 / 12, 12 * 5);
      repayment.emi.should.equal(21247.04);
    });
    it("should compute EMI and total intrest paid for principal during repayment", () => {
      var repayment = cal.LoanRepayment(2500000, 9 / 12, 12 * 5);
      repayment.emi.should.equal(51895.89);
      repayment.intrest.should.within(613753, 613754);
    });

    it("should compute outstanding principal, principal part and intrest part paid for any given no of period", () => {
      var emi = cal.LoanRepayment(2500000, 9 / 12, 12 * 5);
      var month36 = emi.repayment.find(m => m.periodNo == 36);
      month36.principal.should.within(43053, 43054);
      month36.intrest.should.within(8842, 8843);
      month36.principalOutstanding.should.within(1135956, 1135957);
    });
  });
});
