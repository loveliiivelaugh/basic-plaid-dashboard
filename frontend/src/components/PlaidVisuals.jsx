import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Container, Grid, Typography } from  '@mui/material';
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
  const jsx = (
    <Container maxWidth="xl">
      {accounts && (
        <Paper elevation={12} sx={{ p: 2, m: 2 }}>
          <Typography variant="h4" gutterBottom>
            Accounts
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Piechart data={accounts} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Barchart data={accounts} />
            </Grid>
          </Grid>
          <Grid container>
            <DataGridDemo data={accounts} />
          </Grid>
        </Paper>
      )}
      {transactions && (
        <Paper elevation={12} sx={{ p: 2, m: 2 }}>
          <Typography variant="h4" gutterBottom>
            Transactions
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Piechart data={transactions} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Barchart data={transactions} />
            </Grid>
          </Grid>
          <Grid container>
            <DataGridDemo data={transactions} />
          </Grid>
        </Paper>
      )}
    </Container>
  )

  return jsx;
};
