import styled from 'styled-components';

export const StyledProduct = styled.article`
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.palette.accents.grey};
`;
