import { useState, useEffect, useMemo } from 'react';
import { filterProps } from 'framer-motion';
import { GetStaticProps } from 'next';
import api from '../product/api';
import {Product} from "../product/types";
import {Grid, Box, Text, Stack, Button, Link} from "@chakra-ui/react"


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
          <Stack bg="gray.100" key={product.id}>
            <Text>{product.title}</Text>
            <Text>{parseCurrency(product.price)}</Text>
            <Button 
              colorScheme="blue"
              onClick={() => handleAddToCart(product) }
              >
              Agregar a carrito
            </Button>
          </Stack>
        ))}
      </Grid>
      {cart.length &&
       <Link >
        <Button as={Link} href={`https://wa.me/5491183920394?text=${encodeURIComponent(text)}`} 
        isExternal colorScheme="whatsapp"
        > Completar pedido WP ({cart.length} productos)
        </Button>
       </Link>
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