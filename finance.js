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
Finance.prototype.CompoundIntrest = function(
  principal,
  rate,
  tenure,
  compundingFrequency
) {
  var ci =
    principal *
    Math.pow(
      1 + rate / 100 / compundingFrequency,
      compundingFrequency * tenure
    );
  return Math.round(ci * 100) / 100;
};

/**
 * Calculate Simple Intrest
 * @param  {} principal
 * @param  {} rate
 * @param  {} tenure
 */
Finance.prototype.SimpleIntrest = function(principal, rate, tenure) {
  //rate in percentage so effective rate should be rate/100
  var si = principal * (1 + (rate / 100) * tenure);
  return Math.round(si * 100) / 100;
};

Finance.prototype.CompoundIntrestRate = function(
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
};

Finance.prototype.CompoundIntrestPrincipal = function(
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
};

Finance.prototype.CompoundIntrestTenure = function(
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
};

/// Export as module
if (
  typeof exports !== "undefined" &&
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = Finance;
  module.exports.Finance = Finance;
}
