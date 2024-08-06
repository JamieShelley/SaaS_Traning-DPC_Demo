/* eslint-disable @typescript-eslint/no-empty-function */
import { Main } from 'next/document';
import React, { useContext, useState, PropsWithChildren, useCallback } from 'react';


import PageContext from '~contexts/PageContext/PageContext';

const PageProvider = ({ children }: PropsWithChildren) => {
  const [pageContent, setNewPageContent] = useState<JSX.Element>(<Main />);

  const setPageContent = useCallback(
    (pageContent: JSX.Element) => {
      setNewPageContent(pageContent);
    },
    []
  );

  return (
    <PageContext.Provider value={{ pageContent, setPageContent }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);

export default PageProvider;