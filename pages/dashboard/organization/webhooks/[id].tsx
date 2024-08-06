
// @mui
import { Container, Card, Button, Grid, Stack, IconButton, Divider, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@/routes';
// hooks
import useSettings from '@/_global/hooks/useSettings';
// layouts
import Layout from '@/_global/layouts';
// components
import Page from '@/_global/components/Page';
import HeaderBreadcrumbs from '@/_global/components/HeaderBreadcrumbs';
// sections
import Sidebar from '@/_global/sections/@dashboard/organization/SideBar';
import Webhook from '@/_global/sections/@dashboard/organization/Webhook';

import NextLink from 'next/link';
import AddWebHook from '@/_global/sections/@dashboard/organization/AddWebHook';

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

import { PATH_DEVICE } from '@/routes';
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
import MenuPopover from '@/_global/components/MenuPopover';
import { useSnackbar } from 'notistack';
import EditWebHook from '@/_global/sections/@dashboard/organization/EditWebHook';
// ----------------------------------------------------------------------

WebhookDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function WebhookDetails() {

    const { themeStretch } = useSettings();

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


    const [open, setOpen] = useState<HTMLElement | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const handleTest = () => {
      enqueueSnackbar( "Webhook successfully sent" );
      // enqueueSnackbar( 'Error sending webhook', { variant: 'error' })
    }
    const [openDialog, setOpenDialog] = useState(false);
    const handleEdit = async(id: string) => {
      setOpenDialog(true);
    };

    return (
        <Page title="Webhooks details">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Webhooks details"
                    links={[
                    {
                        name: 'Dashboard',
                        href: PATH_DASHBOARD.root,
                    },
                    { name: 'Organization' },
                    { name: 'Webhooks' },
                    { name: 'Details' },
                    ]}
                />

                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <Card sx={{ p: 3 }}>

                            <Stack sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                {/* <Avatar alt="avatar" src="" sx={{ width: 48, height: 48 }} /> */}
                
                                <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
                                    <Typography variant="subtitle2" noWrap sx={{color:"primary.main"}}>
                                        Test Webhook
                                    </Typography>
                
                                    {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                        Users 1 of 5
                                    </Typography>
                                    </Box> */}
                                </Box>
                                <>
                                    <IconButton onClick={(event: React.MouseEvent<HTMLElement>) => {
                                        setOpen(event.currentTarget);
                                    }}>
                                        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
                                    </IconButton>
                                    <MenuPopover
                                        open={Boolean(open)}
                                        anchorEl={open}
                                        onClose={() => setOpen(null) }
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        arrow="top-right"
                                        sx={{
                                        //   mt: -1,
                                            // width: 450,
                                            px: 2,
                                            py: 2,
                                            '& .MuiMenuItem-root': {
                                            px: 1,
                                            typography: 'body2',
                                            borderRadius: 0.75,
                                            '& svg': { mr: 2, width: 20, height: 20 },
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={()=>handleTest()}>
                                           <Iconify icon={'eva:globe-outline'} />Test
                                        </MenuItem>
                                        <MenuItem onClick={()=>handleEdit("1")}>
                                           <Iconify icon={'eva:edit-outline'} />Edit
                                        </MenuItem>
                                        <MenuItem sx={{color: 'warning.main'}}>
                                           <Iconify icon={'eva:power-outline'} />Disable
                                        </MenuItem>
                                        <MenuItem sx={{color: 'error.main'}}>
                                            <Iconify icon={'eva:trash-2-outline'} />Delete
                                        </MenuItem>

                                    </MenuPopover>
                                </>
                                
                            </Stack>
                            <Divider sx={{ mt: 2, mb: 3 }} />

                            <Stack>
                                <Typography variant="subtitle2">Webhook URL</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    http://www.softteal.com
                                </Typography>
                            </Stack>
                            <Stack sx={{mt:3}} >
                                <Typography variant="subtitle2">Status</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Enable
                                </Typography>
                            </Stack>
                            <Stack sx={{mt:3}} >
                                <Typography variant="subtitle2">Trigger Event</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Send device data
                                </Typography>
                            </Stack>
                            <Stack sx={{mt:3}} >
                                <Typography variant="subtitle2" >Device name</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    device 1
                                </Typography>
                            </Stack>
                            <Stack sx={{mt:3}} >
                                <Typography variant="subtitle2" >Request type</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    GET
                                </Typography>
                            </Stack>
                            <Stack sx={{mt:3}} >
                                <Typography variant="subtitle2" >Content type</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    JSON
                                </Typography>
                            </Stack>
                            <Stack sx={{mt:3}} >
                                <Typography variant="subtitle2" >Authorization method</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    None
                                </Typography>
                            </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={9}>
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
                            filterPlaceholder="Search log..."
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
                                        action: () => push(PATH_DASHBOARD.organization.webhook.details(id)),
                                    },
                                    ]}/>
                                </>
                                )
                            }}
                            // sx={{card:{backgroundColor:"transparent", boxShadow: "none"}}}
                            // dense={true}
                        />
                    </Grid>
                </Grid>

                <EditWebHook open={openDialog} setOpen={setOpenDialog}/>

            </Container>
        </Page>
    )
}