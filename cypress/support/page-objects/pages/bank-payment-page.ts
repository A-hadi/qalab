export class BankPaymentPage {
  static get url() {
    //first string end point second join is for query param
    return [Cypress.env("apps").web.baseUrl, "/bank-payment"].join("");
  }

  static visit() {
    return cy.visit(BankPaymentPage.url);
  }

  get amountInput() {
    return cy.get("[name='amount']");
  }
  fillAmountInput(amount: string, input: Cypress.Chainable = this.amountInput) {
    input.type(amount);
    return this;
  }

  get emailInput() {
    return cy.get("[name='email']");
  }
  fillEmailInput(email: string, input: Cypress.Chainable = this.emailInput) {
    input.type(email);
    return this;
  }

  get chooseSwedbankAction() {
    return cy.get("[value='SWEDBANK_LT']");
  }
  triggerChooseSwedbankAction(input: Cypress.Chainable = this.chooseSwedbankAction) {
    input.click({ force: true });
  }

  get payAction() {
    return cy.get("[data-testid='bank-payment-form']>button");
  }

  triggerPayAction(input: Cypress.Chainable = this.payAction) {
    input.click();
  }

  get errorMessage() {
    return cy.get("._error_72pu9_20");
  }

  get acceptTermsAction() {
    return cy.get("[type='checkbox']");
  }

  triggerAcceptTermsAction(input: Cypress.Chainable = this.acceptTermsAction) {
    input.click({ force: true });
  }
}
