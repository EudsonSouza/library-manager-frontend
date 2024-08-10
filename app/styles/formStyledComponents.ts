import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const StyledButton = styled(Button)`
  margin-top: 20px;
`;