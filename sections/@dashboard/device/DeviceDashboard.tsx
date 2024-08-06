import NumberField from "@/_global/Ncomponents/form/NumberField";
import Slider from "@/_global/Ncomponents/form/Slider";
import TextField from "@/_global/Ncomponents/form/Text";
import SelectField from "@/_global/Ncomponents/form/Select";
import Iconify from "@/_global/components/Iconify";
import { Avatar, Box, Button, Card, CardHeader, Grid, IconButton, InputBase, Popover, Switch, TableCell, ToggleButton, ToggleButtonGroup, Typography, styled } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import RadialWidget from "../framework/widget/RadialWidget";
import SemiRadialWidget from "../framework/widget/SemiRadialWidget";
import Datatable from "@/_global/Ncomponents/datatable/datatable";
import Label from "@/_global/components/Label";
import { useTheme } from '@mui/material/styles';
import {
    useDataTable
  } from '@/_global/hooks/useDataTable';
  import axios from '@/_global/utils/axios';
  import qs from 'qs';
import ChartWidget from "../framework/widget/ChartWidget";
import HeatmapChartWidget from "../framework/widget/HeatmapChartWidget";
import MiniStatWidget from "../framework/widget/MiniStatWidget";
  

const ToggleButtonGroupStyle = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButton-root': {
        margin: 0,
    },
  }));



export default function DeviceDashboard() {

    const [sliderVvalue, setSliderValue] = useState<any>(5);
    const [selectValue, setSelectValue] = useState<any>("");

    const [alignment, setAlignment] = useState<string | null>('left');

    const handleAlignment = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string | null,
    ) => {
      setAlignment(newAlignment);
    };

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
        { name: 'first_name', label: 'Name', align: 'left' }, // width, minWidth
        { name: 'username', label: 'Username', align: 'left' },
        { name: 'status', label: 'Status', align: 'left' },
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

    // const [test] = useState ({ label: 'Temperature', min: '-10', max: "100", total: '30' });
    const semiRadialData = useMemo (()=>({ label: 'Temperature', min: '-10', max: "100", total: '40' }),[]);

    return (
        <Card sx={{p:3}}>
            {/*
                Control
            */}
            <Grid container spacing={3}>
                {/* Switch  */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ width: '100%' }} >
                            <Typography variant="body1" sx={{color: 'text.disabled'}}>
                                Switch
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex',alignItems: 'center',}}>
                            <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
                                <Typography variant="subtitle2" noWrap>
                                    OFF
                                </Typography>
                            </Box>
                            <Switch />
                        </Box>
                    </Card>
                </Grid>
                {/* Slider  */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                        <Slider
                            field={{
                                label: "Slider",
                                type: "slider",
                                valueLabelDisplay: 'auto',
                                min: 0,
                                max: 10,
                                append: 'input',
                            }} 
                            value={sliderVvalue}
                            setValue={setSliderValue}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setSliderValue(event.target.value === '' ? 0 : event.target.value );
                            }}
                            sx={{mb:1}}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ width: '100%' }} >
                            <Typography variant="body1" sx={{color: 'text.disabled'}}>
                                Switch
                            </Typography>
                        </Box>
                        <ToggleButtonGroupStyle
                            value={alignment}
                            exclusive
                            onChange={handleAlignment}
                            aria-label="text alignment"
                            size="small"
                            color="primary"
                            sx={{m:0}}
                            fullWidth
                        >
                            <ToggleButton value="left" aria-label="left aligned">
                                One
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered">
                                Two
                            </ToggleButton>
                            <ToggleButton value="right" aria-label="right aligned">
                                Three
                            </ToggleButton>
                            <ToggleButton value="justify" aria-label="justified" disabled>
                                Four
                            </ToggleButton>
                        </ToggleButtonGroupStyle>
                    </Card>
                </Grid>
                {/* button  */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ width: '100%' }} >
                            <Typography variant="body1" sx={{color: 'text.disabled'}}>
                                Push Button
                            </Typography>
                        </Box>
                        <Button fullWidth variant="contained" >
                            Fire
                        </Button>
                    </Card>
                </Grid>
                {/* Input  */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ width: '100%',  alignItems: 'stretch' }} >
                            <Typography variant="body1" sx={{color: 'text.disabled'}}>
                                Number
                            </Typography>
                        </Box>
              
                        <NumberField 
                            field={{
                                size: "small",
                                type: "number",
                                placeholder: "Type number",
                            }}
                            inputProps={{style: { textAlign: 'center' }}}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ width: '100%',  alignItems: 'stretch' }} >
                            <Typography variant="body1" sx={{color: 'text.disabled'}}>
                                Text
                            </Typography>
                        </Box>
                        <TextField
                            field={{
                                size: "small",
                                type: "text",
                                placeholder: "Type text"
                            }} 
                        /> 
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ width: '100%',  alignItems: 'stretch' }} >
                            <Typography variant="body1" sx={{color: 'text.disabled'}}>
                                Select
                            </Typography>
                        </Box>
                        <SelectField
                            field={{
                                size: "small",
                                type: "select",
                                placeholder: "Type select",
                                option: [
                                  {value:"asdf",label:"hello"},
                                  {value:"dsf",label:"dsf"},
                                ],
                            }} 
                            value={selectValue}
                            setValue={setSelectValue}
                        /> 
                    </Card>
                </Grid>
            </Grid>

            {/*
                Display
            */}
            <Grid container spacing={3} sx={{mt:1}}>
                {/* LED  */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ display: 'flex',alignItems: 'center', p: 3 }}>
                        <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
                            <Typography variant="body1" sx={{color: 'text.disabled'}} noWrap>
                            LED
                            </Typography>
                        </Box>
                        <IconColor
                            sx={{
                                bgcolor: 'success.main',
                            }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ display: 'flex',alignItems: 'center', p: 3 }}>
                    
                        <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
                            <Typography variant="body1" sx={{color: 'text.disabled'}} noWrap>
                            LED
                            </Typography>
                        </Box>
                        <IconColor
                            sx={{
                                bgcolor: 'warning.main',
                            }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ display: 'flex',alignItems: 'center', p: 3 }}>
                        <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
                            <Typography variant="body1" sx={{color: 'text.disabled'}} noWrap>
                            LED
                            </Typography>
                        </Box>
                        <IconColor
                            sx={{
                                bgcolor: 'error.main',
                            }}
                        />
                    </Card>
                </Grid>

                {/* Card widget  */}
                <Grid item xs={12} md={4}>
                    <MiniStatWidget
                        title="Total water"
                        total={'714 Gal'}
                        // icon={<BookingIllustration />}
                        icon={<Iconify icon={'fluent:device-eq-16-filled'} fontSize={70} color={'success.light'}/>}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* <RadialWidget
                        chartData={[
                        { label: 'Percentage', percent: 70, total: 38566 },
                        ]}
                    /> */}
                </Grid>
                <Grid item xs={12} md={4}>
                    <SemiRadialWidget
                        chartData={semiRadialData}
                    />
                </Grid>

                {/* Statistic  */}
                <Grid item xs={12} md={6}>
                    {/* <ChartWidget
                        title="Chart Widget"
                        // subheader="(+43%) than last year"
                        chartLabels={[
                            '01-01-03',
                            '02-01-03',
                            '03-01-03',
                            '04-01-03',
                            '05-01-03',
                            '06-01-03',
                            '07-01-03',
                        ]}
                        chartData={[
                            {
                                name: 'Temperature',
                                type: 'column',
                                fill: 'solid',
                                data: [23, 11, 22, 27, 13, 22, 37],
                                unit: 'C',
                                color: '#00AB55',
                            },
                            {
                                name: 'Humidity',
                                type: 'area',
                                fill: 'gradient',
                                data: [44, 55, 41, 67, 22, 43, 21],
                                unit: 'F',
                                color: '#FFE700',
                            },
                            {
                                name: 'Consumption',
                                type: 'line',
                                fill: 'solid',
                                data: [30, 25, 36, 30, 45, 35, 64],
                                unit: '%',
                                color: '#2D99FF',
                            },
                        ]}
                    /> */}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card >
                        {/* <HeatmapChartWidget
                            title="Heatmap Chart"
                            // subheader="(+43%) than last year"
                            chartData={[{
                                name: 'Metric1',
                                data: [
                                    {x:'w1',y:15},
                                    {x:'w2',y:25},
                                    {x:'w3',y:35},
                                    {x:'w4',y:45},
                                    {x:'w5',y:55},
                                    {x:'w6',y:65},
                                    {x:'w7',y:75},
                                    {x:'w8',y:85},
                                ]
                              },
                              {
                                name: 'Metric2',
                                data: generateData(8, {
                                  min: 0,
                                  max: 90
                                })
                              },
                              {
                                name: 'Metric3',
                                data: generateData(8, {
                                  min: 0,
                                  max: 90
                                })
                              },
                            ]}
                        /> */}
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card >
                        <MapView/>
                    </Card>
                </Grid>
                <Grid item xs={12}>
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
                        rowsPerPage={queryParams.length}
                        handleRowsPerPage={handleRowsPerPage}
                        // fileExport={['html','pdf','csv','xlsx']}
                        filterFields={filterFields}
                        filterPlaceholder="Search user..."
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
                            </>
                            )
                        }}
                        dense={true}
                    />
                </Grid>
            </Grid>
        </Card>
    )    
}

function IconColor({ sx, ...other }: any) {
    return (
      <Box
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          borderRadius: '50%',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          transition: (theme) =>
            theme.transitions.create('all', {
              duration: theme.transitions.duration.shortest,
            }),
          ...sx,
        }}
        {...other}
      >
        {/* <Iconify icon={'eva:checkmark-fill'} /> */}
      </Box>
    );
}

function MapView(){

    const renderMarkers = (map:any, maps:any) => {
        const marker = new maps.Marker({
            map,
            position: { lat: 23.693745, lng: 90.480639 },
            title: 'Device 1',
            zIndex: 1,
            animation: maps.Animation.DROP,
            icon: {
                path: "M16 2A11.013 11.013 0 0 0 5 13a10.889 10.889 0 0 0 2.216 6.6s.3.395.349.452L16 30l8.439-9.953c.044-.053.345-.447.345-.447l.001-.003A10.885 10.885 0 0 0 27 13A11.013 11.013 0 0 0 16 2Zm0 15a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4Z",
                fillColor: '#229A16',
                fillOpacity: 1,
                anchor: new maps.Point(16,32),
                strokeWeight: 0,
                scale: 1.2
            }
        });
        const contentString = `
            <div id="content">
                <h2 id="firstHeading" class="firstHeading">Device 1</h2>
                <div id="bodyContent">
                    <p>37.7789:-122.4194</p>
                    <p>Last access: 2023-12-12 00:00:00</p>
                </div>
            </div>
        `;
        const infowindow = new maps.InfoWindow({
            content: contentString, 
            ariaLabel: "Uluru",
        });
        const getInfowindow = ()=>{
            infowindow.open({
                anchor: marker,
                map,
            });
        };
        getInfowindow();
        marker.addListener('click', () => getInfowindow());
    };
      
    const defaultProps = {
      center: { lat: 23.693745, lng: 90.480639 },
      zoom: 15
    };
  
    return (
        <div style={{ height: '450px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBKu88idwPB0qzp_t3cKXsdfo1a6MteTDk" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                yesIWantToUseGoogleMapApiInternals
            />
        </div>
    );
}

function generateData(count:any, yrange:any) {
    var _seed = 42;
    Math.random = function() {
      _seed = _seed * 16807 % 2147483647;
      return (_seed - 1) / 2147483646;
    };
    var i = 0;
    var series = [];
    while (i < count) {
        var x = 'w' + (i + 1).toString();
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
            x: x,
            y: y
        });
        i++;
    }
    return series;
}