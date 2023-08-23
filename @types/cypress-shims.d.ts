/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

interface JSONAPIObjectIntf {
  id: string;
  type: string;
  attributes: Record<string, string | number | object | string[] | number[] | object[]>;
}

interface JSONAPIResposeIntf {
  data: JSONAPIObjectIntf;
}

interface JSONAPIArrayResposeIntf {
  data: JSONAPIObjectIntf[];
}

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    interface Chainable<Subject = any> {
      faker: typeof faker;

      /**
       * Custom command to clear all storage and cookies
       * @example cy.clearAll()
       */
      clearAll(): Chainable<Element>;
    }
  }
}
