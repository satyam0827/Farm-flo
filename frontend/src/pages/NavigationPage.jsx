import React from 'react'
import { Box, Text, useColorModeValue, Container, Center, Button } from "@chakra-ui/react"
import { Link } from 'react-router-dom'


const NavigationPage = () => {
  return (
    <Container>

      <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
        rounded={"lg"} p={10} shadow={"md"} mt={"20"} display={"flex"} flexDir={"row"} gap={3}>
        <Button padding={10}>
          <Link to="/">Home</Link>
        </Button>
        <Button padding={10}>
          <Link to="/produce">My Produces</Link>
        </Button>
        <Button padding={10}>
          <Link to="/create">Add Produce</Link>
        </Button>
      </Box>
    </Container>
  )
}

export default NavigationPage