import { BankPaymentPage } from "~/cypress/support/page-objects/pages/bank-payment-page";
import { HomePage } from "~/cypress/support/page-objects/pages/home-page";

describe("Payment Automation", () => {
  const homePage = new HomePage();
  const bankPaymentPage = new BankPaymentPage();
  const web = Cypress.env("apps").web;

  beforeEach(() => {
    HomePage.visit();
  });

  afterEach(() => {
    cy.clearAll();
  });

  it("should complete the payment process", () => {
    // Accept cookies
    homePage.triggerAcceptCookiesAction();

    // Choose Bank Payment option
    homePage.triggerBankPaymentAction();

    // Fill payment form
    bankPaymentPage.fillAmountInput(web.amount);
    bankPaymentPage.fillEmailInput(web.email);

    // Choose Swedbank as the payment bank
    bankPaymentPage.triggerChooseSwedbankAction();

    // Click PAY
    bankPaymentPage.triggerPayAction();

    // Check for error message
    bankPaymentPage.errorMessage.should("be.visible").and("have.css", "color", "rgb(255, 59, 48)");

    // select terms and conditions
    bankPaymentPage.triggerAcceptTermsAction();

    cy.intercept("POST", "/payments?redirectPreferred=true").as("post");

    bankPaymentPage.triggerPayAction();

    cy.wait("@post").then(({ request }) => {
      assert.equal(request?.body.amount, web.amount);
      assert.equal(request?.body.email, web.email);
      assert.equal(request?.body.bankId, "SWEDBANK_LT");
    });

    cy.url().should("contain", "https://login.swedbank.lt/auth/oauth/v1/authorize/proxy");
  });

  it("should show accepte cookies & privacy  ", () => {
    homePage.acceptAction.should("be.visible");
  });
});
