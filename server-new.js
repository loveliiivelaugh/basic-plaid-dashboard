/*
server.js – Configures the Plaid client and uses Express to defines routes that call Plaid endpoints in the Sandbox environment.Utilizes the official Plaid node.js client library to make calls to the Plaid API.
*/

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require("express-session");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const app = express();

app.use(
  // FOR DEMO PURPOSES ONLY
  // Use an actual secret key in production
  session({ secret: "bosco", saveUninitialized: true, resave: true })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration for the Plaid client
const config = new Configuration({
  basePath: PlaidEnvironments.development,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      // "Plaid-Version": "2020-09-14",
    },
  },
});

//Instantiate the Plaid client with the configuration
const client = new PlaidApi(config);

app.use(cors());

//Creates a Link token and return it
app.post("/api/create_link_token", async (req, res, next) => {
  console.log('create_link_token route is hit at least' );
  const request = {
    user: {
      // This should correspond to a unique id for the current user.  
      client_user_id: 'clientUserId',
    },
    client_name: 'Plaid Test App',
    products: ['auth', 'transactions'],
    language: 'en',
    redirect_uri: 'http://localhost:3000',
    country_codes: ['US'],
  };
  try {
    // console.log(config, client);
    const createTokenResponse = await client.linkTokenCreate(request);
    console.log('createTokenResponse', createTokenResponse);
    response.json(createTokenResponse.data);
  } catch (error) {
    // handle error
    // console.error(error);
  }
});

// Exchanges the public token from Plaid Link for an access token
app.post("/api/exchange_public_token", async (req, res, next) => {
  const exchangeResponse = await client.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });

  // FOR DEMO PURPOSES ONLY
  // Store access_token in DB instead of session storage
  req.session.access_token = exchangeResponse.data.access_token;
  res.json(true);
});

// Fetches balance data using the Node client library for Plaid
app.get("/api/balance", async (req, res, next) => {
  const access_token = req.session.access_token;
  const balanceResponse = await client.accountsBalanceGet({ access_token });
  res.json({
    Balance: balanceResponse.data,
  });
});

app.listen(process.env.PORT || 8080);
