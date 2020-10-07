import React from 'react';
import {
  StyledTextField,
  StyledLabel,
  StyledInput,
  StyledError,
} from './TextField.styles';
import { TextFieldProps } from './TextField.types';

export const TextField: React.FC<TextFieldProps> = ({
  label,
  onChange,
  error,
  ...restProps
}) => {
  return (
    <StyledTextField>
      <StyledLabel variant="body2" data-testid="label">
        {label}
      </StyledLabel>
      <StyledInput type="text" onChange={onChange} {...restProps} />
      <StyledError variant="body2" data-testid="error">
        {error}
      </StyledError>
    </StyledTextField>
  );
};

export default TextField;
