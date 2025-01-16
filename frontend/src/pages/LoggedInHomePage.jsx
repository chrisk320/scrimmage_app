import React from "react";
import { Box, Button, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { FaBasketballBall, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';

const LoggedInHomePage = ({ user }) => {
  return (
    <Container maxW="container.lg" py={8}>
      {/* Welcome Section */}
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl">
          Welcome back, {user.firstName}!
        </Heading>
        <Text mt={2}>Find games, connect with players, or start your own scrimmage.</Text>
      </Box>

      {/* Action Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box p={6} shadow="md" borderWidth="1px" textAlign="center">
          <FaMapMarkerAlt size={40} />
          <Heading as="h3" size="md" mt={4}>
            Find Nearby Courts
          </Heading>
          <Button mt={4} colorScheme="blue">Explore</Button>
        </Box>
        <Box p={6} shadow="md" borderWidth="1px" textAlign="center">
          <FaUsers size={40} />
          <Heading as="h3" size="md" mt={4}>
            Join a Game
          </Heading>
          <Button mt={4} colorScheme="blue">Browse Games</Button>
        </Box>
        <Box p={6} shadow="md" borderWidth="1px" textAlign="center">
          <FaBasketballBall size={40} />
          <Heading as="h3" size="md" mt={4}>
            Create a Game
          </Heading>
          <Link to="/home/create">
            <Button mt={4} colorScheme="blue">Start Now</Button>
          </Link>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default LoggedInHomePage;