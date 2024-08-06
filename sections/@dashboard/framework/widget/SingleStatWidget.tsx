import { ReactElement, useState } from 'react';
// @mui
import { Card, Typography, Box, CardProps } from '@mui/material';
// utils
import { fShortenNumber } from '@/_global/utils/formatNumber';
import Iconify from '@/_global/components/Iconify';
import WidgetSettingDialog from "../dialog/WidgetSettingDialog";
// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: string;
  icon?: ReactElement;
}

export default function SingleStatWidget({ 
  dialog=false, 
  closeSettingDialog, 
  onSubmitData, 
  id,
  wid,
  inputData,
  sx,
}: any) {

  const [data, setData] = useState(440);

  return (
    <>
      <WidgetSettingDialog 
        open={dialog} 
        setOpen={closeSettingDialog}
        onSubmitData={(data:any)=>onSubmitData(id,data)}
        data={inputData}
        wid={wid}
        title="SingleStat Settings"
        subtitle=""
      />
    
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          pl: 3,
          ...sx,
        }}
      >
        <div>
          <Typography variant="h5">{(data)}</Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {inputData.title}
          </Typography>
        </div>

        <Box
          sx={{
            width: 120,
            height: 120,
            lineHeight: 0,
            borderRadius: '50%',
            bgcolor: 'background.neutral',
            display: "flex",
            alignItems: "center",
            justifyContent: "center" 
          }}
        >
          <Iconify icon={inputData.icon} fontSize={70} color={'success.light'}/>
        </Box>
      </Card>
    </>
  );
}
