import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md}px
    ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.palette.tertiary.main};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.common.white};
  font-size: ${({ theme }) => theme.typography.body2.fontSize}px;
  font-weight: 700;
  cursor: pointer;
`;
