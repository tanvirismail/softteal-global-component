// @mui
import { Stack, Link, Button, Typography } from '@mui/material';
// utils
import { fDate } from '@/_global/utils/formatTime';
import { fCurrency } from '@/_global/utils/formatNumber';
// @types
import { UserInvoice } from '../../../../@types/user';
// components
import Iconify from '@/_global/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  invoices: UserInvoice[];
};

export default function AccountBillingInvoiceHistory({ invoices }: Props) {
  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="subtitle1" sx={{ width: 1 }}>
        Invoice History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {invoices.map((invoice) => (
          <Stack key={invoice.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 160 }}>
              {fDate(invoice.createdAt)}
            </Typography>
            <Typography variant="body2">{fCurrency(invoice.price)}</Typography>
            <Link>PDF</Link>
          </Stack>
        ))}
      </Stack>

      <Button size="small" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
        All invoices
      </Button>
    </Stack>
  );
}
