import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Container, Grid, Toolbar, Typography } from  '@mui/material';
import DataGridDemo from './MuiDatagrid';
import Barchart from './recharts/BarChart';
import Piechart from './recharts/Piechart';

export default function PlaidVisuals({ loading, data = false }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!data) navigate('/');
  }, []);
  const { accounts, transactions } = data;
  console.log({ accounts, transactions, loading });

  const formatAccountsTable = (accounts) => ({
    columns: accounts.map(({ name }) => ({ 
        field: name.replace(' ', '_'),
        headerName: name,
        width: 150,
        editable: true,
    })),
    rows: accounts.map(({ name }, id) => ({
      id,
      ...accounts.reduce((acc, { name, balances: { current }}, i) => ({
        key: i,
        ...acc,
        [name.replace(' ', '_')]: current,
      }), {}),
    })),
  });

  const formatTransactionTable = transactions => {
    const columns = [
      { field: 'date', headerName: 'Date', width: 150 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'amount', headerName: 'Amount', width: 150 },
      { field: 'category', headerName: 'Category', width: 150 },
    ];
    const rows = transactions.map(({ date, name, amount, category }, id) => ({
      id,
      date,
      name,
      amount,
      category: category[0],
    }));
    return { columns, rows };
  };

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Accounts
      </Typography>
      {accounts && (
        <Grid container>
          <Grid item md={6}>
            <Paper elevation={12} sx={{ p: 2, m: 2 }}>
              <Piechart data={accounts.map(({ name, balances: { current }}) => ({ name, value: current }))} />
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper elevation={12} sx={{ p: 2, m: 2 }}>
              <DataGridDemo data={formatAccountsTable(accounts)} />
            </Paper>
          </Grid>
        </Grid>
      )}
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      {transactions && (
        <Grid container>
          <Grid item xs={12} md={6}>
            <Paper elevation={12} sx={{ p: 2, m: 2 }}>
              <Barchart data={transactions.map(({ category }) => ({
                name: category[0],
                amount: transactions
                  .filter(transaction => transaction.category[0] === category[0])
                  .reduce((acc, { amount }) => acc + amount, 0),
                })
              )}/>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={12} sx={{ p: 2, m: 2 }}>
              <Piechart data={transactions.map(({ amount, name }) => ({ name, value: amount }))} />
            </Paper>
          </Grid>
          <Grid item md={12}>
            <Paper elevation={12} sx={{ p: 2, m: 2 }}>
              <DataGridDemo data={formatTransactionTable(transactions)} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};