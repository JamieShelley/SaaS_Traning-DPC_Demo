import '../styles/globals.css';
import '../styles/matters.css';
import '../../node_modules/react-pdf/dist/esm/Page/AnnotationLayer.css';

import '../../node_modules/react-pdf/dist/esm/Page/TextLayer.css';

import 'react-pdf/dist/esm/Page/TextLayer.css';//React.lazy(() => import('../../node_modules/react-pdf/dist/esm/Page/TextLayer.css'));


import { ThemeProvider } from 'next-themes';

import PageProvider from '~contexts/PageContext/PageProvider';

function Application({ Component, pageProps: { ...pageProps } }) {
  return (
    <div>
      <PageProvider>
        <Component {...pageProps} />

        <ThemeProvider attribute="class"></ThemeProvider>
      </PageProvider>
    </div>
  );
}

export default Application;
