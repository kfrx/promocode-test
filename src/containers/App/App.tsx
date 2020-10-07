import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './App.styles';
import theme from 'theme';

const DefaultLayout = lazy(() => import('layouts/DefaultLayout'));
const Checkout = lazy(() => import('containers/Checkout'));

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <DefaultLayout>
              <Route>
                <Checkout />
              </Route>
            </DefaultLayout>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
