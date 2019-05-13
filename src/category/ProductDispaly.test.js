import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import { BrowserRouter } from "react-router-dom";
import { ProductContext } from "../context.js";
import ProductDisplay from "./ProductDisplay";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();
test("Throw Err if props are empty", () => {
  render(<ProductDisplay />);
  expect(console.error).toBeCalled();
});

test("Donot throw Err if props are passed", () => {
  let detail = {
    title: "Blue Stripe Stoneware Plate",
    brand: "Kiriko",
    price: 40,
    productId: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
    image: "blue-stripe-stoneware-plate.jpg"
  };
  render(
    <ProductContext.Provider value={{ productDetail: detail }}>
      <BrowserRouter>
        <ProductDisplay productDisplayDetail={detail} />
      </BrowserRouter>
    </ProductContext.Provider>
  );
  expect(console.error).not.toBeCalled();
});
