/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode } from 'react';

import DemoPage from '~pages/demoPage';

interface IPageContext {
  pageContent: JSX.Element | null;
  setPageContent: Function| null
}

const EMPTY_PAGE_CONTEXT: IPageContext = {
  pageContent: DemoPage(),
  setPageContent: null
};

const PageContext = createContext<IPageContext>(EMPTY_PAGE_CONTEXT);

export default PageContext;