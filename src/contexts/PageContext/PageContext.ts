/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode } from 'react';

import Main from '~components/organisms/main';

interface IPageContext {
  pageContent: JSX.Element | null;
  setPageContent: Function| null
}

const EMPTY_PAGE_CONTEXT: IPageContext = {
  pageContent: Main(),
  setPageContent: null
};

const PageContext = createContext<IPageContext>(EMPTY_PAGE_CONTEXT);

export default PageContext;