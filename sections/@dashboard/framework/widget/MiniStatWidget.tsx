import { ReactElement } from 'react';
// @mui
import { Card, Typography, Box, CardProps } from '@mui/material';
// utils
import { fShortenNumber } from '@/_global/utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: string;
  icon?: ReactElement;
}

export default function MiniStatWidget({ title, total, icon, sx, ...other }: Props) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        pl: 3,
        ...sx,
      }}
      {...other}
    >
      <div>
        <Typography variant="h5">{(total)}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
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
        {icon}
      </Box>
    </Card>
  );
}
