import { useState, useEffect, useMemo } from 'react';
import { filterProps } from 'framer-motion';
import { GetStaticProps } from 'next';
import api from '../product/api';
import {Product} from "../product/types";
import {Grid, Box, Text, Stack, Button, Link, Flex} from "@chakra-ui/react"
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
    </Stack>
  );
}

export const getStaticProps: GetStaticProps = async() =>{
  
  const products = await api.list();

  return {
    props: {
      products,
    },
    // revalidate: 10
  };
};

export default IndexRoute;


      // id: string;
      // title: string;
      // category: string;
      // description: string;
      // image: string;
      // price: string;