import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import { BrowserRouter } from "react-router-dom";
import { Link, Route, Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "./App.js";
import products from "./data/products.json";
import { ProductContext } from "./context.js";

afterEach(cleanup);

test("All the products are rendered", () => {
  const div = document.createElement("div");
  const { getAllByText } = render(
    <ProductContext.Provider value={{ products }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductContext.Provider>
  );

  const ProductCount = getAllByText("VIEW DETAILS");
  expect(ProductCount.length).toBe(products.length);
});

test("click on my cart calls modal pop up", () => {
  const div = document.createElement("div");

  const products = [
    {
      title: "Blue Stripe Stoneware Plate",
      brand: "Kiriko",
      price: 40,
      productId: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
      image: "blue-stripe-stoneware-plate.jpg"
    }
  ];
  let handleDetails = jest.fn;
  let openModal = jest.fn();
  let cartCount = 0;
  const { getByTestId, getByText, queryByTestId } = render(
    <ProductContext.Provider
      value={{ products, handleDetails, openModal, cartCount }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductContext.Provider>
  );
  let addToCart = getByText("ADD TO CART");

  let myCartButton = getByTestId("cartButton");

  expect(myCartButton.innerHTML).toEqual("My Cart (0)");
  let modal = queryByTestId("modal");

  expect(modal).toBeFalsy();

  fireEvent.click(myCartButton);
  expect(openModal).toHaveBeenCalledTimes(1);
});
