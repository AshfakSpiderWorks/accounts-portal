
import './App.css';
import './Custom.css';

import { createCustomTheme } from './theme';
import { useRoutes } from "react-router-dom";
import routes from './routes'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RTL } from "./components/rtl";
import { useAuth } from "./hooks/use-auth";
import { useSettings } from "./contexts/Settings/settings-context";
// import './messaging_init_in_sw';

function App() {


  const content = useRoutes(routes);
  const { settings } = useSettings();
  const { isInitialized } = useAuth();







  const theme = createCustomTheme({
    direction: settings.direction,
    theme: 'light'
  });



  return (
    <ThemeProvider theme={theme}>
      <RTL direction={settings.direction}>
        <CssBaseline />
        {isInitialized && content}
      </RTL>
    </ThemeProvider>
  );
}

export default App;
