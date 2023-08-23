# Test bank payments

## Install
Install npm dependencies "node_modules".
```bash
npm install
```

## Lint
Used to lint code.
```bash
npm run lint
```

## cypress configrations

Execute the following command after replacing your secrets.

1. replace "[YOUR-CLIENT-ID]" with your client id.
2. replace "[YOUR-CLIENT-SECRET]" with your client secret.

```
cat <<EOT > cypress.env.json
{
    "apps": {
        "api": {
            "baseUrl": "https://api.getkevin.eu/platform/v0.3",
            "clientSecret": "[YOUR-CLIENT-SECRET]",
            "clientId": "[YOUR-CLIENT-ID]",
            "redirectUrl": "https://yourapp.com/callback",
            "webHookUrl": "https://yourapp.com/notify",
            "contentType": "application/json"
        },
        "web": {
            "baseUrl": "https://demo.kevin.eu/",
            "amount": "0.01",
            "email": "abdalhadey@gmail.com"
        }
    }
}
EOT

```

## Test
To run test
```bash
// to run all tests
npm run test
```
```bash
// to run api tests
npm run test:api
```
```bash
// to run web tests
npm run test:web
```

## Supported version
- npm: 9.8.0
- node: 20.5.1
