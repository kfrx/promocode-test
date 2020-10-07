import React from 'react';
import TextField from './';
import { renderWithTheme } from 'utils/test-helpers';
import user from '@testing-library/user-event';
import { screen, cleanup } from '@testing-library/react';

describe('TextField', () => {
  const onChange = jest.fn();
  const label = 'label text';
  const error = 'error text';

  beforeEach(() => {
    renderWithTheme(
      <TextField label={label} error={error} onChange={onChange} />
    );
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('will render the label', () => {
    expect(screen.getByTestId('label')).toHaveTextContent(label);
  });

  it('will render the error', () => {
    expect(screen.getByTestId('error')).toHaveTextContent(error);
  });

  it('will render onChange when typing', () => {
    const input = screen.getByRole('textbox') as HTMLInputElement;

    user.type(input, 'A');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('A');
  });
});
