import React, { Component } from "react";
import "./Product.css";
import { ProductConsumer } from "../context.js";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    };
  }

  render() {
    return (
      <ProductConsumer>
        {({
          productDetail,
          cart,
          incrementQuanity,
          getIndexOf,
          getItemById,
          addToCart,
          decrementQuanity
        }) => {
          const {
            title,
            brand,
            price,
            image,
            productId,
            description
          } = productDetail;
          return (
            <div className="container">
              <div className="row text-center">
                <div className="col-12 mt-3 mb-5">HOME / PLATES /{title}</div>
                <div className="col-8">
                  <img
                    className="img-fluid"
                    src={`/media/${image}`}
                    alt={title}
                  />
                </div>
                <div className="col-4 px-3">
                  <p className="text-muted">{brand}</p>
                  <p className="h1">{title}</p>
                  <p className="text-muted">${price}</p>
                  <p className="text-muted">{description}</p>
                  <hr className="px-1" />
                  <div className="d-flex justify-content-center align-items-stretch">
                    <div className="bg-light border mx-1 px-3 d-flex align-items-center">
                      {getIndexOf("cart", productId) >= 0
                        ? getItemById("cart", productId).quantity
                        : 0}
                    </div>
                    <div className="mr-3 d-flex flex-column">
                      <div className="">
                        <button
                          onClick={() => {
                            addToCart(productId);
                          }}
                          className="w-100 btn border mb-1 btn-light"
                        >
                          +
                        </button>
                      </div>
                      <div className="">
                        <button
                          onClick={() => {
                            decrementQuanity(productId);
                          }}
                          className="btn w-100 border btn-light"
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(productId);
                      }}
                      className="rounded-0 btn btn-dark border"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default Product;
