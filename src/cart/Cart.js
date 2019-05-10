import { Link } from "react-router-dom";
import "./Cart.css";
import { ProductConsumer } from "../context.js";

import React from "react";

export default function Cart() {
  return (
    <div>
      <ProductConsumer>
        {({
          cart,
          incrementQuanity,
          addToCart,
          cartTotal,
          decrementQuanity,
          removeFromCart
        }) => {
          return (
            <div className="Cart">
              <div className="container">
                {cart.length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <table className="table">
                        <thead>
                          <tr className="border-0">
                            <th scope="col">Product</th>
                            <th className="text-center" scope="col">
                              Quantity
                            </th>
                            <th className="text-center" scope="col">
                              Total
                            </th>
                            <th className="text-right" scope="col">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map(item => {
                            return (
                              <tr key={item.productId}>
                                <td>
                                  <div className="row">
                                    <div className="col-3">
                                      <img
                                        className="img-fluid"
                                        src={`/media/${item.image}`}
                                        alt={item.title}
                                      />
                                    </div>
                                    <div className="col-9">
                                      <div className="text-muted">
                                        {item.brand}
                                      </div>
                                      <p>{item.title}</p>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex justify-content-center align-items-stretch">
                                    <div className="bg-light border mx-1 px-3 d-flex align-items-center">
                                      {item.quantity}
                                    </div>
                                    <div className="mr-3 d-flex flex-column">
                                      <div className="">
                                        <button
                                          onClick={() => {
                                            incrementQuanity(item.productId);
                                          }}
                                          className="w-100 btn border mb-1 btn-light"
                                        >
                                          +
                                        </button>
                                      </div>
                                      <div className="">
                                        <button
                                          onClick={() => {
                                            decrementQuanity(item.productId);
                                          }}
                                          className="btn w-100 border btn-light"
                                        >
                                          -
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center text-muted">
                                  {item.total}
                                </td>
                                <td className="text-right">
                                  <button
                                    onClick={() => {
                                      removeFromCart(item.productId);
                                    }}
                                    className="btn p-0 text-muted btn-link btn-lg"
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      {/* Cart Summary */}
                      <hr />
                      <div className="offset-6">
                        <div className="mb-2">CART OVERVIEW</div>
                        <div className="d-flex mb-2 justify-content-between">
                          <div>SUBTOTAL</div>
                          <div className="pull">{cartTotal}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>TOTAL</div>
                          <div className="pull">{cartTotal}</div>
                        </div>
                      </div>
                      <hr />
                      {/* Cart Action */}
                    </div>
                  </div>
                )}
                {cart.length === 0 && (
                  <div className="col-12">
                    <div className="h2">SORRY NOTHING ADDED TO CART</div>
                  </div>
                )}
                <div className="row">
                  <div className="col-6">
                    <Link className="text-secondary text-underline " to="/">
                      Continue Shopping
                    </Link>
                  </div>
                  <div className="col-6 text-right">
                    <button className="btn border btn-dark">
                      CHECKOUT ({cartTotal})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    </div>
  );
}
