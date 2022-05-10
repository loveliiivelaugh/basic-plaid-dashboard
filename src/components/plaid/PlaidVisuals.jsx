import React from 'react';
import { Card, Container, Grid, Typography } from  '@mui/material';
import DataGridDemo from '../muiTemplates/MuiDatagrid';
import Barchart from '../recharts/BarChart';
import Piechart from '../recharts/Piechart';
import Plaid from '.';
import { usePlaid } from './hook';

export default function PlaidVisuals() {
  const { data, loading } = usePlaid();
  // [
  // {
  //   account_id: 'xyrgVxgpJqu1kLjNGNWgtelLNKABnxTJA5dAZ',
  //   account_owner: null,
  //   amount: 6.33,
  //   authorized_date: '2022-04-17',
  //   authorized_datetime: null,
  //   category: [Array],
  //   category_id: '22016000',
  //   check_number: null,
  //   date: '2022-04-18',
  //   datetime: null,
  //   iso_currency_code: 'USD',
  //   location: [Object],
  //   merchant_name: 'Uber',
  //   name: 'Uber 072515 SF**POOL**',
  //   payment_channel: 'in store',
  //   payment_meta: [Object],
  //   pending: false,
  //   pending_transaction_id: null,
  //   personal_finance_category: null,
  //   transaction_code: null,
  //   transaction_id: 'xyrgVxgpJqu1kLjNGNWgtelXD1ZxV6UAwbvLd',
  //   transaction_type: 'special',
  //   unofficial_currency_code: null
  // }
  // ]
  const jsx = (
    <Container maxWidth={false}>
      <Grid container maxWidth='xl' justifyContent="space-around">
        <Card sx={{ m: 'auto' }}>
          <Plaid />
        </Card>
      </Grid>
      {data && data.length > 0 && (
      <>
        <Grid container>
          <Grid item xs={12} sm={4}>
            {/* <Piechart data={visualData} /> */}
          </Grid>
          <Grid item xs={12} sm={8}>
            {/* <Barchart data={visualData} /> */}
          </Grid>
        </Grid>
        <Grid container>
          {/* <DataGridDemo data={tableData} /> */}
        </Grid>
      </>
      )}
    </Container>
  )

  return jsx;
};