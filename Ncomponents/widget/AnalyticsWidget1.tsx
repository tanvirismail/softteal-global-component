// @mui
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, CardProps } from '@mui/material';
// utils
import { fShortenNumber } from '@/_global/utils/formatNumber';
// theme
import { ColorSchema } from '@/_global/theme/palette';
// components
import Iconify from '@/_global/components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  total?: string;
  icon?: string;
  color?: ColorSchema;
}

export default function AnalyticsWidget1({
  title,
  total,
  icon,
  color = 'primary',
  sx,
  ...other
}: Props) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      { icon && 
        <IconWrapperStyle
          sx={{
            color: (theme) => theme.palette[color].dark,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                theme.palette[color].dark,
                0.24
              )} 100%)`,
          }}
        >
          <Iconify icon={icon} width={24} height={24} />
        </IconWrapperStyle>
      }

      { total && <Typography variant="h3">{ total }</Typography> }
      { title &&
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      }
    </Card>
  );
}
