import merge from 'lodash/merge';
// @mui
import { Card, CardHeader, Box, CardProps } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '@/_global/components/chart';
import WidgetSettingDialog from '../dialog/WidgetSettingDialog';
// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chartLabels: string[];
  chartData: {
    name: string;
    type: string;
    fill?: string;
    data: number[];
    unit?: string;
    color?: string;
  }[];
}

export default function ChartWidget({
  dialog=false, 
  closeSettingDialog, 
  onSubmitData, 
  id,
  wid,
  inputData,
}: any) {
  const chartLabels=[
    '01-01-03',
    '02-01-03',
    '03-01-03',
    '04-01-03',
    '05-01-03',
    '06-01-03',
  ];

  const chartData = inputData.datastream.map((v:any)=>({
    ...v,
    unit: ":"+v.datastreamID,
    data: [23, 11, 22, 27, 13, 22]
  }));


  // const chartData=[
  //     {
  //         name: inputData.node_name,
  //         type: inputData.node_type,
  //         fill: inputData.node_fill,
  //         data: [23, 11, 22, 27, 13, 22],
  //         unit: inputData.node_unit,
  //         color: inputData.node_color,
  //     },


  //     // {
  //     //     name: 'Temperature',
  //     //     type: 'column',
  //     //     fill: 'solid',
  //     //     data: [23, 11, 22, 27, 13, 22],
  //     //     unit: 'C',
  //     //     color: '#00AB55',
  //     // },
  //     // {
  //     //     name: 'Humidity',
  //     //     type: 'area',
  //     //     fill: 'gradient',
  //     //     data: [44, 55, 41, 67, 22, 43],
  //     //     unit: 'F',
  //     //     color: '#FFE700',
  //     // },
  //     // {
  //     //     name: 'Consumption',
  //     //     type: 'line',
  //     //     fill: 'solid',
  //     //     data: [30, 25, 36, 30, 45, 35],
  //     //     unit: '%',
  //     //     color: '#2D99FF',
  //     // },
  // ];
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '26%' } },
    fill: { type: chartData.map((i:any) => i.fill) },
    colors: chartData.map((i:any) => i.color),
    labels: chartLabels,
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

    chart: {
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        show: inputData.toolbar,
        autoSelected: 'zoom',
        tools: {
          download: false,
          pan: true,
        }
      }
    },
    legend: { 
      show: inputData.legend,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    stroke: {
      curve: inputData.stroke_curve,
      // curve: 'stepline',
      // curve: 'straight',
      // curve: 'smooth',
    },
  
    dataLabels: {
      enabled: inputData.dataLabels,
    },
    // xaxis: {
    //   title: {
    //     text: 'Date'
    //   }
    // },
    // yaxis: {
    //   title: {
    //     text: 'Value'
    //   }
    // },
  });

  return (
    <>
       <WidgetSettingDialog 
        open={dialog} 
        setOpen={closeSettingDialog}
        onSubmitData={(data:any)=>onSubmitData(id,data)}
        data={inputData}
        wid={wid}
        title="Chart Settings"
        subtitle=""
      />
        
      <Card>
        <CardHeader title={inputData.title} subheader={inputData.subheader} />
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
        </Box>
      </Card>
    </>
  );
}
