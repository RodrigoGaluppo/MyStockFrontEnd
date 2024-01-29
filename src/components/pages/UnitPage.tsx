// src/components/pages/UnitPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box,useToast, Heading, Table, Thead, Tbody,ListItem, Tr, Th, Td, Button, Link, Flex, TableContainer, ButtonGroup, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, Select, FormLabel, VStack, Input, OrderedList, SimpleGrid } from '@chakra-ui/react';
import { logout,getToken } from '../../services/auth';
import api from '../../services/api';
import { AppSPinner } from '../common/AppSpinner';



interface Room {
  id: string;
  name: string;
  // You can add more room details as needed
}

interface Item{
  id:string;
  name:string;
  quantity:number;
}

interface Unit{
  id:string;
  name:string;
  asset:string;
  rooms:Room[];
  stock:Item[]
}


function AddItem({isOpen, onClose, onOpen}:{isOpen:boolean, onClose:()=>void, onOpen:()=>void }) {
  

  return (
    <>
     

      <Modal blockScrollOnMount={false} isOpen={isOpen}  onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>Adicionar item a Paraiso da Penha</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <VStack spacing={"4"}>
           <FormControl>
              <FormLabel>Item:</FormLabel>
              <Select border={"1px"} borderColor={"gray.300"} bg="white">
              <option style={{background:"white"}} value='option1'>Option 1</option>
              <option style={{background:"white"}} value='option2'>Option 2</option>
              <option style={{background:"white"}} value='option3'>Option 3</option>
              </Select>
              
            </FormControl>
            <FormControl>
              <FormLabel >Quantidade:</FormLabel>
              <Input type='number' border={"1px"} borderColor={"gray.300"}></Input>
            </FormControl>
            <Button colorScheme='green'>Adicionar</Button>
           </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const UnitPage: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const [unit,setUnit] = useState({} as Unit)
 
  const navigator = useNavigate()
  const addItem = useDisclosure()
  const toast = useToast();

  const [isLoading,setIsloading] = useState(false)

  useEffect(()=>{
    setIsloading(true)
    api.get(`units/${unitId}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        // Add other headers as needed
      },
    })
      .then(response => {
        setIsloading(false)
        setUnit(response.data);
        
      })
      .catch(error => {
        setIsloading(false)
        if (error.response && error.response.status === 403 || error.response.status === 401) {
          logout()
          navigator("/")

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


  return (
    <Flex h="100vh">
      {isLoading ?
      <AppSPinner/>
      
      :

      <Box w="100%" p={4}>
      <Flex justify={"space-between"}>
      <Heading as="h2" size="lg" mb={4}>
        Estoque {unit.name}
      </Heading>
       {/*
      <ButtonGroup >

      <AddItem isOpen={addItem.isOpen} onOpen={addItem.onOpen} onClose={addItem.onClose}/>
       <Button onClick={addItem.onOpen} colorScheme='green'>Adicionar</Button>

          <Button colorScheme='red'>Retirar</Button>
  </ButtonGroup>*/}
    
      </Flex>

      <Box>
  
      </Box>

      <TableContainer>
      <Table variant="simple" mb={10}>
        <Thead>
          <Tr >
            <Th color={"gray.600"}>ID</Th>
            <Th color={"gray.600"}>Nome</Th>
            <Th  isNumeric color={"gray.600"}>Quantidade</Th>
          </Tr>
        </Thead>
        <Tbody>
           {
            unit.stock && unit.stock.map(item=>(
            <Tr bgColor={item.quantity <= 2 ? "yellow.200" : "white"} key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td  isNumeric >{item.quantity}</Td>
            </Tr>
            ))
           }
        </Tbody>
      </Table>
      </TableContainer>

      <Heading as="h3" size="lg" mb={4}>
        Quartos
      </Heading>
      <SimpleGrid columns={1} spacing={4}>
          {unit?.rooms?.map((room)=>(
            <Box as={Link} href={unitId + "/room/" + room.id} cursor={"pointer"} bg="gray.100" p="4" >{room?.name}</Box>
      
          ))}
      </SimpleGrid>
      <Box>

       
      </Box>
    </Box>
    
    }
    </Flex>
  );
};

export default UnitPage;
function toast(arg0: { title: string; description: string; status: string; position: string; duration: number; isClosable: boolean; }) {
  throw new Error('Function not implemented.');
}

