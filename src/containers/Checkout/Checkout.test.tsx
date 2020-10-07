import React from 'react';
import Checkout from './';
import { act } from 'react-dom/test-utils';
import { renderWithTheme, flushPromises } from 'utils/test-helpers';
import user from '@testing-library/user-event';
import { screen, cleanup, fireEvent, waitFor } from '@testing-library/react';

describe('Checkout', () => {
  beforeEach(() => {
    renderWithTheme(<Checkout />);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('can apply promo code RRD4D32 for a 10% discount on cart over 1000', async () => {
    const buttons = screen.getAllByText('Add to cart');
    const wfButton = buttons[0];

    [...Array(6)].forEach(() => user.click(wfButton));

    expect(screen.getByText('Total: $1,199.94')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    user.type(input, 'RRD4D32');
    fireEvent.click(screen.getByText('Apply promo'));

    await act(async () => {
      await flushPromises();
    });

    expect(screen.getByText('Total: $1,079.95')).toBeInTheDocument();
  });

  it('can apply promo code 44F4T11 for a 15% discount on cart over 1500', async () => {
    const buttons = screen.getAllByText('Add to cart');
    const wfButton = buttons[0];

    [...Array(10)].forEach(() => user.click(wfButton));

    expect(screen.getByText('Total: $1,999.90')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    user.type(input, '44F4T11');
    fireEvent.click(screen.getByText('Apply promo'));

    await act(async () => {
      await flushPromises();
    });

    expect(screen.getByText('Total: $1,699.92')).toBeInTheDocument();
  });

  it('can apply promo code FF9543D1 for a 8.99 docgen unit price for 10 docgen or more', async () => {
    const buttons = screen.getAllByText('Add to cart');
    const docgenButton = buttons[1];

    [...Array(10)].forEach(() => user.click(docgenButton));

    expect(screen.getByText('Total: $99.90')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    user.type(input, 'FF9543D1');
    fireEvent.click(screen.getByText('Apply promo'));

    await act(async () => {
      await flushPromises();
    });

    expect(screen.getByText('Total: $89.90')).toBeInTheDocument();
  });

  it('can apply promo code YYGWKJD for a 89.99 form unit price for 1 wf or more', async () => {
    const buttons = screen.getAllByText('Add to cart');
    const wfButton = buttons[0];
    const formButton = buttons[2];

    user.click(wfButton);
    user.click(formButton);

    expect(screen.getByText('Total: $299.98')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    user.type(input, 'YYGWKJD');
    fireEvent.click(screen.getByText('Apply promo'));

    await act(async () => {
      await flushPromises();
    });

    expect(screen.getByText('Total: $289.98')).toBeInTheDocument();
  });
});
