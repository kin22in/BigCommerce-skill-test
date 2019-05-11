import React, { Component } from "react";
import "./modal.css";
import { ProductConsumer } from "../context.js";
import { Link } from "react-router-dom";

export default class Modal extends Component {
  render() {
    return (
      <React.Fragment>
        <ProductConsumer>
          {({
            cart,
            cartTotal,
            removeFromCart,
            closeModal,
            setWrapperRef,
            isModalOpen
          }) => {
            if (!isModalOpen) {
              return null;
            } else {
              return (
                <div
                  className="modal-wrapper p-3 shadow-lg"
                  ref={setWrapperRef}
                  tabIndex="0"
                  onBlur={() => {
                    closeModal();
                  }}
                >
                  <div className="container">
                    <div className="row">
                      {cart.length > 0 && (
                        <div className="col-12">
                          <table className="table">
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
                                          <div className="h5">
                                            {item.title} X {item.quantity}
                                          </div>

                                          <div className="text-muted">
                                            {item.brand}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="text-right">
                                      <button
                                        onClick={ev => {
                                          removeFromCart(ev, item.productId);
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

                          <hr />
                          <div className="d-flex mb-3 text-muted justify-content-between">
                            <div className="mr-2">Total</div>
                            <div className="text-right">${cartTotal}</div>
                          </div>

                          <div className="d-flex justify-content-between">
                            <div className="mr-2">
                              <Link to="/cart">
                                <button
                                  onClick={() => {
                                    closeModal();
                                  }}
                                  className="rounded-0 btn btn-outline-dark"
                                >
                                  VIEW CART
                                </button>
                              </Link>
                            </div>
                            <div className="text-right">
                              <button
                                onClick={() => {
                                  closeModal();
                                }}
                                className="rounded-0 btn btn-dark"
                              >
                                CHECK OUT
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {cart.length === 0 && (
                        <div className="col-12">
                          <div className="h2">SORRY NOTHING ADDED TO CART</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          }}
        </ProductConsumer>
      </React.Fragment>
    );
  }
}
