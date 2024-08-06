import NumberField from "@/_global/Ncomponents/form/NumberField";
import Slider from "@/_global/Ncomponents/form/Slider";
import TextField from "@/_global/Ncomponents/form/Text";
import SelectField from "@/_global/Ncomponents/form/Select";
import Iconify from "@/_global/components/Iconify";
import { Alert, Avatar, Box, Button, Card, CardHeader, Grid, IconButton, InputBase, Paper, Popover, Stack, Switch, TableCell, ToggleButton, ToggleButtonGroup, Typography, styled } from "@mui/material";
import { ReactElement, useCallback, useEffect, useState } from "react";
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
import { Block } from '@/_global/sections/overview/Block';
import {
    Masonry,
    Timeline,
    TimelineDot,
    TimelineItem,
    TimelineContent,
    TimelineSeparator,
    TimelineConnector,
    TimelineOppositeContent,
    timelineOppositeContentClasses,
  } from '@mui/lab';
  import { capitalCase } from 'change-case';

  type TimelineType = {
    key: number;
    title: string;
    des: string;
    time: string;
    color?: 'primary' | 'info' | 'success' | 'warning' | 'error' | 'inherit' | 'grey' | 'secondary';
    type: 'info' | 'warning' | 'critical' | 'content' | 'resolved';
    icon: ReactElement;
  };
  
  const TIMELINES: TimelineType[] = [
    {
      key: 1,
      title: 'Default',
      des: 'Morbi mattis ullamcorper',
      time: '09:30 am',
      icon: <Iconify icon="eva:folder-add-fill" width={24} height={24} />,
      type: 'content'
    },
    {
      key: 2,
      title: 'Primary',
      des: 'Morbi mattis ullamcorper',
      time: '10:00 am',
      color: 'primary',
      icon: <Iconify icon="eva:image-2-fill" width={24} height={24} />,
      type: 'resolved'
    },
    {
      key: 3,
      title: 'Secondary',
      des: 'Morbi mattis ullamcorper',
      time: '10:00 am',
      color: 'secondary',
      icon: <Iconify icon="eva:pantone-fill" width={24} height={24} />,
      type: 'info'
    },
    {
      key: 4,
      title: 'Info',
      des: 'Morbi mattis ullamcorper',
      time: '10:30 am',
      color: 'info',
      icon: <Iconify icon="eva:tv-fill" width={24} height={24} />,
      type: 'info'
    },
    {
      key: 5,
      title: 'Success',
      des: 'Morbi mattis ullamcorper',
      time: '11:00 am',
      color: 'success',
      icon: <Iconify icon="eva:activity-fill" width={24} height={24} />,
      type: 'resolved'
    },
    {
      key: 6,
      title: 'Warning',
      des: 'Morbi mattis ullamcorper',
      time: '11:30 am',
      color: 'warning',
      icon: <Iconify icon="eva:cube-fill" width={24} height={24} />,
      type: 'warning'
    },
    {
      key: 7,
      title: 'Error',
      des: 'Morbi mattis ullamcorper',
      time: '12:00 am',
      color: 'error',
      icon: <Iconify icon="eva:film-fill" width={24} height={24} />,
      type: 'critical'
    },
  ];

export default function DeviceTimeline() {
    const lastItem = TIMELINES[TIMELINES.length - 1].key;
    const reduceTimeLine = TIMELINES.slice(TIMELINES.length - 3);
    return (
        <>
        <Alert severity="info" sx={{mb:3}}>Here you can see events logs in sequential order (latest to earliest)..</Alert>
        <Card sx={{p:3}}>
           
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.1,
        },
      }}
    >
      {reduceTimeLine.map((item) => (
        <TimelineItem key={item.key}>
          <TimelineOppositeContent color="textSecondary">
            {capitalCase(item.type)}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={item.color}/>
            {lastItem === item.key ? null : <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle1">{item.title}</Typography>
            <Typography variant="caption">{item.time}</Typography>
            <Paper
              sx={{
                p: 3,
                bgcolor: 'grey.50012',
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.des}
              </Typography>
            </Paper>
            
            
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
      


        </Card>
        </>
    )    
}
