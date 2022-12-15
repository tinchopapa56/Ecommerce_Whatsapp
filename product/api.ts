import axios from "axios"

import {Product} from "./types"
import Papa from "papaparse"
import { resolve } from "path"
import { rejects } from "assert"

export default {
    list: async (): Promise<Product[]> => {
      return axios
        .get("https://docs.google.com/spreadsheets/d/e/2PACX-1vRr5ayiTQhlamYRqzgINiEtBxDZL5c6qn5QU595baUd6rz5HP72j9nz9xN7invORKWk_zgWdeeVGcJv/pub?output=csv"
        ,{
          responseType: "blob",
        })
        .then(
          (response) =>
            new Promise<Product[]>((resolve, reject) => {
              Papa.parse(response.data, {
                header: true,
                // complete: (results) => resolve(results.data as Product[]),
                // error: (error) => reject(error.message),
                complete: (results) => {
                  const products = results.data as Product[]
                  
                  return resolve(
                   products.map((product) => ({
                      ...product,
                      price: Number(product.price),
                   })),
                  );
                },
                error: (error) => reject(error.message),
                
              });
            }),
        );
    }
}