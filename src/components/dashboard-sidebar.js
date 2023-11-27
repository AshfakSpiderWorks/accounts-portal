import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Drawer, IconButton, List } from '@mui/material';
import { DashboardSidebarItem } from './dashboard-sidebar-item';
import { Scrollbar } from './scrollbar';
import { ChevronLeft as ChevronLeftIcon } from '../icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '../icons/chevron-right';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useAuth } from "../hooks/use-auth";
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Person4Icon from '@mui/icons-material/Person4';
import PaymentsIcon from '@mui/icons-material/Payments';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import { Category, CurrencyExchange, Inventory, LocalAtm, Storefront } from '@mui/icons-material';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';

const items = [
  {
    icon: GroupsIcon,
    title: 'Employees',
    href: '/dashboard/employees',
  },
  {
    icon: SubscriptionsIcon,
    title: 'Subscriptions',
    href: '/dashboard/subscriptions'
  },
  {
    icon: BusinessIcon,
    title: 'Business Accounts',
    href: '/dashboard/business-heads',
  },
  {
    icon: CurrencyRupeeIcon,
    title: 'Tax Accounts',
    href: '/dashboard/taxaccounts'
  },
  {
    icon: PaymentsIcon,
    title: 'Payment Channels',
    href: '/dashboard/paymentchannels'
  }
  ,
  {
    icon: PaymentIcon,
    title: 'Payment Profile',
    href: '/dashboard/paymentprofile'
  }
  ,
  {
    icon: PriceChangeIcon,
    title: 'Transactions',
    href: '/dashboard/transactions'
  }
  ,
  {
    icon: DescriptionIcon,
    title: 'Invoices',
    href: '/dashboard/invoices'
  },
  {
    icon: CurrencyExchange,
    title: 'Reimbursement',
    href: '/dashboard/reimbursement'
  },
  {
    icon: Storefront,
    title: 'Vendors',
    href: '/dashboard/vendors'
  },
  {
    icon: LocalAtm,
    title: 'Vendors Payment',
    href: '/dashboard/vendorpayment'
  },
  {
    icon: ReceiptOutlinedIcon,
    title: 'Vendor Bills',
    href: '/dashboard/vendor-bills'
  },
  {
    icon: Inventory,
    title: 'Inventory',
    href: '/dashboard/inventory'
  },
  {
    icon: Category,
    title: 'Inventory Category',
    href: '/dashboard/category'
  },





];

export const DashboardSidebar = (props) => {
  const { onPin, pinned } = props;
  const [openedItem, setOpenedItem] = useState(null);
  const [hovered, setHovered] = useState(false);
  const auth = useAuth();
  const handleOpenItem = (item) => {
    if (openedItem === item) {
      setOpenedItem(null);
      return;
    }

    setOpenedItem(item);
  };

  const logoutHandler = () => {
    auth.logout();
  };

  return (
    <Drawer
      open
      sx={{ zIndex: 1000 }}
      variant="permanent"
      PaperProps={{
        onMouseOver: () => { setHovered(true); },
        onMouseLeave: () => { setHovered(false); },
        sx: {
          backgroundColor: 'background.paper',
          height: '100%',
          overflowX: 'hidden',
          transition: 'width 250ms ease-in-out',
          width: pinned ? 250 : 73,
          '& .simplebar-content': {
            height: '100%'
          },
          '&:hover': {
            width: 250,
            '& span, p': {
              display: 'flex'
            }
          }
        }
      }}
    >
      <Scrollbar
        style={{
          display: 'flex',
          flex: 1,
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 2
          }}
        >
          {/*<img className={"logo-image"} src="https://www.spiderworks.in/theme/web/img/logo-sw.png" alt="SpiderWorks logo"/>*/}

          <div className="logout">  <Button onClick={logoutHandler}>Logout</Button></div>

          <List disablePadding>

            {items.map((item) => (
              <DashboardSidebarItem
                key={item.title}
                onOpen={() => handleOpenItem(item)}
                open={openedItem?.title === item.title && (hovered || pinned)}
                pinned={pinned}
                iconColor="black" // Set the icon color to primary
                {...item}
              />
            ))}

          </List>

        </Box>
      </Scrollbar>


      <Box sx={{ pt: 2 }}>
        <IconButton onClick={onPin}>
          {pinned ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

      </Box>
    </Drawer >
  );
};

DashboardSidebar.propTypes = {
  onPin: PropTypes.func,
  pinned: PropTypes.bool
};
