// src/components/common/Footer.tsx
import { Box, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box as="footer" p={4} mt={8} bg="gray.800" color="white">
      <Text textAlign="center">&copy; 2023 MyStock</Text>
    </Box>
  );
};

export default Footer;
