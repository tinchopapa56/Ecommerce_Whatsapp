import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Stack
  } from '@chakra-ui/react'
  import { Input, Button, Box, Text} from "@chakra-ui/react"
  import {Product} from "../product/types";

  import React from 'react'
  
  interface Props{
    cart: Product[]
  }
  function parseCurrency (value: number): string {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    })
  }
  const DrawerR:React.FC<Props> = ({cart}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    return (
      <>
        <Button w="300px" colorScheme='teal' onClick={onOpen}>
          Ver carrito
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>
  
            <DrawerBody>
              <Input placeholder='Type here...' />
                <Box>
                {cart? (cart.map( product =>(
                  <Stack mt={4} spacing={3} borderRadius="md" p={4} bg="gray.100" key={product.id}>
                    <Stack spacing={1}>
                      <Text>{product.title}</Text>
                      <Text color="green.500" fontSize="sm" fontWeight="500">{parseCurrency(product.price)}</Text>
                    </Stack>
                  </Stack>
                  ))
                  ):(<Text>eh</Text>)
                }
                </Box>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  export default DrawerR