import styled from 'styled-components';

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledLogo = styled.img`
  width: 120px;
`;
