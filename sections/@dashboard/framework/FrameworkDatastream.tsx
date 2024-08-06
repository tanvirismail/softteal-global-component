import NumberField from "@/_global/Ncomponents/form/NumberField";
import Slider from "@/_global/Ncomponents/form/Slider";
import TextField from "@/_global/Ncomponents/form/Text";
import SelectField from "@/_global/Ncomponents/form/Select";
import Iconify from "@/_global/components/Iconify";
import { Alert, Avatar, Box, Button, Card, CardHeader, Grid, IconButton, InputBase, Popover, Stack, Switch, TableCell, ToggleButton, ToggleButtonGroup, Typography, styled } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import BookingCheckInWidgets from "../general/booking/BookingCheckInWidgets";
import { BookingWidgetSummary } from "../general/booking";
import { BookingIllustration } from "@/assets";
import { AnalyticsWebsiteVisits } from "../general/analytics";
import ContactMap from "@/_global/sections/contact/ContactMap";
import { _mapContact } from "@/_global/_mock";
import GoogleMapReact from 'google-map-react';
import MenuPopover from "@/_global/components/MenuPopover";

import merge from 'lodash/merge';
// components
import ReactApexChart, { BaseOptionChart } from '@/_global/components/chart';
import Datatable from "@/_global/Ncomponents/datatable/datatable";
import Label from "@/_global/components/Label";
import { useTheme } from '@mui/material/styles';
import {
    useDataTable
  } from '@/_global/hooks/useDataTable';
  import axios from '@/_global/utils/axios';
  import qs from 'qs';
import DatastreamDialog from "./dialog/DatastreamDialog";
  


export default function FrameworkDatastream() {

    // Datatable 
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
        { name: 'first_name', label: 'datastream', align: 'left' }, // width, minWidth
        { name: 'username', label: 'value', align: 'left' },
        { name: 'created_at', label: 'timestamp', align: 'left' },
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
    ////////////// rudux ///////////
    // Datatable 

    const [datastreamDialog, setDatastreamDialog] = useState(false);

    return (
        <>
            {/* <Alert severity="info" sx={{mb:3}}>It contains every datastream value sent by end-users.</Alert> */}
            <DatastreamDialog open={datastreamDialog} setOpen={setDatastreamDialog}/>
            <Datatable
                customToolbar={
                    <Button onClick={()=>setDatastreamDialog(true)} variant="contained" sx={{ml:1}} startIcon={<Iconify icon={'eva:plus-fill'} />}>
                        New
                    </Button>
                }
                isLoading={isLoading}
                header={tableHead}
                orderBy={queryParams.order}
                handleOrderBy={handleOrderBy}
                columns={queryParams.columns}
                tableData={tableData}
                recordsTotal={recordsTotal}
                recordsFiltered={recordsFiltered}
                handleSearch={handleSearch}
                filterPlaceholder="Search datastreams..."
                handleFilter={handleFilter}
                getData={getData}
                rowsPerPage={queryParams.length}
                handleRowsPerPage={handleRowsPerPage}
                // fileExport={['html','pdf','csv','xlsx']}
                filterFields={filterFields}
                handleStart={handleStart}
                handleTableReload={handleTableReload}
                rows={(row:any) => {
                    const { id, first_name, last_name, username, email, avatar, status, created_at } = row;
                    return (
                    <>
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt={first_name +' '+ last_name} src={avatar} sx={{ mr: 2 }} />
                        <Typography variant="subtitle2" noWrap>
                            {first_name +' '+ last_name}
                        </Typography>
                        </TableCell>
                        <TableCell align="left">{username}</TableCell>
                        <TableCell align="left">{created_at}</TableCell>
                    </>
                    )
                }}
                dense={true}
            />
         </>
    )    
}
