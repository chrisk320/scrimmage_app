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
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateGamePage = () => {
    const apiKey = import.meta.env.VITE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_MAPS_ID; // Get the Map ID from environment variables
    const [formData, setFormData] = useState({
        city: "",
        state: "",
        park: "",
        currentTeamNumber: 0,
    });
    const [parks, setParks] = useState([]);
    const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194}); // Default to San Francisco
    const [selectedPark, setSelectedPark] = useState(null); // State to store selected park
    const toast = useToast();
    const navigate = useNavigate();


    const mapContainerStyle = {
        width: "100%",
        height: "400px",
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

        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        try {
            const res = await axios.get(`/api/games/parks?city=${formData.city}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (res.data.parks.length > 0) {
                const firstPark = res.data.parks[0];
                if (firstPark.location) {
                    // Set the map center to the location of the first park
                    setCenter({
                        lat: firstPark.location.lat,
                        lng: firstPark.location.lng,
                    });
                }
            }

            setParks(res.data.parks);
            toast({
                title: "Parks Found",
                description: `${res.data.parks.length} parks found in ${formData.city}.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not fetch parks. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleMarkerClick = (park) => {
        setFormData({ ...formData, park: park.name });
        setSelectedPark(park);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post("/api/games/create", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast({
                title: "Game Created",
                description: "Your game has been successfully created!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setFormData({ city: "", state: "", park: "", currentTeamNumber: 0 }); // Reset the form
            setSelectedPark(null);
            navigate("/home"); // Redirect to the logged-in home page
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not create the game. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.md" py={8}>
            <Box bg="white" p={6} borderRadius="md" boxShadow="md">
                <VStack spacing={4} as="form" onSubmit={handleSubmit}>
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
                            style={mapContainerStyle}
                            defaultZoom={13}
                            center={center}
                            mapId={mapId}
                            options={{
                                draggable: true,
                            }}
                        >
                            {parks.map((park, index) => (
                                <AdvancedMarker
                                    key={index}
                                    position={{
                                        lat: park.location.lat,
                                        lng: park.location.lng,
                                    }}
                                    title={park.name}
                                    onClick={() => handleMarkerClick(park)}
                                />
                            ))}
                        </Map>
                    </APIProvider>
                    {/* Selected Park Info */}
                    {selectedPark && (
                        <Box mt={4} bg="teal.600" p={4} borderRadius="md" shadow="md">
                            <Text fontWeight="bold" fontSize="lg" color="white">Selected Park: {selectedPark.name}</Text>
                            <Text fontSize="sm" color="white">
                                Address: {selectedPark.address}
                            </Text>
                        </Box>
                    )}
                    <Button colorScheme="blue" type="submit" isDisabled={!formData.park}>
                            Create Game
                    </Button>
                </VStack>
            </Box>
        </Container>
    );
};

export default CreateGamePage;