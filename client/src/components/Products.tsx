import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

//create props for the products

interface Props {
  cat: string | undefined;
  filters: any | null;
  sort: string | undefined;
}

export interface ProductData {
  _id: string;
  title: string;
  desc: string;
  img: string;
  categories: string[];
  size: string;
  color: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function isKeyOfProductData(key: string): key is keyof ProductData {
  return ['color', 'size'].includes(key);
}


const Products = ({ cat, filters, sort }: Props) => {
  const [products, setProducts] = useState<ProductData[]>([]);
const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `https://localhost:5000/api/products?category=${cat}` : "https://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {

      }
    };
    
    getProducts();
  }, [cat]);



  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) => {
          for (let key in filters) {
            if (isKeyOfProductData(key) && filters[key].includes(item[key])) {
              return true;
            }
          }
          return false;
        })
      );
  }, [products, cat, filters]);
  

  return (
    <Container>
      {cat && filteredProducts.length
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 10)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

  





export default Products;