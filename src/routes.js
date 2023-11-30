import { Suspense, lazy } from 'react';
import { GuestGuard } from "./guards/GuestGuard";
import { LoadingScreen } from './components/loading-screen';
import AuthGuard from "./guards/AuthGuard";
import { DashboardLayout } from './containers/dashboard-layout';
import { Navigate } from "react-router-dom";
import ForgotPassword from './components/login/forgot-password';


//  Dashboard Menu's

import Employees from './project-portal/pages/DashboardMenus/employees';
import BusinessHeads from './project-portal/pages/DashboardMenus/businessheads';
import Subscriptions from './project-portal/pages/DashboardMenus/subscription';
import TaxAccounts from './project-portal/pages/DashboardMenus/taxaccounts';
import Paymentprofiles from './project-portal/pages/DashboardMenus/paymentProfiles';
import PaymentChannels from './project-portal/pages/DashboardMenus/paymentChannels';
import Transactions from './project-portal/pages/DashboardMenus/transactions';
import Invoices from './project-portal/pages/DashboardMenus/invoices';
import VendorPayment from './project-portal/pages/DashboardMenus/VendorPayments';
import Reimbursement from './project-portal/pages/DashboardMenus/reimbursement';
import Inventory from './project-portal/pages/DashboardMenus/inventory';
import Category from './project-portal/pages/DashboardMenus/category';
import Vendors from './project-portal/pages/DashboardMenus/Vendor';
import VendorBills from './project-portal/pages/DashboardMenus/vendorBills';

const Loadable = (Component) => (props) => (
    <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
);



// Not found pages
const NotFound = Loadable(lazy(() => import('./containers/not-found').then((module) => ({ default: module.NotFound }))));

// Auth pages
const Login = Loadable(lazy(() => import('./containers/login').then((module) => ({ default: module.Login }))));




const routes = [
    {
        path: '',
        element: (
            <GuestGuard>
                <Login />
            </GuestGuard>
        )
    },
    {
        path: 'forgot-password',
        element: (
            <GuestGuard>
                <ForgotPassword />
            </GuestGuard>
        )
    },
    {
        path: 'dashboard',
        element: (
            <AuthGuard>
                <DashboardLayout />
            </AuthGuard>
        ),
        children: [
            {
                path: '',
                element: (
                    <Navigate
                        to="/dashboard/employees"
                        replace
                    />
                )
            },

            {
                path: 'employees',
                element: <Employees />
            },
            {
                path: 'business-heads',
                element: <BusinessHeads />
            },
            {
                path: 'subscriptions',
                element: <Subscriptions />
            },
            {
                path: 'taxaccounts',
                element: <TaxAccounts />
            },
            ,
            {
                path: 'paymentprofile',
                element: <Paymentprofiles />
            }
            ,
            {
                path: 'paymentchannels',
                element: <PaymentChannels />
            }
            ,
            {
                path: 'transactions',
                element: <Transactions />
            }
            ,
            {
                path: 'business-invoices',
                element: <Invoices />
            }
            ,
            {
                path: 'reimbursement',
                element: <Reimbursement />
            }

            ,
            {
                path: 'vendors',
                element: <Vendors />
            },
            {
                path: 'vendorpayment',
                element: <VendorPayment />
            },
            {
                path: 'vendor-bills',
                element: <VendorBills />
            },
            {
                path: 'inventory',
                element: <Inventory />
            },
            {
                path: 'category',
                element: <Category />
            },

        ],

    },
    {
        path: '*',
        element: <NotFound />
    }


];

export default routes;
