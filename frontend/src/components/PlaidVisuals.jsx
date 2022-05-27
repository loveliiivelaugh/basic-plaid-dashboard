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

  const formatAccountsTable = accounts => ({
    columns: [
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'balance', headerName: 'Balance', width: 150 },
      { field: 'available', headerName: 'Available', width: 150 },
    ],
    rows: accounts.map(({ account_id, name, balances: { available, current } }) => ({
      id: account_id,
      name,
      available,
      balance: current,
    })),
  });

  const formatTransactionTable = transactions => ({
    columns: [
      { field: 'date', headerName: 'Date', width: 150 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'amount', headerName: 'Amount', width: 150 },
      { field: 'category', headerName: 'Category', width: 150 },
    ],
    rows: transactions.map(({ date, name, amount, category }, id) => (
      { id, date, name, amount, category: category[0] }
    ))
  });

  return (
    <Container maxWidth="xl">
      <Toolbar />
      <Typography variant="h4" color="#333" gutterBottom>
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
      <Typography variant="h4" color="#333" gutterBottom>
        Transactions
      </Typography>
      {transactions && (
        <Grid container>
          <Grid item xs={12} md={8}>
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
          <Grid item xs={12} md={4}>
            <Paper elevation={12} sx={{ p: 2, m: 2 }}>
              <Piechart data={transactions.map(({ category }) => ({
                name: category[0],
                value: Math.abs(transactions
                  .filter(transaction => transaction.category[0] === category[0])
                  .reduce((acc, { amount }) => acc + amount, 0)),
                })
              )}/>
            </Paper>
          </Grid>
          <Grid item md={12}>
            <Paper elevation={12} sx={{ p: 2, m: 2 }}>
              <DataGridDemo data={formatTransactionTable(transactions)} />
            </Paper>
          </Grid>
        </Grid>
      )}
      <Toolbar />
    </Container>
  );
};