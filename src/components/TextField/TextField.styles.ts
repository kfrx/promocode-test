import styled from 'styled-components';
import Typography from 'components/Typography';

export const StyledTextField = styled.div`
  width: 100%;
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledLabel = styled(Typography)`
  font-weight: 700;
`;

export const StyledError = styled(Typography)`
  color: ${({ theme }) => theme.palette.error.main};
`;

export const StyledInput = styled.input`
  width: 100%;
  min-height: 50px;
`;
