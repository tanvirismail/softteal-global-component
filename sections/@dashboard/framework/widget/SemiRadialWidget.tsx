import merge from 'lodash/merge';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, Divider, CardProps } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// utils
import { fNumber } from '@/_global/utils/formatNumber';
// components
import ReactApexChart, { BaseOptionChart } from '@/_global/components/chart';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const CHART_SIZE = { width: 125, height: 125 };

interface Props extends CardProps {
  chartData: {
    label: string;
    total: string;
    min: string;
    max: string;
  };
}

export default function SemiRadialWidget({ chartData, ...other }: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const L = parseInt(chartData.min || '0');
  const H = parseInt(chartData.max);
  const V = parseInt(chartData.total as any);
  const P = fNumber(((V - L) / ( H - L )) * 100);

  // const chartOptionsCheckIn:any = {};
  // useEffect(()=>{
    const chartOptionsCheckIn = merge(BaseOptionChart(), {
      chart: { sparkline: { enabled: true } },
      grid: {
        padding: {
          top: -6,
          bottom: 9,
        },
      },
      legend: { show: false },
      plotOptions: {
        radialBar: {
          startAngle: -110,
          endAngle: 110,
          hollow: { size: '64%' },
          track: { margin: 0 },
          dataLabels: {
            name: { show: false },
            value: {
              show: true,
              offsetY: 6,
              fontSize: theme.typography.subtitle2.fontSize,
            },
            total: {
              // show: false,
              // formatter:  ( opts:any ) => {
              //   const per = fNumber(((opts.globals.seriesTotals[0] / 100) * (H - L)) + L)
              //   return per + '°C';
              // },
            }
          },
        },
      },
    });
  // },[chartData]);

  return (
    <Card {...other}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider
            orientation={isDesktop ? 'vertical' : 'horizontal'}
            flexItem
            sx={{ borderStyle: 'dashed' }}
          />
        }
      >
   
          <Stack
            key={chartData.label}
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={3}
            sx={{ width: 1, py: 4 }}
          >
            <ReactApexChart
              type="radialBar"
              series={[P]}
              options={chartOptionsCheckIn}
              {...CHART_SIZE}
            />

            <div>
              <Typography variant="h4" sx={{ mb: 0.5 }}>
                { (chartData.total) + '°C'} 
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.72 }}>
                {chartData.label}
              </Typography>
            </div>
          </Stack>
      
      </Stack>
    </Card>
  );
}
