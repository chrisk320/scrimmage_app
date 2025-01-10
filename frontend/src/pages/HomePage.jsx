import {
    Box,
    Button,
    Container,
    Heading,
    SimpleGrid,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import { FaBasketballBall } from "react-icons/fa";
  import { Link } from "react-router-dom";
  
  const HomePage = () => {
    return (
      <Box bg="gray.900" py={8} color="white" mt={0} pt={0} pb={0}>
        {/* Hero Section */}
        <Box
          bgGradient="linear(to-r, cyan.400, blue.500)"
          py={16}
          textAlign="center"
        >
          <Container maxW="container.lg">
            <VStack spacing={6}>
              <Heading as="h1" size="2xl" fontWeight="bold">
                Welcome to Scrimmage
              </Heading>
              <Text fontSize="lg">
                Connect with basketball players near you and organize games at
                your favorite courts.
              </Text>
              <Button
                as={Link}
                to="/login"
                colorScheme="cyan"
                size="lg"
                leftIcon={<FaBasketballBall />}
              >
                Get Started
              </Button>
            </VStack>
          </Container>
        </Box>
  
        {/* Features Section */}
        <Container maxW="container.lg" py={12}>
          <Heading
            as="h2"
            size="xl"
            textAlign="center"
            mb={8}
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
          >
            Why Choose Scrimmage?
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <FeatureCard
              title="Find Nearby Courts"
              description="Locate basketball courts near you using our interactive map."
            />
            <FeatureCard
              title="Join or Create Games"
              description="Easily join existing games or create your own 5-on-5 match."
            />
            <FeatureCard
              title="Connect with Players"
              description="Build your network of basketball enthusiasts in your area."
            />
          </SimpleGrid>
        </Container>
  
        {/* Call to Action */}
        <Box bgGradient="linear(to-r, blue.500, cyan.400)" py={12} textAlign="center">
          <Heading as="h2" size="lg">
            Ready to hit the court?
          </Heading>
          <Text mt={4}>
            Sign up today and join the community of basketball players in your
            area.
          </Text>
          <Button
            as={Link}
            to="/login"
            mt={6}
            colorScheme="cyan"
            size="lg"
          >
            Register Now
          </Button>
        </Box>
      </Box>
    );
  };
  
  // Feature Card Component
  const FeatureCard = ({ title, description }) => (
    <Box
      bg="gray.800"
      p={6}
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
    >
      <Heading
        as="h3"
        size="md"
        mb={4}
        bgGradient="linear(to-r, cyan.400, blue.500)"
        bgClip="text"
      >
        {title}
      </Heading>
      <Text color="gray.300">{description}</Text>
    </Box>
  );
  
  export default HomePage;