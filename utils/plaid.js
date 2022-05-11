//? https://plaid.com/docs/quickstart/#quickstart-setup
// const plaid = require('plaid');
require('dotenv').config();

const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);



// // Initialize the Plaid client
// // Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
// const plaidClient = new plaid.Client({
//   clientID: process.env.PLAID_CLIENT_ID,
//   secret: process.env.PLAID_SECRET,
//   env: plaid.environments.sandbox,
//   options: {
//     version: '2020-09-14',
//   },
// });

module.exports = client;