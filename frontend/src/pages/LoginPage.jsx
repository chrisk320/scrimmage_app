import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", credentials);
      toast({
        title: "Login successful!",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Redirect to dashboard or home page
      const { token, user } = res.data;
      localStorage.setItem("token", token); // Save the token for authentication
      setUser(user); // Set the logged-in user
      navigate("/home"); // Redirect to the logged-in home page
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="sm" py={12}>
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
        borderColor="gray.200"
        borderWidth={1}
        color="gray.800"
      >
        <VStack as="form" spacing={4} onSubmit={handleLogin}>
          <Text fontSize="2xl" fontWeight="bold">
            Login
          </Text>

          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              color="black" // Explicitly setting text color
              borderColor="gray.400" // Visible border
              _hover={{ borderColor: "gray.500" }} // Border color on hover
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }} // Border color on focus
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              color="black" // Explicitly setting text color
              borderColor="gray.400" // Visible border
              _hover={{ borderColor: "gray.500" }} // Border color on hover
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }} // Border color on focus
            />
          </FormControl>

          <Button colorScheme="blue" type="submit" width="full">
            Login
          </Button>

          <Text fontSize="sm" mt={2} color="gray.600" textAlign="center">
            Don’t have an account?{" "}
            <Link as={RouterLink} to="/register" color="blue.500" fontWeight="bold">
              Click here to register
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPage;