import React, { useState } from 'react';
import { Center, Spinner } from "@chakra-ui/react"


export const AppSPinner: React.FC  = ()=>{
    return (
        <Center w="100%" h="100%" p="20">
        <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
        />
      </Center>
    )
}