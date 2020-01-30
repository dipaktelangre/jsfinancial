var Finance = function() {};
/**
 *  Calculate compound intrest
 *  All the arguments should be in same units
 *  e.g. Montly compunded annully 10% for 5yrs  => rate 10/12, compoundingFrequency 1, tenure  5*12
 * @param  {} principal
 * @param  {} rate
 * @param  {} tenure
 * @param  {} compundingFrequency
 */
function CompoundIntrest(principal, rate, tenure, compundingFrequency) {
  var ci =
    principal *
    Math.pow(
      1 + rate / 100 / compundingFrequency,
      compundingFrequency * tenure
    );
  return Math.round(ci * 100) / 100;
}

/**
 * Calculate Simple Intrest
 * @param  {} principal
 * @param  {} rate
 * @param  {} tenure
 */
function SimpleIntrest(principal, rate, tenure) {
  //rate in percentage so effective rate should be rate/100
  var si = principal * (1 + (rate / 100) * tenure);
  return Math.round(si * 100) / 100;
}

function RoundOf(value, decimal = 2) {
  let roundFactor = Math.pow(10, decimal);
  return Math.round(value * roundFactor) / roundFactor;
}

function CompoundIntrestRate(
  principal,
  futureValue,
  tenure,
  compoundingFrequency
) {
  // r = n[(fv/p)^(1/nt) - 1]
  // r=> rate, n => compunding frequnecy, t=> tenure, fv=> future value of investment
  // All the arguments should be in same units
  // e.g. Montly compunded annully 10% for 5yrs  => rate 10/12, compoundingFrequency 1, tenure  5*12

  var rate =
    compoundingFrequency *
    (Math.pow(futureValue / principal, 1 / (compoundingFrequency * tenure)) -
      1);
  rate = rate * 100; //get rate in percentage

  return Math.round(rate * 100) / 100;
}

function CompoundIntrestPrincipal(
  futureValue,
  rate,
  tenure,
  compoundingFrequency
) {
  rate = rate / 100;
  // p = fv/(1+r/n)^nt
  var p =
    futureValue /
    Math.pow(1 + rate / compoundingFrequency, compoundingFrequency * tenure);

  return Math.round(p * 100) / 100;
}

function CompoundIntrestTenure(
  principal,
  futureValue,
  rate,
  compoundingFrequency
) {
  //t = ln(A/P) / n[ln(1 + r/n)]
  rate = rate / 100;
  var noOfPeriods =
    Math.log(futureValue / principal) /
    Math.log(1 + rate / compoundingFrequency);

  return Math.round((noOfPeriods / compoundingFrequency) * 100) / 100;
}

// 1000 for 5 years with 12% anually compounding quaterly and invested 100 weekly
// all paramenter in weekly as investmentFrequency = weekly
// p = 1000, t = 5*52, r=12/52, compoundingFrequency = 3*4, investmentAmount = 100, investmentFrequency = 1
function CompoundIntrestWithSIP(
  principal,
  tenure,
  rate,
  compoundingFrequency,
  investmentAmount,
  investmentFrequency
) {
  var openingBalance = principal,
    closingBalance = principal,
    amountInvested = principal,
    noOfPeriods = tenure,
    intrestUntilCompoudedPeriod = 0;

  for (let i = 1; i <= noOfPeriods; i++) {
    // amount invested at begining
    if (i % investmentFrequency === 0) {
      amountInvested = amountInvested + investmentAmount;
      closingBalance = openingBalance + investmentAmount;
    }
    let intrestAccrude = RoundOf(
      SimpleIntrest(closingBalance, rate, 1) - closingBalance
    );
    intrestUntilCompoudedPeriod += intrestAccrude;
    if (i % compoundingFrequency === 0) {
      closingBalance = closingBalance + intrestUntilCompoudedPeriod;
      intrestUntilCompoudedPeriod = 0;
    }
    openingBalance = closingBalance;
  }

  let futureValue = Math.round(closingBalance * 100) / 100;
  return futureValue;
}

function CompoundIntrestWithSIPBreakdown(
  principal,
  tenure,
  rate,
  compoundingFrequency,
  investmentAmount,
  investmentFrequency,
  breakDownNoOfPeriods = 1
) {
  var openingBalance = principal,
    closingBalance = principal,
    amountInvested = principal,
    noOfPeriods = tenure,
    intrestUntilCompoudedPeriod = 0,
    breakDown = [],
    totalIntrest = 0,
    breakDownObj = {
      periodNo: 1,
      amountInvested: 0,
      intrest: 0,
      openingBalance: principal,
      closingBalance: principal
    };
  for (let i = 1; i <= noOfPeriods; i++) {
    if (i % investmentFrequency === 0) {
      amountInvested = amountInvested + investmentAmount;
      closingBalance = openingBalance + investmentAmount;
      breakDownObj.amountInvested += investmentAmount;
    }
    let intrestAccrude = RoundOf(
      SimpleIntrest(closingBalance, rate, 1) - closingBalance
    );
    intrestUntilCompoudedPeriod += intrestAccrude;
    breakDownObj.intrest += intrestAccrude;
    totalIntrest += intrestAccrude;
    if (i % compoundingFrequency === 0) {
      closingBalance = RoundOf(closingBalance + intrestUntilCompoudedPeriod);
      intrestUntilCompoudedPeriod = 0;
    }
    if (i % breakDownNoOfPeriods === 0) {
      breakDownObj.closingBalance = closingBalance;
      breakDown.push(Object.assign({}, breakDownObj));
      breakDownObj = Object.assign(
        {},
        {
          periodNo: breakDownObj.periodNo + 1,
          amountInvested: 0,
          intrest: 0,
          openingBalance: closingBalance,
          closingBalance: closingBalance
        }
      );
    }
    openingBalance = closingBalance;
  }

  let futureValue = Math.round(closingBalance * 100) / 100;
  return {
    futureValue: futureValue,
    intrest: totalIntrest,
    principal: principal,
    breakDown: breakDown
  };
}

function EMI(principal, rate, tenure) {
  //P = [r*(PV)]/[1-(1+r)^(-n)]
  var rate = rate / 100,
    pmt;
  pmt = (principal * rate) / (1 - Math.pow(1 + rate, -tenure));
  return RoundOf(pmt);
}

function LoanRepayment(principal, rate, tenure) {
  //rate = rate / 100;
  let emi = EMI(principal, rate, tenure);
  let totalIntrest = emi * tenure - principal,
    outstandingPrincipal = principal;

  let repayment = [];
  for (let i = 1; i <= tenure; i++) {
    let intrestAccrude =
      SimpleIntrest(outstandingPrincipal, rate, 1) - outstandingPrincipal;
    let principalPart = emi - intrestAccrude;
    outstandingPrincipal -= principalPart;
    repayment.push({
      periodNo: i,
      intrest: intrestAccrude,
      principal: principalPart,
      principalOutstanding: outstandingPrincipal
    });
  }
  return {
    principal: principal,
    emi: emi,
    intrest: totalIntrest,
    tenure: tenure,
    repayment: repayment
  };
}

/// Public API

Finance.prototype.SimpleIntrest = SimpleIntrest;
Finance.prototype.RoundOf = RoundOf;
Finance.prototype.CompoundIntrest = CompoundIntrest;
Finance.prototype.CompoundIntrestWithSIPBreakdown = CompoundIntrestWithSIPBreakdown;
Finance.prototype.CompoundIntrestWithSIP = CompoundIntrestWithSIP;
Finance.prototype.CompoundIntrestPrincipal = CompoundIntrestPrincipal;
Finance.prototype.CompoundIntrestTenure = CompoundIntrestTenure;
Finance.prototype.CompoundIntrestRate = CompoundIntrestRate;
Finance.prototype.EMI = EMI;
Finance.prototype.LoanRepayment = LoanRepayment;

/// Export as module
if (
  typeof exports !== "undefined" &&
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = Finance;
  module.exports.Finance = Finance;
}
