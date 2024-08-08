// app/styles/listStyledComponents.ts
import styled from '@emotion/styled';
import { Button, Box, Typography } from '@mui/material';

export const ListContainer = styled(Box)`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing(3)};
`;

export const ListHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing(3)};
`;

export const ListTitle = styled(Typography)`
  font-size: 2rem;
  color: ${props => props.theme.palette.primary.main};
`;

export const CreateButton = styled(Button)`
  &:hover {
    background-color: ${props => props.theme.palette.primary.dark};
  }
`;

export const List = styled(Box)`
  background-color: ${props => props.theme.palette.background.paper};
  border-radius: ${props => props.theme.shape.borderRadius}px;
  overflow: hidden;
`;

export const ListItem = styled(Box)`
  border-bottom: 1px solid ${props => props.theme.palette.divider};
  &:last-child {
    border-bottom: none;
  }
`;

export const ListItemContent = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing(2)};
`;

export const ListItemText = styled(Typography)`
  font-size: 1.1rem;
`;

export const ListItemActions = styled(Box)`
  display: flex;
  gap: ${props => props.theme.spacing(1)};
`;

export const EditButton = styled(Button)`
  color: ${props => props.theme.palette.primary.main};
  &:hover {
    background-color: ${props => props.theme.palette.primary.light};
  }
`;

export const DeleteButton = styled(Button)`
  color: ${props => props.theme.palette.error.main};
  &:hover {
    background-color: ${props => props.theme.palette.error.light};
  }
`;