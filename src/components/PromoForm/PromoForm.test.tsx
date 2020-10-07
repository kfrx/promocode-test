import React from 'react';
import PromoForm from './';
import { act } from 'react-dom/test-utils';
import { renderWithTheme, flushPromises } from 'utils/test-helpers';
import user from '@testing-library/user-event';
import { screen, cleanup, fireEvent, waitFor } from '@testing-library/react';

describe('PromoForm', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    renderWithTheme(<PromoForm onSubmit={onSubmit} />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('will not fire onSubmit when the form is invalid', async () => {
    fireEvent.click(screen.getByText('Apply promo'));

    await waitFor(() => screen.getByText('Please enter a promo code'));

    expect(screen.getByText('Please enter a promo code')).toBeInTheDocument();

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('will fire onSubmit when the form is valid', async () => {
    const input = screen.getByRole('textbox');

    user.type(input, 'RWERSFA21');
    fireEvent.click(screen.getByText('Apply promo'));

    await act(async () => {
      await flushPromises();
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
