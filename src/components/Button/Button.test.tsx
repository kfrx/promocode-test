import React from 'react';
import Button from './';
import { renderWithTheme } from 'utils/test-helpers';
import { screen, cleanup, fireEvent } from '@testing-library/react';

describe('Button', () => {
  afterEach(() => cleanup);

  it('will fire onClick', () => {
    const onClick = jest.fn();
    const children = 'button text';

    renderWithTheme(<Button onClick={onClick}>{children}</Button>);

    fireEvent.click(screen.getByText(children));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
