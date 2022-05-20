import axios from 'axios';

const url = 'http://localhost:8080';
// const headers = {
//   'Content-Type': 'application/json',
//   'Access-Control-Allow-Origin': '*',
// };

const api = {
  createLinkToken: async () => axios.post(`${url}/api/create_link_token`),
  exchangePublicToken: async (public_token, user_id) => axios.post(`${url}/api/exchange_public_token`, { public_token, user_id }),
  getAccounts: async () => axios.get(`${url}/api/accounts`),
  getTransactions: async () => axios.get(`${url}/api/transactions`),
};

export default api;