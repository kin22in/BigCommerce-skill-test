import React from "react";
import "./ProductDisplay.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ProductConsumer } from "../context.js";

export default function ProductDisplay(props) {
  if (!props.productDisplayDetail) return null;
  const { title, brand, price, image, productId } = props.productDisplayDetail;
  return (
    <div className="col-6 col-md-4 p-3">
      <div className="product-display p-3">
        <div className="product-img text-center">
          <div className="image-wrapper">
            <img className="img-fluid" src={`media/${image}`} alt={title} />

            <div className="img-overlay align-items-stretch d-flex flex-column justify-content-center align-items-center">
              <div className="mb-3">
                <ProductConsumer>
                  {({ handleDetails }) => (
                    <Link to="/productdetails">
                      <button
                        onClick={() => {
                          handleDetails(productId);
                        }}
                        className="rounded-0 btn btn-dark w-50"
                      >
                        VIEW DETAILS
                      </button>
                    </Link>
                  )}
                </ProductConsumer>
              </div>
              <div>
                <ProductConsumer>
                  {({ addToCart }) => (
                    <button
                      onClick={() => {
                        addToCart(productId);
                      }}
                      className="rounded-0 btn btn-dark w-50"
                    >
                      ADD TO CART
                    </button>
                  )}
                </ProductConsumer>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details text-center">
          <div className="text-muted">{brand}</div>
          <div>{title.toUpperCase()}</div>
          <div className="text-muted">${price}</div>
        </div>
      </div>
    </div>
  );
}

ProductDisplay.propTypes = {
  productDisplayDetail: PropTypes.shape({
    title: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
  }).isRequired
};
