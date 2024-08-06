import NumberField from "@/_global/Ncomponents/form/NumberField";
import Slider from "@/_global/Ncomponents/form/Slider";
import TextField from "@/_global/Ncomponents/form/Text";
import SelectField from "@/_global/Ncomponents/form/Select";
import Iconify from "@/_global/components/Iconify";
import { Avatar, Box, Button, Card, CardHeader, Grid, IconButton, InputBase, Popover, Stack, Switch, TableCell, ToggleButton, ToggleButtonGroup, Typography, styled } from "@mui/material";
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
import RadialWidget from "./DashboardWidget/RadialWidget";
import SemiRadialWidget from "./DashboardWidget/SemiRadialWidget";
import Datatable from "@/_global/Ncomponents/datatable/datatable";
import Label from "@/_global/components/Label";
import { useTheme } from '@mui/material/styles';
import {
    useDataTable
  } from '@/_global/hooks/useDataTable';
  import axios from '@/_global/utils/axios';
  import qs from 'qs';
  import NextLink from 'next/link';

export default function DeviceInfo() {

    return (
        <Card sx={{p:3}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                        {/* <Avatar alt="avatar" src="" sx={{ width: 48, height: 48 }} /> */}
                        <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
                            <Typography variant="subtitle2" noWrap>
                                Device name
                            </Typography>
        
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                Test device
                            </Typography>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                        {/* <Avatar alt="avatar" src="" sx={{ width: 48, height: 48 }} /> */}
                        <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
                            <Typography variant="subtitle2" noWrap>
                                Phone
                            </Typography>
        
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                87687698
                            </Typography>
                            </Box>
                        </Box>
                        <NextLink href="/dashboard/organization/plan/" passHref>
                            <Button
                            size="small"
                            // onClick={() => setToogle(!toggle)}
                            variant={'outlined'}
                            color={ 'primary' }
                            startIcon={ <Iconify icon={'eva:edit-outline'} /> }
                            sx={{ flexShrink: 0 }}
                            >
                                Edit
                            </Button>
                        </NextLink>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                        {/* <Avatar alt="avatar" src="" sx={{ width: 48, height: 48 }} /> */}
                        <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
                            <Typography variant="subtitle2" noWrap>
                            Hotspot
                            </Typography>
        
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                TT
                            </Typography>
                            </Box>
                        </Box>
                        <NextLink href="/dashboard/organization/plan/" passHref>
                            <Button
                            size="small"
                            // onClick={() => setToogle(!toggle)}
                            variant={'outlined'}
                            color={ 'primary' }
                            startIcon={ <Iconify icon={'eva:edit-outline'} /> }
                            sx={{ flexShrink: 0 }}
                            >
                                Edit
                            </Button>
                        </NextLink>
                    </Card>
                </Grid>
            </Grid>
        </Card>
    )    
}
