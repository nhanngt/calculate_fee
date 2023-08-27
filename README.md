## Run local

1.  yarn install
2.  yarn dev
3.  Example curl `
    curl --location 'localhost:8000/transactions-fee' \
    --header 'Content-Type: application/json' \
    --data '{
    "transaction": {
    "fromAmount": "100",
    "fromNetwork": "Card",
    "fromAsset": "USD",
    "toNetwork": "ethereum",
    "toAsset": "ETH",
    "feeAsset": "USD"

        },
        "customer": {"tier": 1},
        "availableProviders": []

    }'
    `

## Run Test

1. yarn test
