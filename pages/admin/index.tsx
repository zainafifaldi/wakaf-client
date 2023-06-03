import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import Layout from 'layouts/admin';

export default function AdminHomePage() {
  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        
      </SimpleGrid>
    </Flex>
  );
}

AdminHomePage.Layout = Layout;
