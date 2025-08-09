import '@/styles/globals.css';
import '../styles/windows-theme.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';

/**
 * Custom App component that injects the global layout. All pages render
 * inside the Layout component, which provides a consistent navigation bar.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
