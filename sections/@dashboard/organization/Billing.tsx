import { useCallback, useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import {
  TableCell,
  Avatar,
  Typography,
  Box
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';

import { PATH_DEVICE, PATH_DASHBOARD } from '@/routes';
import Iconify from '@/_global/components/Iconify';
import axios from '@/_global/utils/axios';
import qs from 'qs';
import Label from '@/_global/components/Label';
import Datatable from '@/_global/Ncomponents/datatable/datatable';
import TableActionCell from '@/_global/Ncomponents/datatable/TableActionCell';
import download from 'downloadjs';
import {
  useDataTable
} from '@/_global/hooks/useDataTable';
import EditOrganizationUser from './EditOrganizationUser';
// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
});

// ----------------------------------------------------------------------

export default function Billing() {

  const { push } = useRouter();
  const theme = useTheme();

  const { 
    isLoading, setIsLoading,
    checkbox, setCheckbox,
    recordsTotal, setRecordsTotal,
    recordsFiltered, setRecordsFiltered,
    tableData, setTableData,
    queryParams, setQueryParams,
    handleStart,
    handleRowsPerPage,
    handleSearch,
    handleFilter,
    handleOrderBy
  } = useDataTable();

  const tableHead = [
    { name: 'first_name', label: 'Name', align: 'left' }, // width, minWidth
    { name: 'email', label: 'Email', align: 'left' },
    { name: 'username', label: 'Username', align: 'left' },
    { name: 'status', label: 'Status', align: 'left' },
    { name: '' },
  ];
 
  useEffect(() => {
    setQueryParams( (q:any) => ({...q, 
      columns: [
        { data: "first_name" },
        { data: "last_name" },
        { data: "email" },
        { data: "username" },
        { data: "status" },
        { data: "created_at", searchable: "false" },
        { data: "action", searchable: "false", orderable: "false" },
      ] 
    }));
  }, []);

  // filter
  const filterFields = {
    fields: {
      name: {
        label: "Name",
        type: "text",
        placeholder: "Type user name",
      },
      status: {
        label: "Status",
        type: "select",
        placeholder: "Select status",
        option: [
          {value:"1",label:"Active"},
          {value:"0",label:"Inactive"},
        ],
      },
    },
    rules : {
      // name: Yup.string().required('name is required'),
      // status: Yup.string().required('status is required'),
    },
    formData: {
      name: "",
      status: "",
    },
  }
  // filter



  ////////////// rudux ///////////
  // get data
  const getData = useCallback(async () => {
    setIsLoading(true)
    try {
      // const response = {
      //   draw: 0,
      //   recordsTotal: 200,
      //   recordsFiltered: 15,
      //   data: data
      // }

      const response = await axios.get('/api/user/datatable' + "?" + qs.stringify(queryParams));     
      const resData = response.data.data;
       
      setTableData(resData.rows);
      setRecordsFiltered(resData.count);
      setRecordsTotal(resData.recordsTotal);
      setIsLoading(false)

    } catch (error) {
      console.log(error);
    }
  }, [ queryParams ]);

  useEffect(() => {
    getData();
  }, [queryParams]);

  // table reload
  const handleTableReload = () => {
    getData();
  }
  // get data

  // delete action
  const handleDeleteRow = async(id: string) => {
    console.log(id);
    console.log("delete");
    return true
  };
  const handleDeleteRows = (selected: string[]) => {
    console.log(selected);
    console.log("multiple delete");
    return true
  };
  // delete action

  // export report
  const handleFileExport = async(type:string) => {
    console.log( "call api for "+type );
    try {
      if(type == 'pdf'){
        const response = await axios.get('/api/export/pdf',{
          responseType: "arraybuffer",
        });
        download( new Blob([response.data]), "invoice.pdf" ); 
      }
      else if(type == 'csv'){
        const response = await axios.get('/api/export/csv',{
          responseType: "arraybuffer",
        });
        download( new Blob([response.data]), "invoice.csv" ); 
      }
      else if(type == 'xlsx'){
        const response = await axios.get('/api/export/xlsx',{
          responseType: "arraybuffer",
        });
        download( new Blob([response.data]), "invoice.xlsx" ); 
      }
      else if(type == 'html'){
        push(PATH_DEVICE.device.deviceExportHtml)
      }
    } catch (error) {
      console.log(error);
    }
    return true;
  }
  // export report
  ////////////// rudux ///////////

  const [openDialog, setOpenDialog] = useState(false);
  const handleEdit = async(id: string) => {
    setOpenDialog(true);
  };
  
  return (
    <RootStyle>
      <Box sx={{ p: { xs: 3, md: 5 } }}>
        <EditOrganizationUser open={openDialog} setOpen={setOpenDialog}/>
        <Datatable
          isLoading={isLoading}
          header={tableHead}
          orderBy={queryParams.order}
          handleOrderBy={handleOrderBy}
          columns={queryParams.columns}
          tableData={tableData}
          recordsTotal={recordsTotal}
          recordsFiltered={recordsFiltered}
          handleSearch={handleSearch}
          handleFilter={handleFilter}
          getData={getData}
          checkbox={checkbox}
          handleSelectedAction={handleDeleteRows}
          rowsPerPage={queryParams.length}
          handleRowsPerPage={handleRowsPerPage}
          handleFileExport={handleFileExport}
          // fileExport={['html','pdf','csv','xlsx']}
          filterFields={filterFields}
          filterPlaceholder="Search biling..."
          handleStart={handleStart}
          handleTableReload={handleTableReload}
          rows={(row:any) => {
            const { id, first_name, last_name, username, email, avatar, status } = row;
            return (
              <>
                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar alt={first_name +' '+ last_name} src={avatar} sx={{ mr: 2 }} />
                  <Typography variant="subtitle2" noWrap>
                    {first_name +' '+ last_name}
                  </Typography>
                </TableCell>
                <TableCell align="left">{email}</TableCell>
                <TableCell align="left">{username}</TableCell>
                <TableCell align="left">
                  <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={(status == '0' && 'error') || 'success'}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {status == '0' ? 'Inactive' : 'Active'}
                  </Label>
                </TableCell>
                <TableActionCell lists={[
                   {
                    label: "View",
                    icon: <Iconify icon={'eva:eye-outline'} />,
                    action: () => push(PATH_DASHBOARD.organization.biling.details(id)),
                  },
                ]}/>
              </>
            )
          }}
          sx={{card:{backgroundColor:"transparent", boxShadow: "none"}}}
          dense={true}
        />

      </Box>
    </RootStyle>
  );
}
