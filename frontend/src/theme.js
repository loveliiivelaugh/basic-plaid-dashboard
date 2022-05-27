import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import * as colors from "@mui/material/colors";
import backgroundImage from './images/signin-background.jpg';

const theme = createTheme({
  palette: {
    mode: 'dark',
    type: "dark",
      primary: {
        // Same as in light but we could
        // adjust color hue if needed
        main: colors.green["500"],
      },
      secondary: {
        main: colors.green["400"],
      },
      background: {
        default: 'rgba(255, 255, 255, 0)',
        paper: 'rgba(255, 255, 255, 0.6)',
      },
      text: {
        primary: colors.grey["800"],
        secondary: colors.grey["900"],
      },
    },
    common: {
      typography: {
        fontSize: 14,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        // Uncomment to make button lowercase
        // button: { textTransform: "none" },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1200,
          xl: 1920,
        },
      },
      
      // Override component styles
      overrides: {
        // Global styles
        MuiCssBaseline: {
          "@global": {
            "#root": {
              // Flex column that is height
              // of viewport so that footer
              // can push self to bottom by
              // with auto margin-top
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              // Prevent child elements from
              // shrinking when content
              // is taller than the screen
              // (quirk of flex parent)
              "& > *": {
                flexShrink: 0,
              },
            },
          },
        },
      },
    },
    components: {
      // Name of the component
      MuiPaper: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            backdropFilter: 'blur(12px)',
          },
        },
      },
    },
});

export const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Box style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        color: "#f5f5f5"
      }}
    >
      {children}
    </Box>
  </MuiThemeProvider>
);
