import React, { Component } from "react";
import "./Product.css";
import { ProductConsumer } from "../context.js";
class Product extends Component {
  state = {
    tempCart: 0,
    showHint: false,
    shouldUpdate: true
  };
  render() {
    return (
      <ProductConsumer>
        {({ productDetail, getIndexOf, getItemById, addToCart }) => {
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
                  {this.state.showHint && this.state.tempCart === 0 && (
                    <div className="row my-3">
                      <div className="col-12 text-center text-danger">
                        You cannot update 0 quanity
                      </div>
                    </div>
                  )}
                  <div className="d-flex justify-content-center align-items-stretch">
                    <div className="bg-light border mx-1 px-3 d-flex align-items-center">
                      {this.state.shouldUpdate &&
                      getIndexOf("cart", productId) >= 0
                        ? getItemById("cart", productId).quantity
                        : this.state.tempCart}
                    </div>
                    <div className="mr-3 d-flex flex-column">
                      <div className="">
                        <button
                          onClick={() => {
                            let tempQuantity =
                              this.state.shouldUpdate &&
                              getIndexOf("cart", productId) >= 0
                                ? getItemById("cart", productId).quantity + 1
                                : this.state.tempCart + 1;

                            this.setState({
                              tempCart: tempQuantity,
                              shouldUpdate: false
                            });
                          }}
                          className="w-100 btn border mb-1 btn-light"
                        >
                          +
                        </button>
                      </div>
                      <div className="">
                        <button
                          onClick={() => {
                            let tempQuantity =
                              this.state.shouldUpdate &&
                              getIndexOf("cart", productId) >= 0
                                ? getItemById("cart", productId).quantity - 1
                                : this.state.tempCart > 0
                                ? this.state.tempCart - 1
                                : 0;

                            this.setState({
                              tempCart: tempQuantity,
                              shouldUpdate: false
                            });
                          }}
                          className="btn w-100 border btn-light"
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        this.state.tempCart > 0
                          ? addToCart(productId, this.state.tempCart)
                          : this.setState({
                              showHint: true
                            });
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
