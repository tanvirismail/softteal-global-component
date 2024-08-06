import { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem } from '@mui/material';
// utils
import { fToNow } from '@/_global/utils/formatTime';
// _mock_
import { _organizations } from '../../../_mock';
// components
import Iconify from '@/_global/components/Iconify';
import Scrollbar from '@/_global/components/Scrollbar';
import MenuPopover from '@/_global/components/MenuPopover';
import BadgeStatus from '@/_global/components/BadgeStatus';
import { IconButtonAnimate } from '@/_global/components/animate';
import { getManageBusinesses, switchBusiness } from '@/api/user';
import useAuth from '@/_global/hooks/useAuth';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

export default function OrganizationSwitchPopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const [businessList, setBusinessList] = useState<any>([]);
  const {manageBusiness} = useAuth();
  const {reload} = useRouter();

  const switchToBusiness = async(id:number) => {
    await switchBusiness(id).then((response:any)=>{
      if(response.data) {
        reload();
      }
    })
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(()=>{
    const businessAccount:any = [];
    getManageBusinesses().then((response:any)=>{
      const data = response.data;
      if(data){
        data.map((userBusiness:any)=>{
          businessAccount.push({
            id: userBusiness.business_id,
            user_business_id: userBusiness.id,
            name: userBusiness.business.name,
            roles: userBusiness.roles,
            avatar: userBusiness.business.logo
          })
        })
      }
      setBusinessList(businessAccount);
    })
  }, [])

  return (
    <>
    { 
      businessList.length > 1 && 
      <>
        <IconButtonAnimate
          color={open ? 'primary' : 'default'}
          onClick={handleOpen}
          sx={{
            width: 40,
            height: 40,
            ...(open && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
            }),
          }}
        >
          <Iconify icon={'eva:toggle-right-fill'} width={20} height={20} />
        </IconButtonAnimate>
        <MenuPopover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          sx={{
            mt: 1.5,
            ml: 0.75,
            width: 320,
            '& .MuiMenuItem-root': {
              px: 1.5,
              height: ITEM_HEIGHT,
              borderRadius: 0.75,
            },
          }}
        >
          <Typography variant="h6" sx={{ p: 1.5 }}>
            Manage Business <Typography component="span">({businessList.length})</Typography>
          </Typography>

          <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
            {businessList.map((business:any) => (
              <MenuItem 
                key={business.id} 
                sx={{ 
                  ...((business.id == manageBusiness?.business_id) ? {backgroundColor: 'background.neutral'} : {})
                }}
                onClick={()=>switchToBusiness(business.user_business_id)}
               >
                <ListItemAvatar sx={{ position: 'relative' }}>
                  <Avatar src={business.avatar} />
                </ListItemAvatar>

                <ListItemText
                  primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                  secondaryTypographyProps={{ typography: 'caption' }}
                  primary={business.name}
                  secondary={business.roles.map((v:any)=>v.display_name)}
                />
              </MenuItem>
            ))}
          </Scrollbar>
        </MenuPopover>
      </>
    }
    </>
  );
}
