import PropTypes from 'prop-types';


export const Logo = (props) => {



  // const appSettings = useAppSettings();

  // console.log("logo", appSettings.get_logo())


  return (
    ''
  );
};

Logo.defaultProps = {
  emblemOnly: false,
  variant: 'dark'
};

Logo.propTypes = {
  emblemOnly: PropTypes.bool,
  variant: PropTypes.oneOf(['light', 'dark'])
};
