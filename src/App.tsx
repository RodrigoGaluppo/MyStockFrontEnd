// Import the necessary Chakra UI components
import {  ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Routes from './components/Routes';

// Use Chakra UI theme and styles
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'white',
        color: 'black',
      },
      // styles for the `a`
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
      
    },
  },
});


// Use ChakraProvider to wrap your entire application
export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes/>
      <CSSReset />
    </ChakraProvider>
  );
};

