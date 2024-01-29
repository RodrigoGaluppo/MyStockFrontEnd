// src/components/common/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Flex, Text, Link as ChakraLink, Icon, Avatar, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import {CloseIcon,ChevronDownIcon} from "@chakra-ui/icons"
import { isLoggedIn, logout } from '../../services/auth';

interface HeaderProps {
  userEmail: string; // You can receive this prop from the parent component or from the state
}

function Logo(props:any) {
  return (
    <Box {...props}>
      <Text color='pink.400' display={"inline-block"}  fontSize="xx-large" fontWeight="bold">
        My
      </Text>
      <Text display={"inline-block"} color={"black"} fontSize="xx-large" fontWeight="bold">
        Stock
      </Text>
    </Box>
  )
}

const MenuToggle = ({ toggle, isOpen }:{toggle:()=>void, isOpen:boolean}) => {
  return (
    <Box color="black" fontSize={"large"} display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <Icon fontSize={"large"} ><CloseIcon /></Icon> : <Icon fontSize={"xx-large"}><ChevronDownIcon  /></Icon>}
    </Box>
  )
}

const NavBarContainer = ({ children, ...props }:{children:any}) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      {children}
    </Flex>
  )
}

const Header: React.FC<HeaderProps> = ({ userEmail }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const navigate = useNavigate();

  return (
    <NavBarContainer>
      <Logo
        
        color={["white", "white", "primary.500", "primary.500"]}
      />
     
     <Box display="flex" alignItems="center" mb={4}>
     <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {isLoggedIn() &&  <Avatar name={userEmail} size="md" mr={2} />}
      </MenuButton>
      <MenuList bg="white">
        <MenuItem onClick={()=>{
          logout()
          navigate("/")
        }} bg="white" color="black">Sair <Icon ml="2"><CloseIcon></CloseIcon></Icon></MenuItem>
        
      </MenuList>
    </Menu>
       
        
      </Box>
    
    </NavBarContainer>
  );
};

export default Header;
