//
import { useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Grid, Stack, Switch, Typography } from '@mui/material';
// redux
import AnalyticsWidget1 from '@/_global/Ncomponents/widget/AnalyticsWidget1';
import Iconify from '@/_global/components/Iconify';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});
const TableContainerStyle = styled(TableContainer)(({ theme }) => ({
  maxHeight: 500,
  "&::-webkit-scrollbar": {
    width: 10
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: alpha(theme.palette.grey[600], 0.48),
    borderRadius: 20,
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.grey[600], 0.48),
    opacity: 1,
  }
}));



// ----------------------------------------------------------------------
interface FormValuesProps {
  name: string;
  description: string;
  phone: string;
  logo: any;
}

export default function Privilege() {

  const rows = [
    {
      "id": 1,
      "name": "admin_list",
      "display_name": "admin list",
      "type": "admin",
      "created_at": "2023-05-23T09:36:26.000Z",
      "updated_at": "2023-05-23T09:36:26.000Z",
      "roles": [
          {
              "id": 1,
              "name": "superadmin",
              "display_name": "Superadmin",
              "type": "admin",
              "created_at": "2023-05-23T09:36:26.000Z",
              "updated_at": "2023-05-23T09:36:26.000Z",
              "RolePermission": {
                  "permission_id": 1,
                  "role_id": 1
              }
          }
      ]
    },
    {
      "id": 1,
      "name": "admin_view",
      "display_name": "admin view",
      "type": "admin",
      "created_at": "2023-05-23T09:36:26.000Z",
      "updated_at": "2023-05-23T09:36:26.000Z",
      "roles": [
          {
              "id": 1,
              "name": "admin",
              "display_name": "admin",
              "type": "admin",
              "created_at": "2023-05-23T09:36:26.000Z",
              "updated_at": "2023-05-23T09:36:26.000Z",
              "RolePermission": {
                  "permission_id": 1,
                  "role_id": 1
              }
          }
      ]
    },
    {
      "id": 1,
      "name": "admin_list",
      "display_name": "admin list",
      "type": "admin",
      "created_at": "2023-05-23T09:36:26.000Z",
      "updated_at": "2023-05-23T09:36:26.000Z",
      "roles": [
          {
              "id": 1,
              "name": "superadmin",
              "display_name": "Superadmin",
              "type": "admin",
              "created_at": "2023-05-23T09:36:26.000Z",
              "updated_at": "2023-05-23T09:36:26.000Z",
              "RolePermission": {
                  "permission_id": 1,
                  "role_id": 1
              }
          }
      ]
    },
  ]

  return (
    <RootStyle>

    
      <Box sx={{ p: { xs: 3, md: 5 } }}>
        
        <TableContainerStyle >
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{backgroundImage:"none"}}></TableCell>
                <TableCell align="center" sx={{backgroundImage:"none"}}>
                  <AnalyticsWidget1
                    title="Superadmin"
                    // total={"Superadmin"}
                    // icon={'ant-design:android-filled'}
                    // color="info"
                  />
                </TableCell>
                <TableCell align="center" sx={{backgroundImage:"none"}}>
                  <AnalyticsWidget1
                    title="Admin"
                    // total={"Superadmin"}
                    // icon={'ant-design:android-filled'}
                    color="info"
                  />
                </TableCell>
                <TableCell align="center" sx={{backgroundImage:"none"}}>
                  <AnalyticsWidget1
                    title="Staff"
                    // total={"Superadmin"}
                    // icon={'ant-design:android-filled'}
                    color="warning"
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell  scope="row">
                    {row.display_name}
                  </TableCell>
                  <TableCell scope="row" align="center">
                    {  row.roles.filter( (v:any) => v.name == "superadmin").length ?
                      <Switch defaultChecked/>
                      : <Switch />
                    }
                  </TableCell>
                  <TableCell scope="row" align="center">
                    {  row.roles.filter( (v:any) => v.name == "admin").length ?
                      <Switch defaultChecked/>
                      : <Switch />
                    }
                  </TableCell>
                  <TableCell scope="row" align="center">
                    { row.roles.filter( (v:any) => v.name == "staff").length ?
                      <Switch defaultChecked/>
                      : <Switch />
                    }
                  </TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainerStyle>
   
      </Box>
    </RootStyle>
  );
}

