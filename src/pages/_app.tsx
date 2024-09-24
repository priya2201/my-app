// pages/_app.js
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme(); // You can customize your theme here

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
