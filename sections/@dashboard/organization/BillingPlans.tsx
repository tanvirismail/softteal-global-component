import { m } from 'framer-motion';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Link,
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  Switch,
} from '@mui/material';
// _mock_
import { _homePlans } from '@/_global/_mock';
// components
import Image from '@/_global/components/Image';
import Iconify from '@/_global/components/Iconify';
import { varFade, MotionViewport } from '@/_global/components/animate';
// _mock_
import { _pricingPlans } from '@/_global/_mock';
import { ReactElement } from 'react';
import Label from '@/_global/components/Label';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function BillingPlans() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const plans = [
    {
      subtitle: "LICENCE",
      title: "Free",
      options: [
        'One end products',
        '12 months updates',
        '6 months of support',
        'JavaScript version',
        'TypeScript version',
        'Design Resources',
        'Commercial applications',
      ],
    }
  ]

  return (
    <RootStyle>
        <Container sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h4" align="center" paragraph>
            Flexible plans for your Business needs
          </Typography>

          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Choose your plan and make space for the IOT platform
          </Typography>

          <Box sx={{ my: 5 }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              <Typography variant="overline" sx={{ mr: 1.5 }}>
                MONTHLY
              </Typography>

              <Switch />
              <Typography variant="overline" sx={{ ml: 1.5 }}>
                YEARLY (save 10%)
              </Typography>
            </Stack>

            {/* <Typography
              variant="caption"
              align="right"
              sx={{ color: 'text.secondary', display: 'block' }}
            >
              * Plus applicable taxes
            </Typography> */}
          </Box>

          <Grid container spacing={2}>
            {_pricingPlans.map((card, index) => (
              <Grid item xs={12} md={4} key={card.subscription}>
                <PricingPlanCard card={card} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------
const PricingPlanCardRootStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3),
}));
type Props = {
  card: {
    subscription: string;
    price: number;
    caption: string;
    icon: ReactElement;
    labelAction: string;
    lists: {
      text: string;
      isAvailable: boolean;
    }[];
  };
  index: number;
};
function PricingPlanCard({ card, index }: Props) {
  const { subscription, icon, price, caption, lists, labelAction } = card;

  return (
    <PricingPlanCardRootStyle>
      {index === 1 && (
        <Label color="info" sx={{ top: 16, right: 16, position: 'absolute' }}>
          POPULAR
        </Label>
      )}

      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        {subscription}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        {index !== 0 ? (
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            $
          </Typography>
        ) : (
          ''
        )}
        <Typography variant="h2" sx={{ mx: 1 }}>
          {price === 0 ? 'Free' : price}
        </Typography>
        {index !== 0 ? (
          <Typography
            gutterBottom
            component="span"
            variant="subtitle2"
            sx={{
              alignSelf: 'flex-end',
              color: 'text.secondary',
            }}
          >
            /mo
          </Typography>
        ) : (
          ''
        )}
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize',
        }}
      >
        {caption}
      </Typography>

      <Box sx={{ width: 80, height: 80, mt: 3 }}>{icon}</Box>

      <Stack component="ul" spacing={2} sx={{ my: 5, width: 1 }}>
        {lists.map((item) => (
          <Stack
            key={item.text}
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ typography: 'body2', color: item.isAvailable ? 'text.primary' : 'text.disabled' }}
          >
            <Iconify icon={'eva:checkmark-fill'} sx={{ width: 20, height: 20 }} />
            <Typography variant="body2">{item.text}</Typography>
          </Stack>
        ))}
      </Stack>

      <Button fullWidth size="large" variant="contained" disabled={index === 0}>
        {labelAction}
      </Button>
    </PricingPlanCardRootStyle>
  );
}