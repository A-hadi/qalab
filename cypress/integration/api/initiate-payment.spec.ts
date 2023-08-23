// cypress/integration/apiTest.spec.ts

describe("Initiate Payment API Automation", () => {
    const api = Cypress.env("apps").api

    // Construct the request headers
    const headersValues = {
        "Client-Id": api.clientId,
        "Client-Secret": api.clientSecret,
        "Redirect-URL": api.redirectUrl,
        "Webhook-URL": api.webHookUrl,
        "Content-Type": api.contentType,
        // Add other headers as neededß
    };

    // Construct the request payload
    const payload ={
        "amount": 0.01,
        "currencyCode": "EUR",
        "description": "test",
        "bankPaymentMethod": {
            "creditorName": "Padėk gatvės vaikams",
            "endToEndId": "1234567890",
            "informationStructured": {
                "reference": "test"
            },
            "creditorAccount": {
                "iban": "LT177300010119765165"
            }
        }
    };

    it("should make a successful API request", () => {
        // Make the API request
        cy.request({
            method: "POST",
            url: `${api.baseUrl}/pis/payment`,
            headers: headersValues,
            body: payload,
        }).then((response) => {
            // Handle the response
            expect(response.status).to.equal(200); // Adjust status code as needed
            expect(response.body.bankStatus).to.equal("STRD");
            expect(response.body.statusGroup).to.equal("started");
            expect(response.body.id).to.exist
            // Add more assertions as needed
        });
    });

    it("should fail when method is invalid", () => {
        // Make the API request
        cy.request({
            method: "GET",
            url: `${api.baseUrl}/pis/payment`,
            headers: headersValues,
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            // Handle the response
            expect(response.status).to.equal(404); // Adjust status code as needed
            // Add more assertions as needed
        });
    });

    it("should fail when client id is empty", () => {
        const missingClienIdHeader = Object.assign({}, headersValues, {
            "Client-Id": ""
        });

        // Make the API request
        cy.request({
            method: "POST",
            url: `${api.baseUrl}/pis/payment`,
            headers: missingClienIdHeader,
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            // Handle the response
            expect(response.status).to.equal(401); // Adjust status code as needed
            // Add more assertions as needed
        });
    });

    it("should fail when client secret is empty", () => {
        const mssingClientSecretHeader = Object.assign({}, headersValues, {
            "Client-Secret": ""
        });

        // Make the API request
        cy.request({
            method: "POST",
            url: `${api.baseUrl}/pis/payment`,
            headers: mssingClientSecretHeader,
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            // Handle the response
            expect(response.status).to.equal(401); // Adjust status code as needed
            // Add more assertions as needed
        });
    });

    it("should fail when Redirect URL is invalid", () => {
        const invalidRedirectURLHeader = Object.assign({}, headersValues, {
            "Redirect-URL": "no://web.site"
        });

        // Make the API request
        cy.request({
            method: "POST",
            url: `${api.baseUrl}/pis/payment`,
            headers: invalidRedirectURLHeader,
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            // Handle the response
            expect(response.status).to.equal(400); // Adjust status code as needed
            // Add more assertions as needed
        });
    });

    it("should fail when Webhook URL is invalid", () => {
        const invalidWebhookURLHeader = Object.assign({}, headersValues, {
            "Webhook-URL": "fttps://yourapp.com/notify"
        });

        // Make the API request
        cy.request({
            method: "POST",
            url: `${api.baseUrl}/pis/payment`,
            headers: invalidWebhookURLHeader,
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            // Handle the response
            expect(response.status).to.equal(400); // Adjust status code as needed
            expect(response.body.data).to.equal('"webhook-url" contains an invalid value');
            expect(response.body.error.code).to.equal(90007);
            expect(response.body.error.description).to.equal("Invalid webhook URL provided.");
            expect(response.body.error.name).to.equal("InvalidWebhookUrl");
        });
    });

    it("should fail when amount is 0", () => {
        const zeroAmountPayload = Object.assign({}, payload, {
            "amount": 0,
        });

        // Make the API request
        cy.request({
            method: "POST",
            url: `${api.baseUrl}/pis/payment`,
            headers: headersValues,
            body: zeroAmountPayload,
            failOnStatusCode: false
        }).then((response) => {
            // Handle the response
            expect(response.status).to.equal(400); // Adjust status code as needed
            // Add more assertions as needed
            expect(response.body.data).to.equal('"amount" must be greater than or equal to 0.01');
            expect(response.body.error.code).to.equal(10021);
            expect(response.body.error.description).to.equal("Invalid payment data.");
            expect(response.body.error.name).to.equal("InvalidPaymentData");
        });
    });

    it("should fail when amount format is string", () => {
        const invalidAmountPayload = Object.assign({}, payload, {
            "amount": "SSSS",
        });

        // Make the API request
        cy.request({
            method: "POST",
            url: `${api.baseUrl}/pis/payment`,
            headers: headersValues,
            body: invalidAmountPayload,
            failOnStatusCode: false
        }).then((response) => {
            // Handle the response
            expect(response.status).to.equal(400); // Adjust status code as needed
            // Add more assertions as needed
            expect(response.body.data).to.equal('"amount" must be a number');
            expect(response.body.error.code).to.equal(10021);
            expect(response.body.error.description).to.equal("Invalid payment data.");
            expect(response.body.error.name).to.equal("InvalidPaymentData");
        });
    });

    it("should fail when amount is out boundry", () => {
        const hugeAmountPayload = Object.assign({}, payload, {
            "amount": 1000000000000000000000000000000000,
        });

        // Make the API request
        cy.request({
            method: "POST",
            url: `${api.baseUrl}/pis/payment`,
            headers: headersValues,
            body: hugeAmountPayload,
            failOnStatusCode: false
        }).then((response) => {
            // Handle the response
            expect(response.status).to.equal(400); // Adjust status code as needed
            // Add more assertions as needed
            expect(response.body.data).to.equal('"amount" must be a safe number');
            expect(response.body.error.code).to.equal(10021);
            expect(response.body.error.description).to.equal("Invalid payment data.");
            expect(response.body.error.name).to.equal("InvalidPaymentData");
        });
    });

    it("should fail when endpoint is invalid", () => {
        // Make the API request
        cy.request({
            method: "POST",
            url: `${api.baseUrl}/pis/payments`,
            headers: headersValues,
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            // Handle the response
            expect(response.status).to.equal(404); // Adjust status code as needed
            // Add more assertions as needed
        });
    });
});
