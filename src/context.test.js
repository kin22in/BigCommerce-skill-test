import React from "react";
import { render, cleanup } from "react-testing-library";
import { BrowserRouter } from "react-router-dom";
import { ProductContext, ProductProvider, ProductConsumer } from "./context.js";

global.fetch = require("jest-fetch-mock");

afterEach(cleanup);

test("<ProductProvider/> if not set default is undefined", () => {
  let actualValue = "testing";
  const div = document.createElement("div");
  render(<ProductConsumer>{value => (actualValue = value)}</ProductConsumer>);
  expect(actualValue).toBeUndefined();
});

test("<ProductProvider/> component did mount", () => {
  fetch.mockResponseOnce(
    JSON.stringify([
      {
        title: "Blue Stripe Stoneware Plate",
        brand: "Kiriko",
        price: 40,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
        image: "blue-stripe-stoneware-plate.jpg"
      },
      {
        title: "Mashiko-Yaki Saucer",
        brand: "Kiriko",
        price: 18,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
        image: "mashiko-yaki-saucer.jpg"
      }
    ])
  );
  const div = document.createElement("div");
  render(
    <ProductProvider>
      <ProductConsumer>
        {({ cartCount }) => <div>{cartCount}</div>}
      </ProductConsumer>
    </ProductProvider>
  );
});
