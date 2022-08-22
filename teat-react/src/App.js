import React, { useState } from "react";
import { useQuery, gql } from '@apollo/client';
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"
import CatalogPage from "./components/CatalogPage";
import CartPage from "./components/CartPage";
import ProductPage from "./components/ProductPage";
import Purchased from "./components/Purchased";

import "./scss/navbar.scss"
import "./scss/catalogPage.scss"
import "./scss/cartPage.scss"
import "./scss/productPage.scss"

const GET_PRODUCTS = gql`
  query GetQuery {
    category{
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          items {
            id
            value
            displayValue
          }
          type
        }
        prices {
          currency {
            symbol
            label
          }
          amount
        }
        brand
      }
    }
  }`

function App() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [items, setItems] = useState([]);
  const [currency, setCurrency] = useState({item: ["$", "USD"], changeCurrency: false, isRotated: false});
  const [parameters, setParameters] = useState({color: null, copacity: null})

  const toggleColor = (id) => {
    setParameters((prev) => ({...prev, color: id}));
    console.log(parameters)
  }

  const toggleCopacity = (param, id) => {
    if (items.id === id) {
      setParameters((prev) => ({...prev, copacity: param}));
    }
    
    console.log(items)
  }

  const onOptionClicked = (option) => {
    setCurrency((prev) => ({...prev, item: option}))
  }

  const onAddToCart = (id) => {

    let setArr = data.category.products;
    const index = items.findIndex((index) => index.id === id)
    const arr = setArr.find((item) => item.id === id)
    const array = items.find((item) => item.id === arr.id)
    const converter = (index) => {
      index = arr.prices.findIndex((item) => item.currency.symbol === currency.item[0] ? item.amount : false);
      console.log(index)
      return index;
    }

    converter()
  
    if (array) {
  
      if(array.count > 0) {
  
        setItems([...items.slice(0, index), {...arr, count: array.count + 1}, ...items.slice(index + 1, items.length)])
  
      } 
    } else {
      setItems((prev) => [...prev, {...arr, count: 1}])
    }
  
  }
  
  const onRemoveFromCart = (id) => {
  
    let setArr = data.category.products;
    const index = items.findIndex((index) => index.id === id)
    const arr = setArr.find((item) => item.id === id)
    const array = items.find((item) => item.id === arr.id)
    const converter = (index) => {
      index = arr.prices.findIndex((item) => item.currency.symbol === currency.item[0]);
      console.log(index)
      return index;
    }
  
    if (array.count > 1) {
        setItems([...items.slice(0, index), {...arr, count: array.count - 1, totalPrice: array.totalPrice - Number(array.prices[converter()].amount)} , ...items.slice(index + 1, items.length)])
  
      } else {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }
  
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="wrapper">
      <Navbar onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} onOptionClicked={onOptionClicked} productItem={items} currency={currency} toggleColor={toggleColor} toggleCopacity={toggleCopacity} parameters={parameters}/>
      <Routes>
        <Route path="/" element={<CatalogPage products={data} onAddToCart={onAddToCart} currency={currency}/>} />
        <Route path="/catalog/:link" element={<CatalogPage products={data} onAddToCart={onAddToCart} currency={currency}/>} />
        <Route path="/cart-page" element={<CartPage onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} products={data} currency={currency} productItem={items} toggleColor={toggleColor} toggleCopacity={toggleCopacity} parameters={parameters}/>} />
        <Route path="/catalog/:link/:id" element={<ProductPage onAddToCart={onAddToCart} currency={currency} products={data} toggleColor={toggleColor} toggleCopacity={toggleCopacity} parameters={parameters}/>} />
        <Route path="/catalog/purchased" element={<Purchased/>}/>
      </Routes>
    </div>
  );
}

export default App;
