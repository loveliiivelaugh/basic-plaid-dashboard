//? https://plaid.com/docs/quickstart/#quickstart-setup
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

const { PLAID_ENV, PLAID_CLIENT_ID, PLAID_SECRET, PLAID_SANDBOX_SECRET } = process.env;
// Initialize the Plaid client
const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);
// console.log(client);

module.exports = client;