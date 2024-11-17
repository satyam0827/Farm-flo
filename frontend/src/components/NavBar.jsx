import { Container, Flex, HStack, Text, Button, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { PlusSquareIcon } from "@chakra-ui/icons"
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { RiAccountCircleLine } from "react-icons/ri";
import { useAuthStore } from '../store/authStore';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input
} from '@chakra-ui/react'


const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const {isAuthenticated,logout} = useAuthStore();

    const handleLogout = () =>{
        logout();
    }
    
    return <Container maxWidth={"1140px"}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={
                {
                    base: "column",
                    sm: "row"
                }
            }>
            <Text
                // className='font-extrabold text-white'
                fontSize={{ base: "22", sm: "28" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-r, cyan.400,blue.500)"}
                bgClip={"text"}
            >
                <Link to={"/"}> Farm-Flo <span style={{color:'green'}}>🍃</span></Link>
            </Text>
            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                    <Button>
                        <PlusSquareIcon fontSize={20} />
                    </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode == "light" ? <IoMoon /> : <LuSun size="20" />}
                </Button>

                <Button
                    ref={btnRef}
                    colorScheme="black"
                    onClick={onOpen} ml={10}
                    _hover={{ colorMode: "gray.200" }}
                    _active={{ bg: "none" }}
                    bg={"transparent"}
                >
                    <RiAccountCircleLine fontSize={38} color={colorMode === "dark" ? "white" : "black"}/>
                </Button>

            </HStack>
        </Flex>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create your account</DrawerHeader>

                <DrawerBody>

                </DrawerBody>

                <DrawerFooter>
  {isAuthenticated ? (
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <>
      <Link to={"/register"}>
        <Button variant="outline" mr={3} onClick={onClose}>
          Register
        </Button>
      </Link>
      <Link to={"/login"}>
        <Button colorScheme="blue" onClick={onClose}>
          Login
        </Button>
      </Link>
    </>
  )}
</DrawerFooter>

            </DrawerContent>

        </Drawer>
    </Container>

}

export default NavBar