import merge from 'lodash/merge';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, Divider, CardProps } from '@mui/material';
// hooks
import useResponsive from '@/_global/hooks/useResponsive';
// utils
import { fNumber } from '@/_global/utils/formatNumber';
// components
import ReactApexChart, { BaseOptionChart } from '@/_global/components/chart';
import WidgetSettingDialog from '../dialog/WidgetSettingDialog';

// ----------------------------------------------------------------------

const CHART_SIZE = { width: 120, height: 120 };

interface Props extends CardProps {
  chartData: {
    label: string;
    percent: number;
    total: number;
  }[];
}

export default function RadialWidget({ 
  dialog=false, 
  closeSettingDialog, 
  onSubmitData, 
  id,
  wid,
  inputData,
}: any) {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'sm');

  const chartData = [
    { label: 'Percentage', percent: 70, total: 38566 },
  ];

  const chartOptionsCheckIn = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    grid: {
      padding: {
        top: -9,
        bottom: -9,
      },
    },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
  });


  return (
    <>
      <WidgetSettingDialog 
        open={dialog} 
        setOpen={closeSettingDialog}
        onSubmitData={(data:any)=>onSubmitData(id,data)}
        data={inputData}
        wid={wid}
        title="Radial Settings"
        subtitle=""
      />
        
      <Card >
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
          {chartData.map((item, index) => (
            <Stack
              key={item.label}
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={3}
              sx={{ width: 1, py: 3 }}
            >
              <ReactApexChart
                type="radialBar"
                series={[item.percent]}
                options={ chartOptionsCheckIn }
                {...CHART_SIZE}
              />

              <div>
                <Typography variant="h4" sx={{ mb: 0.5 }}>
                  {fNumber(item.total)}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.72 }}>
                  {inputData.title}
                </Typography>
              </div>
            </Stack>
          ))}
        </Stack>
      </Card>
    </>
  );
}
