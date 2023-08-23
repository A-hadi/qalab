Cypress.Commands.add("clearAll", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.reload();
});
