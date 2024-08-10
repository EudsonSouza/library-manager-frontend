"use client"

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Books', path: '/books' },
    { name: 'Authors', path: '/authors' },
    { name: 'Book Genres', path: '/book-genres' },
  ];

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Book Management
        </Typography>
        <Box>
          {navItems.map((item) => (
            <Link href={item.path} key={item.name} passHref>
              <Button
                component="a"
                sx={{
                  color: 'white',
                  textDecoration: pathname === item.path ? 'underline' : 'none',
                  fontWeight: pathname === item.path ? 'bold' : 'normal',
                }}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;