import { ChakraProvider, Container, VStack, Image, Heading, Text, Divider } from '@chakra-ui/react'
import { AppProps } from "next/app"
import theme from '../theme'


const App: React.FC<AppProps> =({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Container 
        bg="white" 
        boxShadow="md" 
        marginY={4} 
        maxWidth="container.xl" 
        padding={4}
      >
        <VStack mb={6} >
          <Image borderRadius={9999} w="128px" src="https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80" />
          <Heading>Almacency</Heading>
          <Text>Built with chakra UI & Next.js & Typescript</Text>
        </VStack>
        <Divider marginY={6} />
        <Component {...pageProps} />
      </Container>
      
    </ChakraProvider>
  )
}

export default App