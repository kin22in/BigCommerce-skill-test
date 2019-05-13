import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  getAllByTestId,
  getByTestId
} from "react-testing-library";
import { BrowserRouter } from "react-router-dom";
import details from "../data/details";
import { Link, Route, Router, Switch } from "react-router-dom";
import Product from "../product/Product.js";
import { ProductContext } from "../context.js";

let detail = {
  title: "Blue Stripe Stoneware Plate",
  brand: "Kiriko",
  price: 40,
  productId: 1,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
  image: "blue-stripe-stoneware-plate.jpg"
};
afterEach(cleanup);

test("Increment quantity on clicking +", () => {
  const div = document.createElement("div");
  const { getByText, getByTestId, debug } = render(
    <ProductContext.Provider value={{ productDetail: detail }}>
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    </ProductContext.Provider>
  );

  const increment = getByText("+");
  const quantityCount = getByTestId("quantityCount");
  expect(quantityCount.textContent).toEqual("1");
  fireEvent.click(increment);
  expect(quantityCount.textContent).toEqual("2");
});

test("Decrement quantity on clicking -", () => {
  const div = document.createElement("div");
  const { getByText, getByTestId, debug } = render(
    <ProductContext.Provider value={{ productDetail: detail }}>
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    </ProductContext.Provider>
  );

  const decrement = getByText("-");
  const quantityCount = getByTestId("quantityCount");
  expect(quantityCount.textContent).toEqual("1");
  fireEvent.click(decrement);
  expect(quantityCount.textContent).toEqual("0");
});

test("Creating Snapshot", () => {
  const div = document.createElement("div");
  const { container } = render(
    <ProductContext.Provider value={{ productDetail: detail }}>
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    </ProductContext.Provider>
  );

  expect(container.firstChild).toMatchSnapshot();
});
