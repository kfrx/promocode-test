import React from 'react';
import { StyledButton } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({ children, ...restProps }) => {
  return (
    <StyledButton type="button" {...restProps}>
      {children}
    </StyledButton>
  );
};

export default StyledButton;
