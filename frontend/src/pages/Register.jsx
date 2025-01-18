import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
    VStack,
    useToast,
    useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        city: "",
        state: "",
        skillLevel: "",
        phoneNumber: "",
    });

    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/register", formData, {
                withCredentials: true
            });
            toast({
                title: "Registration successful!",
                description: res.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            const { token, user } = res.data;
            localStorage.setItem("token", token); // Save the token
            setUser(user); // Set the registered user
            navigate("/home"); // Redirect to the logged-in home page
        } catch (error) {
            toast({
                title: "Registration failed",
                description: error.response?.data?.message || "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const textColor = useColorModeValue("gray.800", "white");
    const formBg = useColorModeValue("white", "gray.700");

    return (
        <Container maxW="md" py={8}>
            <Box bg={formBg} p={6} borderRadius="md" boxShadow="md">
                <VStack as="form" spacing={4} onSubmit={handleSubmit}>
                    <Text fontSize="2xl" fontWeight="bold" mb={4} color={textColor}>
                        Register
                    </Text>

                    <FormControl isRequired>
                        <FormLabel color={textColor}>Username</FormLabel>
                        <Input
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={textColor}>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={textColor}>First Name</FormLabel>
                        <Input
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={textColor}>Last Name</FormLabel>
                        <Input
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={textColor}>City</FormLabel>
                        <Input
                            placeholder="Enter city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={textColor}>State</FormLabel>
                        <Input
                            placeholder="Enter state"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={textColor}>Skill Level</FormLabel>
                        <Select
                            value={formData.skillLevel}
                            onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                        >
                            <option value="" disabled>
                                Choose Level
                            </option>
                            <option value="Recreational">Recreational</option>
                            <option value="High School">High School</option>
                            <option value="College">College</option>
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={textColor}>Phone Number</FormLabel>
                        <Input
                            type="tel"
                            placeholder="Enter phone number"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        />
                        <Text fontSize="sm" color="gray.500">
                            Your phone number will remain private and secure.
                        </Text>
                    </FormControl>

                    <Button colorScheme="blue" type="submit" width="full">
                        Register
                    </Button>
                </VStack>
            </Box>
        </Container>
    );
};

export default Register;