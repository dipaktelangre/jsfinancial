/**
 * Simple Intrest
 * The future value of principle amount for given rate and tenure
 * @param  {number} principal
 * @param  {number} rate
 * @param  {number} tenure
 * @returns number
 */ export class Finance {
  public SimpleIntrest(principal: number, rate: number, tenure: number): number;
  /**
   * RoundOf
   * Round of decimal number to given no of decimal digit
   * @param  {number} value
   * @param  {number=2} decimal
   * @returns number
   */
  public RoundOf(value: number, decimal: number): number;

  /**
   * CompoundIntrestRate (Rate of Return)
   * Intrest rate on principal amount to get given future value and tenure
   * @param  {number} principal
   * @param  {number} futureValue
   * @param  {number} tenure
   * @param  {number} compoundingFrequency
   * @returns number
   */
  public CompoundIntrestRate(
    principal: number,
    futureValue: number,
    tenure: number,
    compoundingFrequency: number
  ): number;

  /**
   * Compound Intrest
   * Future value of principal over tenure for given rate and compounded frequency
   * @param  {number} principal
   * @param  {number} rate
   * @param  {number} tenure
   * @param  {number} compundingFrequency
   * @returns number
   */
  public CompoundIntrest(
    principal: number,
    rate: number,
    tenure: number,
    compundingFrequency: number
  ): number;

  /**
   * Compound Intrest Principal
   * Get principal value for given future value and intrest rate, compounding frequency
   * @param  {number} futureValue
   * @param  {number} rate
   * @param  {number} tenure
   * @param  {number} compoundingFrequency
   * @returns number
   */
  public CompoundIntrestPrincipal(
    futureValue: number,
    rate: number,
    tenure: number,
    compoundingFrequency: number
  ): number;

  /**
   * Compound Intrest Tenure
   * Get tenure for given future value and principal amount with given intrest rate and compounding frequency
   * @param  {number} principal
   * @param  {number} futureValue
   * @param  {number} rate
   * @param  {number} compoundingFrequency
   * @returns number
   */
  public CompoundIntrestTenure(
    principal: number,
    futureValue: number,
    rate: number,
    compoundingFrequency: number
  ): number;

  /**
   * Compound Intrest With SIP(Systematically Investment Plan)
   * Get future value of principal compounded for teture with given intrest rate and invested regular amound
   * @param  {number} principal
   * @param  {number} tenure
   * @param  {number} rate
   * @param  {number} compoundingFrequency
   * @param  {number} investmentAmount
   * @param  {number} investmentFrequency
   * @returns number
   */
  public CompoundIntrestWithSIP(
    principal: number,
    tenure: number,
    rate: number,
    compoundingFrequency: number,
    investmentAmount: number,
    investmentFrequency: number
  ): number;

  /**
   * Compound Intrest With SIP having Breakdown Data
   * Get all data of compounded intrest for regurarly invested amout with breakdown
   * This is great data for charts
   * @param  {number} principal
   * @param  {number} tenure
   * @param  {number} rate
   * @param  {number} compoundingFrequency
   * @param  {number} investmentAmount
   * @param  {number} investmentFrequency
   * @param  {number=1} breakDownNoOfPeriods
   * @returns Object
   */
  public CompoundIntrestWithSIPBreakdown(
    principal: number,
    tenure: number,
    rate: number,
    compoundingFrequency: number,
    investmentAmount: number,
    investmentFrequency: number,
    breakDownNoOfPeriods: number
  ): {
    futureValue: number;
    intrest: number;
    principal: number;
    breakDown: Array<{
      periodNo: number;
      amountInvested: number;
      intrest: number;
      openingBalance: number;
      closingBalance: number;
    }>;
  };

  /**
   * Equated Montly Installment (EMI)
   * Get emi amout for given principal and intreste rate and tenure
   * @param  {number} principal
   * @param  {number} rate
   * @param  {number} tenure
   * @returns number
   */
  public EMI(principal: number, rate: number, tenure: number): number;

  /**
   * Loan Repayment
   * Get emi data and repayment montly breakdown of loan
   * for given principla, intrest rate and tenure
   * @param  {number} principal
   * @param  {number} rate
   * @param  {number} tenure
   * @returns number
   */
  public LoanRepayment(
    principal: number,
    rate: number,
    tenure: number
  ): {
    principal: number;
    emi: number;
    intrest: number;
    tenure: number;
    repayment: Array<{
      periodNo: number;
      intrest: number;
      principal: number;
      principalOutstanding: number;
    }>;
  };
}
