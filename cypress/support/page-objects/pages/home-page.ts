export class HomePage {
  static get url() {
    return [Cypress.env("apps").web.baseUrl, ""].join("");
  }

  static visit() {
    return cy.visit(HomePage.url);
  }

  get acceptAction() {
    return cy.get("section._wrapper_kmvrd_1 button");
  }
  triggerAcceptCookiesAction(input: Cypress.Chainable = this.acceptAction) {
    input.click();
  }

  get bankPaymentAction() {
    return cy.get("[href='/bank-payment/LT']");
  }
  triggerBankPaymentAction(input: Cypress.Chainable = this.bankPaymentAction) {
    input.click();
  }
}
