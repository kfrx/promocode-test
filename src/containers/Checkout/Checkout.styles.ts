import styled from 'styled-components';
import Box from 'components/Box';

export const StyledCheckout = styled.main`
  padding: ${({ theme }) => theme.spacing.lg}px 0;
`;

export const StyledCheckoutContent = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.md}px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    grid-template-columns: auto 350px;
  }
`;

export const StyledProductsGrid = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.md}px;
  margin: ${({ theme }) => theme.spacing.md}px 0;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const StyledSidebar = styled(Box)`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.lg}px;
  justify-items: start;
  align-content: space-between;
`;

export const StyledProducts = styled(Box)``;

export const StyledContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md}px;
`;

export const StyledSummary = styled.div``;
