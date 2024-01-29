// src/components/pages/LoginPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Call the login function from your authentication service
      const response = await login({email, password});

      // Save response to local storage
      localStorage.setItem('token', response.token);


      toast({
        title: 'Login Success',
        description: '',
        status: 'success',
        position:"top",
        duration: 5000,
        isClosable: true,
      });

      // Redirect to the homepage after successful login
      navigate('/home');
    } catch (error) {
      // Display an error toast if login fails
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password',
        status: 'error',
        position:"top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="80vh" w="100%" >
    <Center  w="100%" >
      <Box mt="-20" w="400px" bg="gray.100" color="black" maxW="md" mx="auto" borderRadius={"20"} p={10}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Login
      </Text>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
        
          borderColor={"gray.400"}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
        borderColor={"gray.400"}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button mt={6} colorScheme="pink" onClick={handleLogin}>
        Login
      </Button>
    </Box>
    </Center>
    </Flex>
  );
};

export default LoginPage;
