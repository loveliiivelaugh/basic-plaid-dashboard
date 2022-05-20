import React, { useState } from 'react';
import { Button } from '@mui/material';
import { usePlaidLink } from 'react-plaid-link';
import { usePlaid } from './hook';
import { plaidApi } from './api';

const Plaid = ({ setData }) => {
  const plaid = usePlaid();
  const [connected, setConnected] = useState(false);

  // send token to client server, wait for status, if 200 then ...
  // ... the accessToken is now stored in the DB for future API calls
  const handleOnSuccess = async (public_token) => {
    try {
      console.log('public_token', public_token);
      const { status, data, error } = await plaidApi.exchangePublicToken(public_token);
      console.log('public_token', { status, data, error });
      if (error) console.error('Error exchanging public token: ', { error });
      if (status === 200) {
        setConnected(true);
        console.info('Successfully connected to Plaid!', { data });
        setData(data);
      }
    } catch (error) {
      console.error('Error connecting to Plaid', { error });
    } finally {
      // ... get rest of data from Plaid API ...
      // ... start streaming transactions if possible...
    }
  };
  // handle the case when your user exits Link
  const handleOnExit = () => {};;
  
  const config = {
    token: plaid.linkToken,
    onSuccess: handleOnSuccess,
    onExit: handleOnExit,
  };

  const { open, ready, error } = usePlaidLink(config);

  return plaid.loading ? 'Loading...' : (
    <Button variant="contained" onClick={() => open()} disabled={!ready}>
      {plaid.accounts || connected ? 'Connected' : 'Connect a bank account'}
    </Button>
  )
}

export default Plaid