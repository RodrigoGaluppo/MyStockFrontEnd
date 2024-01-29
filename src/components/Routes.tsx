// src/components/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box, ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import Header from './common/Header';
import Footer from './common/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UnitPage from './pages/UnitPage';
import RoomPage from './pages/RoomPage';


interface PrivateRouteCOmponentProps {
   
  component: React.ComponentType;
}

// Function to simulate authentication (replace with your logic)
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

function PrivateRouteComponent({ component: Component }: PrivateRouteCOmponentProps) {


  return (
    <Box padding={"4"} >
      <Component /> 
    </Box>
    
  );
  //isAuthenticated() ? <Component /> : <Navigate to="/" />
}

const AppRoutes: React.FC = () => {
  return (
   
      <Router>
        <Header userEmail={localStorage.getItem("email@MyStock") || ""}/>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/home" element={<PrivateRouteComponent component={HomePage} />} />
          <Route path="/unit/:unitId/room/:roomId" element={<PrivateRouteComponent component={RoomPage} />} />

          <Route path="/unit/:unitId" element={<PrivateRouteComponent component={UnitPage} />} />


        </Routes>
      <Footer/>
      </Router>
   
  );
};
          /*
          <PrivateRouteComponent path="/" element={<HomePage />} />
          <PrivateRouteComponent path="/units/:unitId" element={<UnitPage />} />
          <PrivateRouteComponent path="/units/:unitId/rooms/:roomId" element={<RoomPage />} />*/
export default AppRoutes;
