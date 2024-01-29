// src/components/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Box,Link, Heading,Image,VStack, Text, UnorderedList, ListItem, Avatar, CardBody, Stack, StackDivider, Card, CardHeader, SimpleGrid, Divider, useToast } from '@chakra-ui/react';
import api from '../../services/api';
import { logout,getToken } from '../../services/auth';
import { AppSPinner } from '../common/AppSpinner';

interface Unit{
  id:string;
  name:string;
  asset:string
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [units,setUnits] = useState<Unit[]>([] as Unit[])
  const toast = useToast();
  const [isLoading,setIsloading] = useState(false)
  
    useEffect(()=>{
      setIsloading(true)
      api.get(`units`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
          // Add other headers as needed
        },
      })
        .then(response => {
          setIsloading(false)
          setUnits(response.data)
        })
        .catch(error => {
          setIsloading(false)
          if (error.response && error.response.status === 403 || error.response.status === 401) {
            logout()
            navigate("/")

            console.error('Forbidden: You do not have permission to access this resource.');
            return
          }

          toast({
            title: 'Error',
            description: 'Contact Support',
            status: 'error',
            position:"top",
            duration: 5000,
            isClosable: true,
          });

          console.error(error);
        });
    },[])

    
  

  // You'll need to replace this with actual user data
  const userEmail = localStorage.getItem("email@MyStock") || "";

  return (
    <Box minH="100vh" mt="-10" p={4}>
      {isLoading ?
      <AppSPinner/>
      :
      <>
            <Heading as="h2" size="" mb={4}>
        Home Page
      </Heading>

      {/* Add user email and avatar here */}
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar name={userEmail} size="md" mr={2} />
        <Text>Bem vindo, {userEmail}!</Text>
      </Box>

     

      {/* List of units with links to their pages */}
      <SimpleGrid columns={{sm:1,md:3,lg:4}} spacing={4} >
      {units?.map((unit) => (
        

        <Card key={unit.id} maxW='lg' border="1px" borderColor={"gray.200"}>
      <CardBody bg="white"  color="black"  >
        <Link href={`unit/${unit.id}`}>
       
        <Image 
        
       
        p="2"
          minH={"200px"}
          src={unit.asset}
          w="100%"
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{unit.name}</Heading>

        </Stack>
        </Link>
      </CardBody>
    </Card>

      ))}
    </SimpleGrid>
      </>
      }
    </Box>
  );
};

export default HomePage;
function toast(arg0: { title: string; description: string; status: string; position: string; duration: number; isClosable: boolean; }) {
  throw new Error('Function not implemented.');
}

