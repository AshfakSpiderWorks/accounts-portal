import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Collapse, List, Typography } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '../icons/chevron-right';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { ExternalLink as ExternalLinkIcon } from '../icons/external-link';

export const DashboardSidebarItem = (props) => {

  const {
    external,
    href,
    icon: Icon,
    items,
    onOpen,
    open,
    pinned,
    title
  } = props;
  const { t } = useTranslation();

  // Branch
  if (items) {
    return (
      <List
        disablePadding
        sx={{ width: '100%' }}
      >
        <li>
          <Button
            endIcon={open
              ? <ChevronDownIcon fontSize="small" />
              : <ChevronRightIcon fontSize="small" />}
            fullWidth
            onClick={onOpen}
            startIcon={<Icon />}
            sx={{
              justifyContent: 'flex-start',
              lineHeight: 0,
              minWidth: 'fit-content',
              px: 1.25,
              py: 1.25,
              '& .MuiButton-startIcon': {

                margin: 0
              },
              '& .MuiButton-endIcon': {
                color: 'action.disabled',
                display: pinned ? 'flex' : 'none',
                marginLeft: 'auto'
              }
            }}
            variant="text"
          >
            <Typography
              color="textPrimary"
              sx={{

                display: pinned ? 'flex' : 'none',
                ml: 1.25,

              }}
              variant="inherit"
            >
              {t(title)}
              
            </Typography>
          </Button>
        </li>
        <Collapse
          in={open}
          unmountOnExit
        >
          <List
            disablePadding
            sx={{ width: '100%' }}
          >
            {items.map((item) => {
              return (
                <li key={item.href}>
                  <Button
                    component={RouterLink}
                    fullWidth
                    sx={{

                      fontWeight: 400,
                      justifyContent: 'flex-start',
                      pl: 5,
                      whiteSpace: 'nowrap',
                      fontSize: '14px'
                    }}
                    to={item.href}
                    variant="text"
                  >
                    {t(item.title)}
                  </Button>
                </li>
              );
            })}
          </List>
        </Collapse>
      </List>
    );
  }

  // Leaf
  return (
    <li>
      <Button
        component={RouterLink}
        endIcon={external && <ExternalLinkIcon sx={{ color: 'action.disabled' }} />}
        fullWidth
        startIcon={<Icon sx={{ color: '#506176' }} />}
        target={external ? '_target' : '_self'}
        sx={{
          justifyContent: 'flex-start',
          lineHeight: 0,
          minWidth: 'fit-content',
          px: 1.25,
          py: 1.25,
          '& .MuiButton-startIcon': {
            margin: 0
          },
          '& .MuiButton-endIcon': {
            color: 'action.disabled',
            display: pinned ? 'flex' : 'none',
            marginLeft: 'auto'
          }
        }}
        to={href}
        variant="text"
      >
        <Typography
          color="textPrimary"

          sx={{
            display: pinned ? 'flex' : 'none',
            ml: 1.25,
            fontSize: '14px',

          }}
          variant="inherit"
        >

          {t(title)}




        </Typography>
      </Button>
    </li >
  );
};

DashboardSidebarItem.defaultProps = {
  open: false,
  pinned: false
};

DashboardSidebarItem.propTypes = {
  active: PropTypes.bool,
  activeHref: PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  items: PropTypes.array,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  pinned: PropTypes.bool,
  title: PropTypes.string
};