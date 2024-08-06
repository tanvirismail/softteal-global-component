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
  


export default function DeviceInfo() {

    return (
        <Card sx={{p:3}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Stack>
                        <Typography variant="subtitle2">Device ID</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            sdfds345rd
                        </Typography>
                    </Stack>
                    <Stack sx={{mt:2}}>
                        <Typography variant="subtitle2">Device Activated</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            2023-12-12 00:00:00
                        </Typography>
                    </Stack>
                    <Stack sx={{mt:2}}>
                        <Typography variant="subtitle2">Last updated</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            2023-12-12 00:00:00
                        </Typography>
                    </Stack>
                    <Stack sx={{mt:2}}>
                        <Typography variant="subtitle2">Last metadata updated</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            2023-12-12 00:00:00
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack>
                        <Typography variant="subtitle2">Organization</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            XYZ
                        </Typography>
                    </Stack>
                    <Stack sx={{mt:2}}>
                        <Typography variant="subtitle2">Platform</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            SofttealIOT
                        </Typography>
                    </Stack>
                    <Stack sx={{mt:2}}>
                        <Typography variant="subtitle2">Auth token</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            df4545 *******
                        </Typography>
                    </Stack>
                    <Stack sx={{mt:2}}>
                        <Typography variant="subtitle2">Heartbeat Interval</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            10
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Stack>
                        <Typography variant="subtitle2">Framework</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Smart water meter 
                        </Typography>
                    </Stack>
                    <Stack sx={{mt:2}}>
                        <Typography variant="subtitle2">Framework ID</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            sdfsf454sfd
                        </Typography>
                    </Stack>
                    <Stack sx={{mt:2}}>
                        <Typography variant="subtitle2">Firmware configaration</Typography>
                        <Card sx={{p:1, color: 'white', bgcolor: 'black'}}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Framework = "smart_water_meter"
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Framework_ID = "sdfer34"
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Device_ID = "sdfe34"
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Auth_Token = "sdfsdf"
                            </Typography>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )    
}
