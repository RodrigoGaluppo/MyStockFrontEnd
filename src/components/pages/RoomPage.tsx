// src/components/pages/RoomPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import { Box, Heading, Table, Thead, Tbody,Text,ListItem, Tr, Th, Td, Button, Link, Flex, TableContainer, ButtonGroup, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, Select, FormLabel, VStack, Input, OrderedList, useToast, Spinner, Center, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import api from '../../services/api';
import { logout,getToken } from '../../services/auth';
import { AppSPinner } from '../common/AppSpinner';


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

interface Room {
  id: string;
  name: string;
  movements:Movement[]
  stock:Item[]
  unit_id:string
}

interface Movement{
  id:string;
  Type:string;
  ItemName:[];
  Quantity:string
}

function AddItemStock({isOpen, onClose, onOpen,room, unit}:{isOpen:boolean, onClose:()=>void, onOpen:()=>void,room:Room , unit:Unit}) {
  const [chosenItem,setChosenItem] = useState((unit && unit?.stock && unit?.stock[0] ) || {})
   const selectRef = useRef<any>()
   const toast = useToast()

   const [quantity,setQuantity] = useState(0)
    const navigator = useNavigate()
   const [isLoading,setIsloading] = useState(false)

   const Submit = ()=>{

    if(quantity <= 0){
      toast({
        title: 'Error',
        description: 'Quantidade deve ser maior que 0',
        status: 'error',
        position:"top",
        duration: 5000,
        isClosable: true,
      });
       return
    }

    if(quantity > chosenItem.quantity){
      toast({
        title: 'Error',
        description: 'Nao ha produtos suficientes em estoque',
        status: 'error',
        position:"top",
        duration: 5000,
        isClosable: true,
      });
       return
    }
    setIsloading(true)
    api.post(`rooms/movement/`,{
        unit_id:room.unit_id,
        item_id:chosenItem.id,
        quantity,
        type:"MovedToRoom",
        room_id:room.id,
        description:room.name
    }, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        // Add other headers as needed
      },
    })
      .then(response => {
        
        setIsloading(false)
        window.location.reload()
        onClose()
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



   }


  return (
    <>
      
      <Modal blockScrollOnMount={false} isOpen={isOpen}  onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
         {isLoading ? 
          
          <AppSPinner/>
          :
          <>
             <ModalHeader>Adicionar Reposição a {room?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <VStack spacing={"4"}>
           <FormControl>
              <FormLabel>Item:</FormLabel>
              {unit?.stock && unit?.stock.length > 0 ? 
              (
              <Select ref={selectRef} onChange={(e)=>{
                
                unit.stock.map((item)=>{
                  if(item.id === e.target.value)
                    setChosenItem(item)
                })

              }}>
                {unit?.stock?.map((item)=>(
                  <option style={{background:"white"}} value={item.id} >{item.name}</option>
                ))}
              </Select>  )

              : <FormLabel>Nao ha items no estoque</FormLabel>
            }
              
            </FormControl>
            <FormControl>
              <FormLabel >Quantidade:</FormLabel>
             
              <NumberInput
              min={0}
              border={"1px"} borderColor={"gray.300"}
              >
              <NumberInputField defaultValue={0}  onChange={(e)=>{
           
                setQuantity(Number(e.target.value))
                console.log(e.target.value);
                
              
              }}  />
            
            </NumberInput>
              <span>max no estoque eem {unit?.name}: {chosenItem?.quantity}</span>
            </FormControl>
            <Button onClick={Submit} colorScheme='blue'>Adicionar</Button>
           </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
          </>
        
        }
        </ModalContent>
      </Modal>
    </>
  )
}

function AddItem({isOpen, onClose, onOpen,room}:{isOpen:boolean, onClose:()=>void, onOpen:()=>void,room:Room }) {
  const [chosenItem,setChosenItem] = useState((room && room?.stock && room?.stock[0] ) || {})
   const selectRef = useRef<any>()
   const toast = useToast()

   const [quantity,setQuantity] = useState(0)
    const navigator = useNavigate()
   const [isLoading,setIsloading] = useState(false)

   const Submit = ()=>{

    if(quantity <= 0){
      toast({
        title: 'Error',
        description: 'Quantidade deve ser maior que 0',
        status: 'error',
        position:"top",
        duration: 5000,
        isClosable: true,
      });
       return
    }

    if(quantity > chosenItem.quantity){
      toast({
        title: 'Error',
        description: 'Nao ha produtos suficientes em estoque',
        status: 'error',
        position:"top",
        duration: 5000,
        isClosable: true,
      });
       return
    }
    setIsloading(true)
    api.post(`rooms/movement/`,{
        unit_id:room.unit_id,
        item_id:chosenItem.id,
        quantity,
        type:"Sold",
        room_id:room.id,
        description:room.name
    }, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        // Add other headers as needed
      },
    })
      .then(response => {
    
        setIsloading(false)
        onClose()
        window.location.reload()
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



   }


  return (
    <>
      
      <Modal blockScrollOnMount={false} isOpen={isOpen}  onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
         {isLoading ? 
          
          <AppSPinner/>
          :
          <>
             <ModalHeader>Adicionar Venda a {room?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <VStack spacing={"4"}>
           <FormControl>
              <FormLabel>Item:</FormLabel>
              {room?.stock && room?.stock.length > 0 ? 
              (
              <Select ref={selectRef} onChange={(e)=>{
                
                room.stock.map((item)=>{
                  if(item.id === e.target.value)
                    setChosenItem(item)
                })

              }}>
                {room.stock.map((item)=>(
                  <option style={{background:"white"}} value={item.id} >{item.name}</option>
                ))}
              </Select>  )

              : <FormLabel>Nao ha items no estoque</FormLabel>
            }
              
            </FormControl>
            <FormControl>
              <FormLabel >Quantidade:</FormLabel>
              <NumberInput
              min={0}
              border={"1px"} borderColor={"gray.300"}
              >
              <NumberInputField defaultValue={0}  onChange={(e)=>{
           
                setQuantity(Number(e.target.value))
                console.log(e.target.value);
                
              
              }}  />
            
            </NumberInput> 
            <span>max no estoque em  quarto {room?.name}: {chosenItem?.quantity}</span>
           
              </FormControl>

            <Button onClick={Submit} colorScheme='green'>Adicionar</Button>
           </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
          </>
        
        }
        </ModalContent>
      </Modal>
    </>
  )
}

function AddItemLoss({isOpen, onClose, onOpen,room}:{isOpen:boolean, onClose:()=>void, onOpen:()=>void,room:Room }) {
  const [chosenItem,setChosenItem] = useState((room && room?.stock && room?.stock[0] ) || {})
   const selectRef = useRef<any>()
   const toast = useToast()
  const locationPage = useLocation()
   const [quantity,setQuantity] = useState(0)
    const navigator = useNavigate()
   const [isLoading,setIsloading] = useState(false)

   const Submit = ()=>{

    if(quantity <= 0){
      toast({
        title: 'Error',
        description: 'Quantidade deve ser maior que 0',
        status: 'error',
        position:"top",
        duration: 5000,
        isClosable: true,
      });
       return
    }

    if(quantity > chosenItem.quantity){
      toast({
        title: 'Error',
        description: 'Nao ha produtos suficientes em estoque',
        status: 'error',
        position:"top",
        duration: 5000,
        isClosable: true,
      });
       return
    }
    setIsloading(true)
    api.post(`rooms/movement/`,{
        unit_id:room.unit_id,
        item_id:chosenItem.id,
        quantity,
        type:"LossRoom",
        room_id:room.id,
        description:room.name
    }, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        // Add other headers as needed
      },
    })
      .then(response => {
    
        setIsloading(false)

        onClose()
        window.location.reload()
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



   }


  return (
    <>
      
      <Modal blockScrollOnMount={false} isOpen={isOpen}  onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
         {isLoading ? 
          
          <AppSPinner/>
          :
          <>
             <ModalHeader>Adicionar Perda a {room?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <VStack spacing={"4"}>
           <FormControl>
              <FormLabel>Item:</FormLabel>
              {room?.stock && room?.stock.length > 0 ? 
              (
              <Select ref={selectRef} onChange={(e)=>{
                
                room.stock.map((item)=>{
                  if(item.id === e.target.value)
                    setChosenItem(item)
                })

              }}>
                {room.stock.map((item)=>(
                  <option style={{background:"white"}} value={item.id} >{item.name}</option>
                ))}
              </Select>  )

              : <FormLabel>Nao ha items no estoque</FormLabel>
            }
              
            </FormControl>
            <FormControl>
              <FormLabel >Quantidade:</FormLabel>
              <NumberInput
              min={0}
              border={"1px"} borderColor={"gray.300"}
              >
              <NumberInputField defaultValue={0}  onChange={(e)=>{
           
                setQuantity(Number(e.target.value))
                console.log(e.target.value);
                
              
              }}  />
            
            </NumberInput>
            <span>max no estoque quarto {room?.name}: {chosenItem?.quantity}</span>
           
            </FormControl>

             <Button onClick={Submit} colorScheme='red'>Adicionar</Button>
           </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
          </>
        
        }
        </ModalContent>
      </Modal>
    </>
  )
}

const RoomPage: React.FC = () => {
  const { unitId,roomId } = useParams<{ unitId: string, roomId:string }>();
  const [room,setRoom] = useState({} as Room)
  const navigator = useNavigate()
  const toast = useToast();
  const addItem = useDisclosure()
  const addItemStock = useDisclosure()
  const addItemLoss = useDisclosure()

  const [isLoading,setIsloading] = useState(false)


  const [unit,setUnit] = useState({} as Unit)

  useEffect(()=>{
    setIsloading(true)
    api.get(`rooms/${roomId}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
        // Add other headers as needed
      },
    })
      .then((response) => {
        
        setRoom(response.data)
     
        api.get(`units/${unitId}`,{
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
            // Add other headers as needed
          },
        })
        .then((res)=>{
          setUnit(res.data)
          setIsloading(false)
       
         
          
        })
        .catch((error)=>{
          
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
            setIsloading(false)
          })
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
    <Flex h="100vh" overflowY={"scroll"} overflowX={"scroll"}>
      {isLoading ? 
       <AppSPinner/>
      :
      <Box w="100%" p={4}>
      <Flex justify={"space-between"} flexWrap={"wrap"}>
      <Heading as="h2" size="lg" mb={4}>
        Estoque {room?.name}
      </Heading>
      <ButtonGroup >
      <AddItemLoss isOpen={addItemLoss.isOpen} room={room} onOpen={addItemLoss.onOpen} onClose={addItemLoss.onClose}/>
     
      <AddItem isOpen={addItem.isOpen} room={room} onOpen={addItem.onOpen} onClose={addItem.onClose}/>
      <AddItemStock unit={unit} isOpen={addItemStock.isOpen} room={room} onOpen={addItemStock.onOpen} onClose={addItemStock.onClose}/>
      
      <Button onClick={addItemStock.onOpen}  colorScheme='blue'>Reposição</Button>

        <Button onClick={addItem.onOpen}  colorScheme='green'>Venda</Button>

          <Button onClick={addItemLoss.onOpen} colorScheme='red'>Perda</Button>
        </ButtonGroup>
    
      </Flex>

   

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
            room.stock && room.stock.map(item=>(
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

      <Heading as="h2" size="lg" mb={4}>
        Movimentos {room?.name} Mensal
      </Heading>  

      <TableContainer>
      <Table variant="simple" mb={10}>
        <Thead>
          <Tr >
            <Th color={"gray.600"}>ID</Th>
            <Th color={"gray.600"}>Tipo</Th>
            <Th   color={"gray.600"}>Nome do Produto</Th>
            <Th  isNumeric color={"gray.600"}>Quantidade</Th>
          </Tr>
        </Thead>
        <Tbody>
        {
            room.movements && room.movements.map(movement=>(
            <Tr  key={movement.id}>
              <Td>{movement.id}</Td>
              <Td>{
              
              movement.Type == "MovedToRoom" ?
                <span>Reposição</span>
              : 
                (
                  movement.Type == "Sold" ?
                  <span>Venda</span> 
                  :
                  <span>Perda</span>

                )
                
              }</Td>
              <Td>{movement.ItemName}</Td>
              <Td  isNumeric >{movement.Quantity}</Td>
            </Tr>
            ))
           }
        </Tbody>
      </Table>
      </TableContainer>

    
    </Box>
      }
    </Flex>
  );
};

export default RoomPage;
