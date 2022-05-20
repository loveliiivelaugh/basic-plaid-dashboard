import { useEffect, useState } from 'react';
import plaidApi from '../api';

export const usePlaid = () => {
  const [accounts, setAccounts] = useState(null);
  const [linkToken, setLinkToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const generateToken = async () => {
      // console.log('Generating key')
      try {
        const { data } = await plaidApi.createLinkToken();
        console.log('data', data);
        setLinkToken(data.link_token);
      }
      catch (error) {
        setError(error);
      }
      finally {
        setLoading(false);
      }
    };
    generateToken();

    const fetchAccounts = async () => {
      try {
        const { data } = await plaidApi.getAccounts();
        if (!data) generateToken();
        // const visualData = data.accounts.map(({
        //   name,
        //   balances: { available }
        // }) => ({ name, value: available }));
        // const tableData = { 
        //   columns: data.keys().map(key => ({
        //     field: key,
        //     headerName: key.replace('_', ' '),
        //     width: 150,
        //     editable
        //   })),
        //   rows: transactions.map((transaction, index) => ({ ...transaction, key: index }))
        // };
        setAccounts(data);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        if (accounts) setLoading(false);
      }
    };
    // fetchAccounts();

  }, []);

  return {
    accounts,
    linkToken,
    loading,
    error,
  };
};
