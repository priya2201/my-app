import '../../src/app/globals.css'
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PostProvider } from '../app/contexts/PostContext'

const theme = createTheme();  // Use default theme or define a custom theme

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ThemeProvider theme={theme}>
    // <CssBaseline /> {/* Normalize CSS across browsers */}
    <PostProvider> {/* Wrap with PostProvider */}
      <Component {...pageProps} />
    </PostProvider>
    // </ThemeProvider>
  );
}

export default MyApp;

