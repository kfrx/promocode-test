import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from 'theme';

export const renderWithTheme = (
  component: React.ReactElement
): RenderResult => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const scheduler: any =
  typeof setImmediate === 'function' ? setImmediate : setTimeout;

export function flushPromises() {
  return new Promise((resolve) => {
    scheduler(resolve);
  });
}
