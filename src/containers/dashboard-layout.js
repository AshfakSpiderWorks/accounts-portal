import { Outlet } from 'react-router-dom';
import {

    useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Footer } from '../components/footer';

import { DashboardSidebar } from '../components/dashboard-sidebar';
import { useSettings } from "../contexts/Settings/settings-context";

import ButtonAppBar from './Navbar';
import { Helmet } from 'react-helmet-async';


const DashboardLayoutContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
}));



export const DashboardLayout = () => {
    const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const { settings, saveSettings } = useSettings();

    const handlePinSidebar = () => {
        saveSettings({
            ...settings,
            pinSidebar: !settings.pinSidebar
        });
    };




    return (

        <>
            <Helmet>
                <title>Omnisell - Accounts-CRM</title>
            </Helmet>
            <ButtonAppBar />
            {!mdDown && (
                <DashboardSidebar
                    onPin={handlePinSidebar}
                    pinned={settings.pinSidebar}
                />
            )
            }
            <DashboardLayoutContent
                sx={{
                    ml: {
                        md: settings.pinSidebar ? '250px' : '73px'
                    }
                }}
            >




                <Outlet />
                <Footer />
            </DashboardLayoutContent>
        </>

    );
};
