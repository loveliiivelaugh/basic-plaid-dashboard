import axios from 'axios';

const secured = false;
const url = 'http://localhost:8080';
const headers = {
  'Content-Type': 'application/json',
  'x-auth-token': '',
};

export const plaidApi = {
  createLinkToken: async () => axios.post(`${url}/api/plaid/create_link_token`, { headers }),
  exchangePublicToken: async (public_token, user_id) => axios.post(`${url}/api/plaid/exchange_public_token`, { public_token, user_id, headers }),
  getAccounts: async () => axios.get(`${url}/api/plaid/accounts`, { headers }),
  getTransactions: async () => axios.get(`${url}/api/plaid/transactions`, { headers }),
};
