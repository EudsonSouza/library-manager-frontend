import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar'; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ mt: 10, mb: 2, flexGrow: 1 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;