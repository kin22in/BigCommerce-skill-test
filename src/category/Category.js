import React from "react";
import "./Category.css";
import ProductDisplay from "./ProductDisplay.js";
import BannerImage from "../components/BannerImage";
import { ProductConsumer } from "../context.js";

export default function Category() {
  return (
    <div className="Category">
      <div className="container-fluid">
        <BannerImage />
      </div>
      <div className="container">
        <div className="row">
          <ProductConsumer>
            {({ products }) => {
              if (products.length > 0) {
                return products.map(product => {
                  return (
                    <ProductDisplay
                      key={product.image.split(".")[0]}
                      productDisplayDetail={product}
                    />
                  );
                });
              } else {
                return (
                  <div className="col-12">
                    <div className="h2">Loading</div>
                  </div>
                );
              }
            }}
          </ProductConsumer>
        </div>
      </div>
    </div>
  );
}
