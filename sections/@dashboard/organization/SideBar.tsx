import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Avatar, Card, Drawer, Link, Typography } from '@mui/material';

// hooks
import useResponsive from '@/_global/hooks/useResponsive';
// config
import { NAVBAR } from '@/_global/config';
// components
import Scrollbar from '@/_global/components/Scrollbar';

import SidebarItem from '@/_global/sections/@dashboard/organization/SidebarItem';
// ----------------------------------------------------------------------

type Props = {
    isOpenSidebar: boolean;
    onCloseSidebar: VoidFunction;
};

export default function Sidebar({ isOpenSidebar, onCloseSidebar }: Props) {
    const { pathname } = useRouter();

    const MenuItems = [
        {
            title: "Organizations settings",
            items: [
                {href:"/dashboard/organization/general/", icon: "ri:building-2-fill", text: "General"},
                {href:"/dashboard/organization/users/", icon: "eva:people-fill", text: "Users"},
                {href:"/dashboard/organization/billing/", icon: "eva:credit-card-fill", text: "Billing"},
                {href:"/dashboard/organization/plan/", icon: "eva:bulb-fill", text: "Plan"},
                {href:"/dashboard/organization/privileges/", icon: "eva:toggle-right-fill", text: "Privileges"},
            ]
        },
        {
            title: "Developer",
            items: [
                {href:"/dashboard/organization/webhooks/", icon: "eva:attach-fill", text: "Webhooks"},
                // {href:"/dashboard/organization/rest-api/", icon: "eva:link-fill", text: "REST API"},
            ]
        }
    ]
    const isDesktop = useResponsive('up', 'md');

    useEffect(() => {
        if (isOpenSidebar) {
        onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const renderContent = (
        <Scrollbar>
            <Card
                sx={{
                    py: 5,
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                    flexDirection: 'column',
                    borderRadius: 0,
                }}
                >
                <Avatar alt="alt" src="" sx={{ width: 64, height: 64, mb: 3 }} />
           
                <Link variant="subtitle1" color="text.primary">
                    Software ltd
                </Link>
            </Card>

            { MenuItems.map( (menus, index) => <SidebarItem key={index} menus={menus} /> ) }
        </Scrollbar>
    );

    return (
        <>
        {isDesktop ? (
            <Drawer
            variant="permanent"
            PaperProps={{ sx: { width: NAVBAR.BASE_WIDTH, position: 'relative' } }}
            >
            {renderContent}
            </Drawer>
        ) : (
            <Drawer
            open={isOpenSidebar}
            onClose={onCloseSidebar}
            ModalProps={{ keepMounted: true }}
            PaperProps={{ sx: { width: NAVBAR.BASE_WIDTH } }}
            >
            {renderContent}
            </Drawer>
        )}
        </>
    );
}
