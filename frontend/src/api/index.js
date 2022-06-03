import axios from 'axios';

const api = {
  createLinkToken: async () => axios.post(`/api/create_link_token`),
  exchangePublicToken: async (public_token, user_id) => axios.post(`/api/exchange_public_token`, { public_token, user_id }),
  getAccounts: async () => axios.get(`/api/accounts`),
  getTransactions: async () => axios.get(`/api/transactions`),
};

export default api;