import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast,
    Text,
} from "@chakra-ui/react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import axios from "axios";

const CreateGamePage = () => {
    const apiKey = import.meta.env.VITE_MAPS_API_KEY;
    const [formData, setFormData] = useState({ city: "", state: "" });
    const [parks, setParks] = useState([]);
    const toast = useToast();

    const mapContainerStyle = {
        width: "100%",
        height: "400px",
    };

    const center = {
        lat: 37.7749, // Default to San Francisco
        lng: -122.4194,
    };

    const handleSearchParks = async () => {
        if (!formData.city) {
            toast({
                title: "Error",
                description: "Please enter a city to search for parks.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const res = await axios.get(`/api/games/parks?city=${formData.city}`);
            setParks(res.data.parks);
            toast({
                title: "Parks Found",
                description: `${res.data.parks.length} parks found in ${formData.city}.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not fetch parks. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.md" py={8}>
            <Box bg="white" p={6} borderRadius="md" boxShadow="md">
                <VStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel color="black">City</FormLabel>
                        <Input
                            placeholder="Enter city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            color="black" // Ensure input text is visible
                            borderColor="gray.400"
                            _hover={{ borderColor: "gray.500" }}
                            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color="black">State</FormLabel>
                        <Input
                            placeholder="Enter state"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            color="black" // Ensure input text is visible
                            borderColor="gray.400"
                            _hover={{ borderColor: "gray.500" }}
                            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
                        />
                    </FormControl>

                    <Button colorScheme="blue" onClick={handleSearchParks}>
                        Search Parks
                    </Button>

                    {/* Map Section */}
                    <APIProvider apiKey={apiKey}>
                        <Map
                            style={ mapContainerStyle }
                            defaultZoom={13}
                            defaultCenter={center}
                        />
                    </APIProvider>
                </VStack>
            </Box>
        </Container>
    );
};

export default CreateGamePage;