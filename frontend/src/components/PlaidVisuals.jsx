import React from 'react';
import { Card, Container, Grid, Typography } from  '@mui/material';
import DataGridDemo from './MuiDatagrid';
import Barchart from './recharts/BarChart';
import Piechart from './recharts/Piechart';

export default function PlaidVisuals({ data: { accounts, transactions }, loading }) {
  console.log({ accounts, transactions, loading });
  const jsx = (
    <Container maxWidth={false}>
      {accounts && (
        <>
          <Grid container>
            <Grid item xs={12} sm={4}>
              {/* <Piechart data={accounts} /> */}
            </Grid>
            <Grid item xs={12} sm={8}>
              <Barchart data={accounts} />
            </Grid>
          </Grid>
          <Grid container>
            <DataGridDemo data={accounts} />
          </Grid>
        </>
      )}
    </Container>
  )

  return jsx;
};
// {transactions && (
//   <>
//     <Grid container>
//       <Grid item xs={12} sm={4}>
//         {/* <Piechart data={transactions} /> */}
//       </Grid>
//       <Grid item xs={12} sm={8}>
//         <Barchart data={transactions} />
//       </Grid>
//     </Grid>
//     <Grid container>
//       <DataGridDemo data={transactions} />
//     </Grid>
//   </>
// )}