const router = require('express').Router();
const client = require('../../utils/plaid.js');
const moment = require('moment');

let PLAID_COUNTRY_CODES = "US";//Or any supported country (US, CA, ES, FR, GB, IE, NL)
PLAID_REDIRECT_URI="http://localhost:3000/";
let ACCESS_TOKEN = null;

router.post('/api/info', (request, response, next) => {
  try {
    response.json({
      item_id: ITEM_ID,
      access_token: ACCESS_TOKEN,
      products: ["auth"]
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error.message });
  }
});

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
router.post('/create_link_token', (request, response, next) => {
  // make sure request is authenticated
  if (request.headers['x-auth-token'] !== process.env.AUTH_TOKEN) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  const configs = {
    'user': {
      // This should correspond to a unique id for the current user.
      'client_user_id': 'user-id',
    },
    'client_name': "Plaid Quickstart",
    'products': ["auth", "transactions"],
    'country_codes': ['US'],
    'language': "en",
  };

  if (PLAID_REDIRECT_URI !== '') {
    configs.redirect_uri = PLAID_REDIRECT_URI;
  }
  
  try {
    console.log("use client to create Link token")
    client.createLinkToken(configs, (error, createTokenResponse) => {
      if (error != null) {
        return response.json({
          error: error,
        });
      }

      console.log("create token response: ", createTokenResponse)
      response.status(200).json(createTokenResponse);
    });
  } catch (error) {
    console.error(error)
    response.status(500).json(error);
  }
});

router.post('/exchange_public_token', async ({ body: { public_token, user_id, headers }}, res) => {

  console.log('EXCHANGE PUBLIC TOKEN!:', { public_token, user_id, headers });
  // // make sure request is authenticated
  // if (headers['x-auth-token'] !== process.env.SERVER_ACCESS_KEY) {
  //   return res.status(401).json({
  //     message: 'Unauthorized'
  //   });
  // }

  console.log("Public Token in exchange: ", public_token);
  try {
    // Exchange the client-side public_token for a server access_token
    const { access_token, item_id } = await client.exchangePublicToken(public_token);
    // console.log('After exchange: ', access_token, item_id);
    // Save the access token and item id in the database
    // const response = await db
    //   .from('plaid')
    //   .insert([{ user_id, access_token, item_id }]);
    ACCESS_TOKEN = access_token;

    const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
      count: 250,
      offset: 0,
    }, (error, transactionsResponse) => {
      if (error != null) {
        console.error(error);
        return res.status(500).json({ error });
      } else {
        console.log(transactionsResponse);
        res.status(200).json(transactionsResponse);
      }
    });
    // console.info('Plaid access token successfully saved to database: ', response);
    // res.status(200).json({ status: 'OK' });
    // Display error on client
  } catch (e) { console.debug(e); }
});

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#payment-initiation-create-link-token-request
router.post('/api/create_link_token_for_payment', function(request, response, next) {
    client.createPaymentRecipient(
      'Harry Potter',
      'GB33BUKB20201555555555',
      {
        'street':      ['4 Privet Drive'],
        'city':        'Little Whinging',
        'postal_code': '11111',
        'country':     'GB'
      },
      function(error, createRecipientResponse) {
        const recipientId = createRecipientResponse.recipient_id

        client.createPayment(
          recipientId,
          'payment_ref',
          {
            'value': 12.34,
            'currency': 'GBP'
          },
          function(error, createPaymentResponse) {
            prettyPrintResponse(createPaymentResponse)
            const paymentId = createPaymentResponse.payment_id;
            PAYMENT_ID = paymentId;
            const configs = {
              'user': {
                // This should correspond to a unique id for the current user.
                'client_user_id': 'user-id',
              },
              'client_name': "Plaid Quickstart",
              'products': PLAID_PRODUCTS,
              'country_codes': PLAID_COUNTRY_CODES,
              'language': "en",
              'payment_initiation': {
              'payment_id': paymentId
              }
            };
            if (PLAID_REDIRECT_URI !== '') {
              configs.redirect_uri = PLAID_REDIRECT_URI;
            }
            client.createLinkToken(
            {
              'user': {
                 // This should correspond to a unique id for the current user.
                'client_user_id': 'user-id',
              },
              'client_name': "Plaid Quickstart",
              'products': PLAID_PRODUCTS,
              'country_codes': PLAID_COUNTRY_CODES,
              'language': "en",
              'redirect_uri': PLAID_REDIRECT_URI,
              'payment_initiation': {
                'payment_id': paymentId
              }
            }, function(error, createTokenResponse) {
              if (error != null) {
                prettyPrintResponse(error);
                return response.json({
                  error: error,
                });
              }
              response.json(createTokenResponse);
            })
          }
        )
      }
    )
});

// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
router.get('/accounts', async (request, response, next) => {
  try {  
    // get the access token from the database if it exists
    // const { data, error } = await db
    //   .from('plaid')
    //   .select();
    // if (error) console.error(error);

    // const ACCESS_TOKEN = data.reverse()[0].access_token;
    // console.log('Access Token successfully queried from Database.');
    
    client.getAccounts(ACCESS_TOKEN, (error, accountsResponse) => {
      if (error != null) {
        console.log(error);
        return response.json({
          error: error,
        });
      }
      response.status(200).json(accountsResponse);
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

// Retrieve ACH or ETF Auth data for an Item's accounts
// https://plaid.com/docs/#auth
router.get('/api/auth', function(request, response, next) {
  client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({ error });
    }
    prettyPrintResponse(authResponse);
    response.json(authResponse);
  });
});

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
router.get('/transactions', async (request, response, next) => {
  // get the access token from the database if it exists
  // const { data, error } = await db
  //   .from('plaid')
  //   .select();
  // if (error) console.error(error);

  // console.log('Access Token successfully queried from Database.', {length: data.length, data} );
  // const ACCESS_TOKEN = data.reverse()[0].access_token;
  //   console.log('Access Token successfully queried from Database.');
  // Pull transactions for the Item for the last 30 days
  const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');
  client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 250,
    offset: 0,
  }, (error, transactionsResponse) => {
    if (error != null) {
      console.log(error);
      return response.status(500).json({
        error: error
      });
    } else {
      // console.log(transactionsResponse);
      response.status(200).json(transactionsResponse);
    }
  });
});

// Retrieve Identity for an Item
// https://plaid.com/docs/#identity
router.get('/api/identity', function(request, response, next) {
  client.getIdentity(ACCESS_TOKEN, function(error, identityResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(identityResponse);
    response.json({identity: identityResponse.accounts});
  });
});

// Retrieve real-time Balances for each of an Item's accounts
// https://plaid.com/docs/#balance
router.get('/api/balance', function(request, response, next) {
  client.getBalance(ACCESS_TOKEN, function(error, balanceResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(balanceResponse);
    response.json(balanceResponse);
  });
});


// Retrieve Holdings for an Item
// https://plaid.com/docs/#investments
router.get('/api/holdings', function(request, response, next) {
  client.getHoldings(ACCESS_TOKEN, function(error, holdingsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(holdingsResponse);
    response.json({error: null, holdings: holdingsResponse});
  });
});

// Retrieve Investment Transactions for an Item
// https://plaid.com/docs/#investments
router.get('/investment_transactions/:id', async (request, response, next) => {
  // get the access token from the database if it exists
  const { data, error } = await db
    .from('plaid')
    .select();
  if (error) console.error(error);

  const ACCESS_TOKEN = data[0].access_token;
    console.log('Access Token successfully queried from Database.');

  const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');

  client.getInvestmentTransactions(ACCESS_TOKEN, startDate, endDate, function(error, investmentTransactionsResponse) {
    if (error != null) {
      console.log(error);
      return response.status(500).json({
        error: error,
      });
    }
    // console.log(investmentTransactionsResponse);
    response.status(200).json({error: null, investment_transactions: investmentTransactionsResponse});
  });
});

// Create and then retrieve an Asset Report for one or more Items. Note that an
// Asset Report can contain up to 100 items, but for simplicity we're only
// including one Item here.
// https://plaid.com/docs/#assets
router.get('/api/assets', function(request, response, next) {
  // You can specify up to two years of transaction history for an Asset
  // Report.
  const daysRequested = 10;

  // The `options` object allows you to specify a webhook for Asset Report
  // generation, as well as information that you want included in the Asset
  // Report. All fields are optional.
  const options = {
    client_report_id: 'Custom Report ID #123',
    // webhook: 'https://your-domain.tld/plaid-webhook',
    user: {
      client_user_id: 'Custom User ID #456',
      first_name: 'Alice',
      middle_name: 'Bobcat',
      last_name: 'Cranberry',
      ssn: '123-45-6789',
      phone_number: '555-123-4567',
      email: 'alice@example.com',
    },
  };
  client.createAssetReport(
    [ACCESS_TOKEN],
    daysRequested,
    options,
    function(error, assetReportCreateResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error,
        });
      }
      prettyPrintResponse(assetReportCreateResponse);

      const assetReportToken = assetReportCreateResponse.asset_report_token;
      respondWithAssetReport(20, assetReportToken, client, response);
    });
});

// This functionality is only relevant for the UK Payment Initiation product.
// Retrieve Payment for a specified Payment ID
router.get('/api/payment', function(request, response, next) {
  client.getPayment(PAYMENT_ID, function(error, paymentGetResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    prettyPrintResponse(paymentGetResponse);
    response.json({error: null, payment: paymentGetResponse});
  });
});

// Retrieve information about an Item
// https://plaid.com/docs/#retrieve-item
router.get('/api/item', function(request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
      if (err != null) {
        const msg = 'Unable to pull institution information from the Plaid API.';
        return response.json({
          error: msg
        });
      } else {
        prettyPrintResponse(itemResponse);
        response.json({
          item: itemResponse.item,
          institution: instRes.institution,
        });
      }
    });
  });
});

// This is a helper function to poll for the completion of an Asset Report and
// then send it in the response to the client. Alternatively, you can provide a
// webhook in the `options` object in your `/asset_report/create` request to be
// notified when the Asset Report is finished being generated.
const respondWithAssetReport = (
  numRetriesRemaining,
  assetReportToken,
  client,
  response
) => {
  if (numRetriesRemaining == 0) {
    return response.json({
      error: 'Timed out when polling for Asset Report',
    });
  }

  const includeInsights = false;
  client.getAssetReport(
    assetReportToken,
    includeInsights,
    function(error, assetReportGetResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        if (error.error_code == 'PRODUCT_NOT_READY') {
          setTimeout(
            () => respondWithAssetReport(
              --numRetriesRemaining, assetReportToken, client, response),
            1000
          );
          return
        }

        return response.json({
          error: error,
        });
      }

      client.getAssetReportPdf(
        assetReportToken,
        function(error, assetReportGetPdfResponse) {
          if (error != null) {
            return response.json({
              error: error,
            });
          }

          response.json({
            error: null,
            json: assetReportGetResponse.report,
            pdf: assetReportGetPdfResponse.buffer.toString('base64'),
          })
        }
      );
    }
  );
};


module.exports = router;