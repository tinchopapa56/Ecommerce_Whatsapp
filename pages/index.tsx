import { useState, useEffect, useMemo } from 'react';
import { filterProps } from 'framer-motion';
import { GetStaticProps } from 'next';
import api from '../product/api';
import {Product} from "../product/types";
import {Grid, Box, Text, Stack, Button, Link, Flex, Image} from "@chakra-ui/react"
import {motion, AnimatePresence, AnimateSharedLayout} from "framer-motion"
import DrawerR from '../product/DrawerR';


interface Props {
  products: Product[],
}
function parseCurrency (value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  })
}

const IndexRoute: React.FC<Props> = ({products}) => {
  const [cart, setCart] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState<string>("")

  //WP connection
  const text = useMemo(
    () =>
     cart
      .reduce((message, product) => message.concat(`* ${product.title} - $${product.price}\n`), ``)
      .concat(`\nTotal: ${cart.reduce((total, product) => total + product.price, 0)}`),
      [cart],
    );

  const handleAddToCart = (product: Product) => {
    setCart(cart => cart.concat(product));
  }
  
  return ( 
      <Stack>
        <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
          {products.map(product => (
            <Stack spacing={3} borderRadius="md" p={4} bg="gray.100" key={product.id}>
              <Stack spacing={1}>
                <Image 
                  onClick={()=> setSelectedImage(product.image)}
                  as={motion.img}
                  layoutId={product.image}
                  alt={product.title} 
                  maxHeight={180}
                  objectFit="cover" 
                  borderRadius="md" 
                  src={product.image} 
                />
                <Text>{product.title}</Text>
                <Text color="grenn.500" fontSize="sm" fontWeight="500">{parseCurrency(product.price)}</Text>
              </Stack>
              <Button 
                colorScheme="primary"
                variant="outline"
                size="sm"
                onClick={() => handleAddToCart(product) }
                >
                Agregar a carrito
              </Button>
            </Stack>
          ))}
        </Grid>
        {cart.length &&
          <Flex p={4} gap={4} justify="center" align="center" direction="column">
            <Button 
              as={Link} 
              href={`https://wa.me/5491183920394?text=${encodeURIComponent(text)}`} 
              isExternal
              colorScheme="whatsapp"
              // width="fit-content"
              w="300px"
              // position="sticky"
            >
              Completar pedido WP ({cart.length} productos)
            </Button>
            <DrawerR cart={cart} />
          </Flex>
        }
        <AnimatePresence>
        {selectedImage && (
          <Flex 
            key="backdrop" 
            align="center" 
            as={motion.div} 
            bg="rgba(0,0,0,0.5)" 
            justify="center"
            layoutId={selectedImage}
            position="fixed" 
            top={0} 
            left={0}
            h="100%" 
            w="100%"
            onClick={() => setSelectedImage("")} 
          >
            <Image key="image" src={selectedImage} />
          </Flex>
        )}
      </AnimatePresence>
      </Stack>
  );
}

export const getStaticProps: GetStaticProps = async() =>{
  
  const products = await api.list();

  return {
    revalidate: 5,
    props: {
      products,
    },
    
  };
};

export default IndexRoute;