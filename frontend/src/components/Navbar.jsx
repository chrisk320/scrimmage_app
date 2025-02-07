import React from "react";
import { Box, Button, Flex, Spacer, Text, HStack } from "@chakra-ui/react";
import { FaBasketballBall } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ user, logout }) => {
    return (
        <Box bg="blue.600" color="white" px={4} py={2} shadow="md">
            <Flex alignItems="center" justifyContent="space-between">
                {/* Left side: Basketball icon */}
                <HStack spacing={2} as={Link} to={user ? "/home" : "/"}>
                    <FaBasketballBall size={24} />
                    <Text fontSize="lg" fontWeight="bold">
                        Basketball Scrimmage
                    </Text>
                </HStack>

                <Spacer />

                <HStack spacing={4}>
                    {user ? (
                        <Button colorScheme="red" onClick={logout} size="sm">
                            Logout
                        </Button>
                    ) : (
                        <Link to={"/login"}>
                        <Button colorScheme="blue" variant="solid" size="sm">
                            Login/Register
                        </Button>
                    </Link>
                    )}
                </HStack>
            </Flex>
        </Box>
    );
};

export default Navbar;