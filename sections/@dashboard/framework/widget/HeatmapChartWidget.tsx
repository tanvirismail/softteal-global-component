import merge from 'lodash/merge';
// @mui
import { Card, CardHeader, Box, CardProps } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '@/_global/components/chart';
import WidgetSettingDialog from '../dialog/WidgetSettingDialog';

// ----------------------------------------------------------------------


export default function HeatmapChartWidget({
  dialog=false, 
  closeSettingDialog, 
  onSubmitData, 
  id,
  wid,
  inputData,
}: any ) {


  const chartData = inputData.datastream.map((v:any)=>({
    ...v,
    unit: ":"+v.datastreamID,
    data: [
      {x:'w1',y:15},
      {x:'w2',y:25},
      {x:'w3',y:35},
      {x:'w4',y:45},
      {x:'w5',y:55},
      {x:'w6',y:65},
      {x:'w7',y:75},
    ]
  }));


  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: {
      heatmap: {
        radius: 10,
        colorScale: {
          inverse: inputData.inverse,
        },
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number,t:any) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} `+chartData[t.seriesIndex]?.unit;
          }
          return y;
        },
      },
    },
    dataLabels: {
      enabled: inputData.dataLabels,
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
        title="Heatmap Settings"
        subtitle=""
      />
    
      <Card >
          <CardHeader title={inputData.title} subheader={inputData.subheader} />
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
              <ReactApexChart type="heatmap" series={chartData} options={chartOptions} height={364} />
          </Box>
      </Card>
    </>
  );
}
