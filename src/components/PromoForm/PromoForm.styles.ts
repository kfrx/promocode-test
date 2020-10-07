import styled from 'styled-components';

export const StyledPromoForm = styled.form`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.md}px;
  justify-items: start;
  width: 100%;
`;
