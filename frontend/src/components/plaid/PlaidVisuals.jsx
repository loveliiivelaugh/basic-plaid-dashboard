import React from 'react';
import { Card, Container, Grid, Typography } from  '@mui/material';
import DataGridDemo from '../muiTemplates/MuiDatagrid';
import Barchart from '../recharts/BarChart';
import Piechart from '../recharts/Piechart';
import { usePlaid } from './hook';

export default function PlaidVisuals() {
  // const { data, loading } = usePlaid();
  const jsx = (
    <Container maxWidth={false}>
      
    </Container>
  )

  return jsx;
};

// {accounts && (
//   <>
//     <Grid container>
//       <Grid item xs={12} sm={4}>
//         <Piechart data={visualData} />
//       </Grid>
//       <Grid item xs={12} sm={8}>
//         <Barchart data={visualData} />
//       </Grid>
//     </Grid>
//     <Grid container>
//       <DataGridDemo data={tableData} />
//     </Grid>
//   </>
// )}
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