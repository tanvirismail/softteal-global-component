// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Typography, ListItemText, ListItemButton, Box, List } from '@mui/material';
// components
import Iconify from '@/_global/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  menus: any;
};

export default function SidebarItem({ menus, ...other }: Props) {
  const { asPath } = useRouter();

  return (
    <>
      <Box sx={{ml: 2, my: 1 }}>
          <Typography  variant="subtitle2">{menus.title}</Typography>
      </Box>
      <List disablePadding>
      { menus.items.map((item:any,key:any)=>(
        <NextLink key={key} href={item.href} passHref>
          <ListItemButton
            sx={{
              px: 3,
              height: 48,
              typography: 'body2',
              color: 'text.secondary',
              textTransform: 'capitalize',
              ...((asPath===item.href) && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightMedium',
                  bgcolor: 'action.selected',
              }),
            }}
            {...other}
          >
            <Iconify
              icon={item.icon}
              sx={{ mr: 2, width: 22, height: 22 }}
            />
            <ListItemText disableTypography primary={item.text} />
          </ListItemButton>
        </NextLink>
      )) }
      </List>
    </>
  );
}
